<script setup lang="ts">
const props = defineProps({
  current_step: Number,
  isInStorytelling: Boolean,
  hasSelectDate: Boolean,
  news: String,
  typeNews: String,
  current_date: String,
  date_list: Array || Object,
});

const emit = defineEmits(["changeDate"]);

const selectedNews = ref([]);
const random_news = ref([]);
const total = ref(0);
const firstDate = ref("");
const lastDate = ref("");
const currentDate = ref("");

const fetchData = async (cdate) => {
  currentDate.value = cdate != null ? cdate : props.current_date;

  const response = await fetch(
    "/data/lifecycle/" + props.news + "-newslist.json"
  );
  const csvText = await response.json();

  if (props.isInStorytelling) {
    firstDate.value = csvText[0].date;
    lastDate.value = csvText[csvText.length - 1].date;
  } else {
    firstDate.value = props.date_list[0];
    lastDate.value = props.date_list[props.date_list.length - 1];
  }

  let selecteddate = "";

  if (cdate != null) selecteddate = new Date(cdate);
  else selecteddate = new Date(currentDate.value);

  if (props.current_date != null) {
    if (props.typeNews == "ทุกหมวด")
      random_news.value = csvText.filter(
        (x) => setDate(x.date) == setDate(selecteddate)
      );
    else
      random_news.value = csvText.filter(
        (x) =>
          setDate(x.date) == setDate(selecteddate) &&
          x.category == props.typeNews
      );
  } else random_news.value = csvText;

  randomNews();
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomNews() {
  let data = null;

  if (props.isInStorytelling) {
    data = random_news.value.filter(
      (x) => x.sample == "part_2_" + props.current_step
    );
  } else data = random_news.value;

  selectedNews.value = data[getRandomInt(data.length)];

  total.value = data.length;
}

function setDate(date) {
  let formatdate = new Date(date).toLocaleString("th-TH", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  formatdate =
    formatdate.split(" ")[0] +
    " " +
    formatdate.split(" ")[1] +
    " " +
    (parseInt(formatdate.split(" ")[2]) - 43);

  return formatdate;
}

const onChangeCurrentDate = (action) => {
  const isLargeNumber = (element) => element == currentDate.value;
  let index = 0;
  index = props.date_list.findIndex(isLargeNumber);

  if (action == "prev") {
    currentDate.value = props.date_list[index - 1];
    fetchData(props.date_list[index - 1]);
  } else {
    currentDate.value = props.date_list[index + 1];
    fetchData(props.date_list[index + 1]);
  }

  emit("changeDate", currentDate.value);
};

onMounted(() => {
  fetchData();
});

watch(
  () => props.current_step,
  (count, prevCount) => {
    randomNews();
  }
);

watch(
  () => props.current_date,
  (count, prevCount) => {
    fetchData();
  }
);

watch(
  () => props.typeNews,
  (count, prevCount) => {
    fetchData();
  }
);
</script>

<template>
  <div :class="{ 'mt-[50vh]': props.isInStorytelling }">
    <div class="flex justify-center items-center pb-5" v-if="hasSelectDate">
      <button
        @click="onChangeCurrentDate('prev')"
        class="cursor-pointer"
        :class="{
          cantclick: setDate(currentDate) == setDate(firstDate),
        }"
      >
        <img src="/image/trends/PreviousBtn.svg" alt="" />
      </button>
      <p class="b3">
        <b>{{ setDate(currentDate) }}</b> ({{
          random_news.length.toLocaleString()
        }}
        ข่าว)
      </p>
      <button
        @click="onChangeCurrentDate('next')"
        class="cursor-pointer"
        :class="{
          cantclick: setDate(props.current_date) == setDate(lastDate),
        }"
      >
        <img src="/image/trends/NextBtn.svg" alt="" />
      </button>
    </div>

    <div class="flex justify-center" v-if="selectedNews != []">
      <div
        class="type-of-news"
        :class="{
          'bg-brown': selectedNews.category == 'อาชญากรรม',
          'bg-pink': selectedNews.category == 'บันเทิง',
          'bg-lightblue': selectedNews.category == 'สังคมไทย',
          'bg-vermillion': selectedNews.category == 'การเมือง',
          'bg-orange': selectedNews.category == 'เศรษฐกิจ/การเงิน',
          'bg-rose': selectedNews.category == 'ต่างประเทศ',
          'bg-purple': selectedNews.category == 'กีฬา',
          'bg-blue': selectedNews.category == 'วิทยาศาสตร์/เทคโนโลยี',
          'bg-green': selectedNews.category == 'สิ่งแวดล้อม',
        }"
      ></div>
      <div
        class="t5 cream max-w-[500px] bg-black p-[10px] text-pretty text-left"
      >
        <p class="b4 font-bold">{{ setDate(selectedNews.date) }}</p>
        <h1 class="t4">
          {{ selectedNews.headline }}
        </h1>
        <p class="b4 pt-3">
          ที่มา:
          <a :href="selectedNews.link" target="_blank">
            {{ selectedNews.news_station }}</a
          >
        </p>
      </div>
    </div>

    <div class="mt-3 flex justify-center items-center" v-if="total > 1">
      <div class="mr-1">
        <img src="/image/Reset.svg" alt="" />
      </div>
      <p class="b4 text-[#FF006B] cursor-pointer" @click="randomNews">
        {{
          isInStorytelling
            ? "สุ่มตัวอย่างเพิ่ม"
            : "สุ่มตัวอย่างข่าวในวันนี้เพิ่ม"
        }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-of-news {
  flex: 0 0 10px;

  @include mobile {
    flex: 0 0 5px;
  }
}

.cantclick {
  opacity: 0.3;
  pointer-events: none;
}
</style>

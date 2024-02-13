<script setup lang="ts">
const props = defineProps({
  current_step: Number,
  isInStorytelling: Boolean,
  hasSelectDate: Boolean,
  news: String,
  current_date: String,
});

const selectedNews = ref([]);
const random_news = ref([]);
const total = ref(0);
const firstDate = ref("");
const lastDate = ref("");

const fetchData = async () => {
  const response = await fetch(
    "/data/lifecycle/" + props.news + "-newslist.json"
  );
  const csvText = await response.json();

  let selecteddate = new Date(props.current_date);

  if (props.current_date != null)
    random_news.value = csvText.filter(
      (x) => new Date(x.date).toDateString() == selecteddate.toDateString()
    );
  else random_news.value = csvText;

  firstDate.value = csvText[0].date;
  lastDate.value = csvText[csvText.length - 1].date;

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

const handleExploreMounthYear = (action) => {
  console.log(123);
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
</script>

<template>
  <div :class="{ 'mt-[50vh]': props.isInStorytelling }">
    <div class="flex justify-center items-center pb-5">
      <button
        @click="handleExploreMounthYear('prev')"
        class="cursor-pointer"
        :class="{
          cantclick: setDate(props.current_date) == setDate(firstDate),
        }"
      >
        <img src="/image/trends/PreviousBtn.svg" alt="" />
      </button>
      <p class="b3">
        <b>{{ setDate(selectedNews.date) }}</b> ({{ random_news.length }} ข่าว)
      </p>
      <button
        @click="handleExploreMounthYear('next')"
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
        สุ่มตัวอย่างเพิ่ม
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type-of-news {
  flex: 0 0 20px;

  @include mobile {
    flex: 0 0 5px;
  }
}

.cantclick {
  opacity: 0.3;
  pointer-events: none;
}
</style>

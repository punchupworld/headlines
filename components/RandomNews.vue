<script setup lang="ts">
const props = defineProps({
  current_step: Number,
  isInStorytelling: Boolean,
});

const selectedNews = ref([]);
const random_news = ref([]);
const total = ref(0);

const fetchData = async () => {
  try {
    const response = await fetch("/data/lifecycle/คดีแตงโม-นิดา-newslist.csv");
    const csvText = await response.text();
    // console.log(csvText);
    const rows = csvText.split("\n").map((line) => {
      const [headline, sample, link, date, news_station, category] =
        line.split(",");
      return { headline, sample, link, date, news_station, category };
    });

    random_news.value = rows.filter((x) => x.headline != '"');
    randomNews();
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
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
  console.log(selectedNews.value);

  total.value = data.length;
}

function setDate(date) {
  return new Date(date).toLocaleString("th-TH", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function removeQuote(name) {
  return name.replaceAll('^"|"$', "");
}

onMounted(() => {
  fetchData();
});

watch(
  () => props.current_step,
  (count, prevCount) => {
    randomNews();
  }
);
</script>

<template>
  <div :class="{ 'mt-[40vh]': props.isInStorytelling }">
    {{ selectedNews.category }}
    <div class="flex justify-center" v-if="selectedNews != []">
      <div
        class="type-of-news"
        :class="{
          'bg-brown': selectedNews.category == 'อาชญากรรม',
          'bg-pink': selectedNews.category == 'บันเทิง',
          'bg-lightblue': selectedNews.category == 'สังคมไทย',
          'bg-vermillion': selectedNews.category == 'การเมือง',
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
}
</style>

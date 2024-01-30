<script setup lang="ts">
const props = defineProps({
  current_step: Number,
});

const selectedNews = ref([]);
const random_news = ref([]);
const total = ref(0);

const fetchData = async () => {
  try {
    const response = await fetch("/data/tangmo_news.csv");
    const csvText = await response.text();
    // console.log(csvText);
    const rows = csvText.split("\n").map((line) => {
      const [headline, sample, link, date, news_station, category] =
        line.split(",");
      return { headline, sample, link, date, news_station, category };
    });
    random_news.value = rows;
    randomNews();
    // console.log(randomNews.value);
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function randomNews() {
  let data = random_news.value.filter(
    (x) => x.sample == "part_2_" + props.current_step
  );

  selectedNews.value = data[getRandomInt(data.length)];
  total.value = data.length;
}

function setDate(date) {
  return new Date(date).toLocaleString("th-TH", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
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
  <div class="mt-[40vh]">
    <div class="flex">
      <div
        class="w-[20px]"
        :class="{
          'bg-brown': selectedNews.category == 'อาชญากรรม',
          'bg-pink': selectedNews.category == 'บันเทิง',
          'bg-lightblue': selectedNews.category == 'สังคมไทย',
          'bg-vermillion': selectedNews.category == 'การเมือง',
        }"
      ></div>
      <div
        class="t5 cream max-w-[500px] bg-black p-[10px] mx-auto text-pretty text-left"
      >
        <p class="b4 font-bold">{{ setDate(selectedNews.date) }}</p>
        <h1 class="t4">{{ selectedNews.headline }}</h1>
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

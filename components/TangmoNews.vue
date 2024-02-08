<script setup>
import * as d3 from "d3";

const tangmo_news = ref([]);
const maxHeightChart = ref(0);

const fetchData = async () => {
  try {
    const response = await fetch("/data/lifecycle/คดีแตงโม-นิดา.json");
    const csvText = await response.json();

    tangmo_news.value = csvText[0].list;

    let arr = tangmo_news.value.map((object) => {
      return object["total"];
    });

    let max = Math.max(...arr);

    maxHeightChart.value = max;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
};

function setMarginLeft(date) {
  const x = d3.scaleTime(
    [new Date("2022/1/1"), new Date("2023/12/31")],
    [0, 3650]
  );

  return x(new Date(date)) + "px";
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="h-[215px] flex items-end relative">
    <div
      v-for="(item, i) in tangmo_news"
      class="chart"
      :style="{
        left: setMarginLeft(item.date),
        height: (item.total / maxHeightChart) * 100 + '%',
      }"
      :data="item.date"
    >
      <div
        :class="{
          'bg-vermillion': item.political != 0,
        }"
        :style="{ height: (item.political / maxHeightChart) * 100 + '%' }"
      ></div>
      <div
        :class="{
          'bg-lightblue': item.th_social != 0,
        }"
        F
        :style="{ height: (item.th_social / maxHeightChart) * 100 + '%' }"
      ></div>
      <div
        :class="{
          'bg-orange': item.economic != 0,
        }"
        :style="{ height: (item.economic / maxHeightChart) * 100 + '%' }"
      ></div>

      <div
        :class="{
          'bg-rose': item.international != 0,
        }"
        :style="{ height: (item.international / maxHeightChart) * 100 + '%' }"
      ></div>
      <div
        :class="{
          'bg-pink': item.entertainment != 0,
        }"
        F
        :style="{ height: (item.entertainment / maxHeightChart) * 100 + '%' }"
      ></div>
      <div
        :class="{
          'bg-brown': item.crime != 0,
        }"
        :style="{ height: (item.crime / maxHeightChart) * 100 + '%' }"
      ></div>

      <div
        :class="{
          'bg-purple': item.sport != 0,
        }"
        :style="{ height: (item.sport / maxHeightChart) * 100 + '%' }"
      ></div>
      <div
        :class="{
          'bg-blue': item.science_tech != 0,
        }"
        F
        :style="{ height: (item.science_tech / maxHeightChart) * 100 + '%' }"
      ></div>
      <div
        :class="{
          'bg-green': item.environment != 0,
        }"
        :style="{ height: (item.environment / maxHeightChart) * 100 + '%' }"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  position: absolute;
  width: 5px;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>

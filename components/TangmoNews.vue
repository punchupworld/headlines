<script setup>
import * as d3 from "d3";

const props = defineProps({
  current_step: Number,
});

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
  let x;
  if (props.current_step < 8) {
    x = d3.scaleTime([new Date("2022/1/1"), new Date("2023/12/31")], [0, 3650]);
    document.getElementById("tangmo-news-date").style.maxWidth = "fit-content";
  } else {
    x = d3.scaleTime(
      [new Date("2022/1/1"), new Date("2023/12/31")],
      [0, window.innerWidth]
    );
    document.getElementById("tangmo-news-date").style.maxWidth = "100%";
  }

  return x(new Date(date)) + "px";
}

function setScrollTangmoNews() {
  const x = d3.scaleTime(
    [new Date("2022/1/1"), new Date("2023/12/31")],
    [0, 3650]
  );
  const w = window.innerWidth;

  if (props.current_step == 4)
    document.getElementById("tangmo-news-list").scrollLeft = x(
      new Date("2022/3/1")
    );
  else if (props.current_step == 5)
    document.getElementById("tangmo-news-list").scrollLeft = x(
      new Date("2022/4/27")
    );
  else if (props.current_step == 6)
    document.getElementById("tangmo-news-list").scrollLeft = x(
      new Date("2022/6/27")
    );
  else if (props.current_step == 7) {
    let date = "";
    if (w > 992) date = "2023/3/12";
    else if (w > 600) date = "2023/4/25";
    else date = "2023/6/12";

    nextTick(() => {
      document.getElementById("tangmo-news-list").scrollLeft = x(
        new Date(date)
      );
    });
  } else if (props.current_step > 7) {
    document.getElementById("tangmo-news-list").scrollLeft = 0;
    document.getElementById("tangmo-news-date").style.maxWidth = "100%";
  }
}

function onSetHeight(total, date) {
  if (props.current_step == 1) {
    nextTick(() => {
      document.getElementById("tangmo-point").style.left = 275 + "px";
      document.getElementById("tangmo-point").style.paddingBottom = 5 + "px";
    });
    if (date == "2/25/22") return 2 + "%";
  }
  if (props.current_step == 2) {
    if (date == "2/25/22")
      return (parseInt(total) / maxHeightChart.value) * 100 + "%";
  }
  if (props.current_step == 3) {
    nextTick(() => {
      document.getElementById("tangmo-point").style.left = 285 + "px";
    });
    if (date == "2/25/22" || date == "2/26/22")
      return (parseInt(total) / maxHeightChart.value) * 100 + "%";
  } else if (props.current_step > 3)
    return (parseInt(total) / maxHeightChart.value) * 100 + "%";
}

onMounted(() => {
  fetchData();
});

watch(
  () => props.current_step,
  (count, prevCount) => {
    setScrollTangmoNews();
  }
);
</script>

<template>
  <div class="h-[215px] flex items-end relative">
    <img
      src="/image/point.svg"
      alt=""
      class="absolute w-[30px] z-10"
      id="tangmo-point"
      v-if="props.current_step == 1 || props.current_step == 3"
    />
    <div
      class="border-dashed border-l w-1 absolute left-[625px] h-full border-black"
      v-if="props.current_step > 3"
      :class="{ hidden: current_step > 7 }"
    ></div>
    <div
      class="border-dashed border-l w-1 absolute left-[905px] h-full border-black"
      v-if="props.current_step > 4"
      :class="{ hidden: current_step > 7 }"
    ></div>
    <div
      class="border-dashed border-l w-1 absolute left-[2730px] h-full border-black"
      v-if="props.current_step > 6"
      :class="{ hidden: current_step > 7 }"
    ></div>
    <div
      class="border-dashed border-l w-1 absolute left-[2885px] h-full border-black"
      v-if="props.current_step > 6"
      :class="{ hidden: current_step > 7 }"
    ></div>
    <div
      v-for="(item, i) in tangmo_news"
      class="chart h-full bg-[#E3DFCF]"
      :class="{
        'w-1px': props.current_step > 7,
      }"
      :style="{
        left: setMarginLeft(item.date),
      }"
      :id="'date-' + item.date"
    >
      <div
        class="box"
        :style="{
          height: onSetHeight(item.total, item.date),
        }"
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
  </div>
</template>

<style lang="scss" scoped>
.chart {
  position: absolute;
  width: 5px;
  display: flex;
  flex-direction: column-reverse;

  @include mobile {
    width: 10px;
  }

  .box {
    transition: 0.5s;
    display: flex;
    flex-direction: column-reverse;
    // justify-content: flex-end;
  }
}

.w-1px {
  width: 1px !important;
}
</style>

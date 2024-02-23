<script setup lang="ts">
import { ref, toRefs } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { useScroll } from "@vueuse/core";

const isShowDetailsPopup = ref(false);
const newsDetailsList = ref([]);
const newsDetails = ref([]);
const totalOfTypeOfNews = ref(0);
const maxOfTotalNews = ref(0);
const newsDataHeatmap = ref([]);
const typeOfNewsDropdown = ref([]);
const newsDateHeatmapList = ref([]);
const selectedTypeOfNews = ref("ทุกหมวด");
const selectedTypeOfNewsEn = ref("total");
const newsName = ref("");
const currentDate = ref("");
const isShowScroll = ref(false);

const el = ref<HTMLElement | null>(null);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
const { left, right, top, bottom } = toRefs(arrivedState);

const news_type_list = ref([
  "การเมือง",
  "สังคมไทย",
  "เศรษฐกิจ/การเงิน",
  "ต่างประเทศ",
  "บันเทิง",
  "อาชญากรรม",
  "กีฬา",
  "วิทยาศาสตร์/เทคโนโลยี",
  "สิ่งแวดล้อม",
]);

const news_list = ref([
  {
    id: 1,
    name: "รัสเซีย-ยูเครน",
    date: "4 ม.ค. 2022 - 31 ธ.ค. 2023",
    img: "russia-ukraine.svg",
  },
  {
    id: 2,
    name: "โหวตนายก",
    date: "14 ม.ค. 2022 - 5 ต.ค. 2023",
    img: "pm-vote.svg",
  },
  {
    id: 3,
    name: "คดีแตงโม-นิดา",
    date: "25 ก.พ. 2022 - 9 ธ.ค. 2023",
    img: "tangmo.svg",
  },
  {
    id: 4,
    name: "ลุงพล-น้องชมพู่-ป้าแต๋น",
    date: "8 มี.ค. 22 - 30 ธ.ค. 23",
    img: "pol.svg",
  },
  {
    id: 5,
    name: "จัดตั้งรัฐบาล",
    date: "18 มี.ค. 22 - 15 ก.ย. 23",
    img: "gov-alliance.svg",
  },
  {
    id: 6,
    name: "ปริญญ์คุกคามทางเพศ",
    date: "14 เม.ย. 22 - 14 ธ.ค. 23",
    img: "prin.svg",
  },
  {
    id: 7,
    name: "อิสราเอล-ปาเลสไตน์",
    date: "15 เม.ย. 22 - 31 ธ.ค. 23",
    img: "israeli-palestine.svg",
  },
  {
    id: 8,
    name: "หลวงปู่แสง",
    date: "21 เม.ย. 22 - 27 มิ.ย. 23",
    img: "sang.svg",
  },
  {
    id: 9,
    name: "โตโน่ว่ายน้ำ",
    date: "30 ก.ค. 22 - 1 พ.ค. 23",
    img: "tono.svg",
  },
  {
    id: 10,
    name: "กำนันนก",
    date: "7 ก.ย. 23 - 18 ธ.ค. 23",
    img: "nok.svg",
  },
]);

const fetchData = async () => {
  try {
    const response = await fetch("/data/lifecycle/total_news_list.json");
    const csvText = await response.json();

    newsDetailsList.value = csvText;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
};

const fetchDataHeatmap = async (name) => {
  const response = await fetch("/data/lifecycle/" + name + ".json");
  const csvText = await response.json();

  newsDataHeatmap.value = csvText[0];

  let data = newsDetailsList.value.filter((x) => x.topics == name);
  newsDetails.value = data[0];

  setDataForHeatmap();
};

const setDateListForHeatmap = async () => {
  newsDateHeatmapList.value = [];

  let x;

  if (selectedTypeOfNews.value != "ทุกหมวด")
    x = newsDataHeatmap.value.list.filter(
      (x) => x[selectedTypeOfNewsEn.value] != 0
    );
  else x = newsDataHeatmap.value.list;

  x.forEach((element) => {
    newsDateHeatmapList.value.push(element.date);
  });

  setCurrentDate(newsDateHeatmapList.value[0]);
};

function setDataForHeatmap() {
  typeOfNewsDropdown.value = [];
  totalOfTypeOfNews.value = 0;

  if (selectedTypeOfNews.value != "ทุกหมวด") {
    let x = newsDataHeatmap.value.total_of_news.filter(
      (x) => x.name == selectedTypeOfNews.value
    );

    selectedTypeOfNewsEn.value = x[0]["name_en"];
  } else {
    selectedTypeOfNewsEn.value = "total";
  }

  let arr = newsDataHeatmap.value.list.map((object) => {
    return object[selectedTypeOfNewsEn.value];
  });

  let max = Math.max(...arr);

  maxOfTotalNews.value = max;

  currentDate.value = newsDataHeatmap.value.list[0].date;

  if (newsDataHeatmap.value != []) {
    newsDataHeatmap.value.total_of_news.forEach((element) => {
      if (element.total != 0) {
        totalOfTypeOfNews.value++;

        typeOfNewsDropdown.value.push({
          value: element.name,
          text: element.name,
        });
      }
    });
  }

  setDateListForHeatmap();
  onCheckScrollOnHeatmap();
}

function onCheckScrollOnHeatmap() {
  isShowScroll.value = false;

  nextTick(() => {
    var popup = document.getElementById("heatmap-wrapper").offsetWidth;
    var heatmap = document.getElementById("heatmap-wrapper").scrollWidth;

    if (heatmap > popup) isShowScroll.value = true;
  });
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

function setOpacity(total) {
  let x = "";
  let rgb = "";

  if (selectedTypeOfNews.value == "ทุกหมวด") rgb = "0,0,0";
  else if (selectedTypeOfNews.value == "การเมือง") rgb = "255,61,0";
  else if (selectedTypeOfNews.value == "สังคมไทย") rgb = "74,218,218";
  else if (selectedTypeOfNews.value == "เศรษฐกิจ/การเงิน") rgb = "255, 152, 77";
  else if (selectedTypeOfNews.value == "ต่างประเทศ") rgb = "189, 69, 83";
  else if (selectedTypeOfNews.value == "บันเทิง") rgb = "255, 178, 172";
  else if (selectedTypeOfNews.value == "อาชญากรรม") rgb = "140, 99, 69";
  else if (selectedTypeOfNews.value == "กีฬา") rgb = "170, 146, 227";
  else if (selectedTypeOfNews.value == "วิทยาศาสตร์/เทคโนโลยี")
    rgb = "37, 125, 204";
  else if (selectedTypeOfNews.value == "สิ่งแวดล้อม") rgb = "155,185,90";

  if (total == maxOfTotalNews.value) x = "rgba(" + rgb + ",1)";
  else if (total == 1) x = "rgba(" + rgb + ",0.2)";
  else {
    let op = (20 + (total - 1)) / (maxOfTotalNews.value - 1);
    console.log(total, maxOfTotalNews.value);

    x = "rgba(" + rgb + "," + op + ")";
  }

  return x;
}

function showDetails(name) {
  fetchDataHeatmap(name);
  newsName.value = name;
  selectedTypeOfNews.value = "ทุกหมวด";
  totalOfTypeOfNews.value = 0;
  isShowDetailsPopup.value = true;
}

function setCurrentDate(date) {
  currentDate.value = date;
}

function closeModal() {
  isShowDetailsPopup.value = false;
}

onMounted(() => {
  const ele = document.getElementById("news-list");

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    ele.style.userSelect = "none";

    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  // Attach the handler
  ele.addEventListener("mousedown", mouseDownHandler);

  fetchData();
});
</script>

<template>
  <div class="text-left">
    <div class="max-w-[850px] mx-auto px-4">
      <h5 class="h5 font-bold text-center">
        สำรวจ 10 ข่าวที่ได้พื้นที่สื่อนานในปี 2022-2023
      </h5>

      <div class="border-white border-2 p-2.5 mt-3 b5 text-left">
        <div class="w-[8px] h-[8px] bg-black inline-block mx-1"></div>
        <span><b>มีสี </b>= วันที่มีข่าว</span>
        <div
          class="w-[8px] h-[8px] bg-[#E3DFCF] border border-[#939393] inline-block mx-1"
        ></div>
        <span><b>สีขาว </b>= วันที่ไม่มีข่าว</span>
        <img
          src="/image/lifecycle/many_news.svg"
          class="inline-block mx-1"
          alt=""
        />
        <span><b>มีหลายสี </b>= วันที่มีข่าวหลายหมวด</span>

        <hr class="border-[#C5C4C4] my-2" />

        <template v-for="item in news_type_list">
          <div
            class="w-[8px] h-[8px] inline-block mx-1"
            :class="{
              'bg-vermillion': item == 'การเมือง',
              'bg-lightblue': item == 'สังคมไทย',
              'bg-orange': item == 'เศรษฐกิจ/การเงิน',
              'bg-rose': item == 'ต่างประเทศ',
              'bg-pink': item == 'บันเทิง',
              'bg-brown': item == 'อาชญากรรม',
              'bg-purple': item == 'กีฬา',
              'bg-blue': item == 'วิทยาศาสตร์/เทคโนโลยี',
              'bg-green': item == 'สิ่งแวดล้อม',
            }"
          ></div>
          <span>{{ item }}</span>
        </template>
      </div>
    </div>

    <div class="relative">
      <div
        class="px-[16px] lg:px-[50px] overflow-x-scroll cursor-grab relative"
        id="news-list"
      >
        <div class="py-5">
          <div class="flex items-center">
            <img src="/image/trends/Click.svg" alt="" class="w-[20px]" />
            <p class="b5">คลิกแต่ละข่าวเพื่อดูรายละเอียด</p>
          </div>
          <img src="/image/lifecycle/date.svg" alt="" class="max-w-fit" />
        </div>

        <div class="relative w-fit">
          <template v-for="item in news_list">
            <div class="hover:bg-white/30" @click="showDetails(item.name)">
              <div class="sticky left-0 pt-3 inline-block">
                <p class="b4 font-bold">
                  {{ item.name }}
                </p>
                <p class="b4 text-[#717070]">{{ item.date }}</p>
              </div>
              <img
                :src="'/image/lifecycle/timeline_chart/' + item.img"
                class="max-w-fit pb-3"
                alt=""
              />
            </div>
          </template>
        </div>
      </div>

      <div
        class="fixed bg-black/30 top-0 left-0 right-0 z-10 h-full bottom-0 items-center justify-center flex"
        v-if="isShowDetailsPopup"
      >
        <div
          id="popup-wrapper"
          class="max-w-[95vw] lg:max-w-[820px] bg-white m-auto p-5 md:p-10 relative h-fit w-full"
          v-on-click-outside="closeModal"
        >
          <img
            @click="isShowDetailsPopup = false"
            src="/image/CanclePink.svg"
            alt=""
            class="absolute -top-2 -right-2 cursor-pointer"
          />
          <h4 class="t4">
            {{ newsDetails.topics }}
          </h4>
          <p class="b3 py-1 md:py-3">
            พบ
            <b
              >{{
                parseInt(newsDetails.number_of_headlines).toLocaleString()
              }}
              ข่าว</b
            >
            ใน
            <b>{{ totalOfTypeOfNews }} หมวดข่าว</b>
          </p>

          <template v-for="item in newsDataHeatmap.total_of_news">
            <div
              v-if="item.total != 0"
              class="w-[8px] h-[8px] inline-block mx-1"
              :class="{
                'bg-vermillion': item.name == 'การเมือง',
                'bg-lightblue': item.name == 'สังคมไทย',
                'bg-orange': item.name == 'เศรษฐกิจ/การเงิน',
                'bg-rose': item.name == 'ต่างประเทศ',
                'bg-pink': item.name == 'บันเทิง',
                'bg-brown': item.name == 'อาชญากรรม',
                'bg-purple': item.name == 'กีฬา',
                'bg-blue': item.name == 'วิทยาศาสตร์/เทคโนโลยี',
                'bg-green': item.name == 'สิ่งแวดล้อม',
              }"
            ></div>
            <span class="b5" v-if="item.total != 0"
              >{{ item.name }}
              <b>{{ parseInt(item.total).toLocaleString() }}</b></span
            >
          </template>

          <hr class="border-[#C5C4C4] my-4" />

          <p class="b3">
            <b>ได้พื้นที่สื่อ {{ newsDetails.total_day }} วันที่มีข่าว</b>
            <span class="text-[#717070] b5"> (นับเฉพาะวันที่มีข่าว)</span>
          </p>
          <p class="b5">
            วันที่มีข่าวครั้งแรก :
            {{ setDate(newsDetails.start_date) }}
          </p>
          <p class="b5">
            วันที่มีข่าวครั้งสุดท้าย :
            {{ setDate(newsDetails.end_date) }}
          </p>

          <div class="flex items-center justify-between py-1 md:py-3">
            <div>
              <p class="b6">
                <b>1 แท่ง</b> = 1 วัน <b class="ml-1">สีเข้ม</b> = จำนวนข่าวเยอะ
              </p>
            </div>
            <div>
              <select
                v-model="selectedTypeOfNews"
                class="b5 bg-[#F4F4F4] w-[100px] p-1"
                @change="setDataForHeatmap()"
              >
                <option value="ทุกหมวด">ทุกหมวด</option>
                <option :value="item.value" v-for="item in typeOfNewsDropdown">
                  {{ item.text }}
                </option>
              </select>
            </div>
          </div>

          <div class="relative">
            <div
              ref="el"
              class="flex overflow-x-scroll"
              id="heatmap-wrapper"
              v-if="newsDataHeatmap != null"
            >
              <div
                v-for="item in newsDataHeatmap.list"
                class="heatmap-bar"
                :date="item.date"
                :total="item[selectedTypeOfNewsEn]"
                :class="{
                  'pointer-events-none': item[selectedTypeOfNewsEn] == 0,
                  selected: currentDate == item.date,
                }"
                :style="{
                  backgroundColor: setOpacity(item[selectedTypeOfNewsEn]),
                }"
                @click="setCurrentDate(item.date)"
              ></div>
            </div>

            <div
              class="flex justify-end items-center pointer-events-none absolute right-0 top-0 bottom-0 scroll-box"
              v-if="!right"
            >
              <p class="b5 text-right pr-1">เลื่อน</p>
              <img src="/image/lifecycle/drag.svg" alt="" class="w-[12px]" />
            </div>
          </div>

          <RandomNews
            class="pt-3"
            :isInStorytelling="false"
            :hasSelectDate="true"
            :news="newsName"
            :current_date="currentDate"
            :date_list="newsDateHeatmapList"
            :typeNews="selectedTypeOfNews"
            @changeDate="setCurrentDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#news-list::-webkit-scrollbar {
  display: none;
}

.heatmap-bar {
  max-width: 5px;
  width: 100%;
  height: 60px;
  border: 2px solid transparent;

  @include mobile {
    width: 2px;
    height: 30px;
    border: 2px solid transparent;
  }
}

.heatmap-bar:hover,
.selected {
  border: 2px solid #ff006b;
}

#heatmap-wrapper::-webkit-scrollbar {
  display: none;
}

option:checked {
  font-weight: bold;
}

.scroll-box {
  background: linear-gradient(
    270deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 104.35%
  );
}
</style>

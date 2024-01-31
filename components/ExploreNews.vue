<script setup>
const isShowDetailsPopup = ref(false);
const newsDetailsList = ref([]);
const newsDetails = ref([]);
const totalOfTypeOfNews = ref([]);
const newsDataHeatmap = ref([]);

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
    date: "24 ก.พ. 2022 - 12 ก.ย. 2023",
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
    const response = await fetch("/data/lifecycle/total_news_list.csv");
    const csvText = await response.text();
    // console.log(csvText);
    const rows = csvText.split("\n").map((line) => {
      const [
        topics,
        number_of_headlines,
        total_day,
        start_date,
        left_margin,
        end_date,
        การเมือง,
        สังคมไทย,
        เศรษฐกิจ,
        ต่างประเทศ,
        บันเทิง,
        อาชญากรรม,
        กีฬา,
        วิทยาศาสตร์,
        สิ่งแวดล้อม,
      ] = line.split(",");
      return {
        topics,
        number_of_headlines,
        total_day,
        start_date,
        left_margin,
        end_date,
        การเมือง,
        สังคมไทย,
        เศรษฐกิจ,
        ต่างประเทศ,
        บันเทิง,
        อาชญากรรม,
        กีฬา,
        วิทยาศาสตร์,
        สิ่งแวดล้อม,
      };
    });
    newsDetailsList.value = rows;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
};

const fetchDataHeatmap = async (name) => {
  try {
    const response = await fetch("/data/lifecycle/" + name + ".csv");
    const csvText = await response.text();
    // console.log(csvText);
    const rows = csvText.split("\n").map((line) => {
      const [
        date,
        การเมือง,
        กีฬา,
        ต่างประเทศ,
        บันเทิง,
        วิทยาศาสตร์เทคโนโลยี,
        เศรษฐกิจ,
        สังคมไทย,
        สิ่งแวดล้อม,
        อาชญากรรม,
        total,
      ] = line.split(",");
      return {
        date,
        การเมือง,
        กีฬา,
        ต่างประเทศ,
        บันเทิง,
        วิทยาศาสตร์เทคโนโลยี,
        เศรษฐกิจ,
        สังคมไทย,
        สิ่งแวดล้อม,
        อาชญากรรม,
        total,
      };
    });

    newsDataHeatmap.value = rows;
    newsDataHeatmap.value.shift();

    let arr = newsDataHeatmap.value.map((object) => {
      return object.total;
    });
    let max = Math.max(...arr);

    // console.log(max);
    // console.log(newsDataHeatmap.value);
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
};

function setDate(date) {
  return new Date(date).toLocaleString("th-TH", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function showDetails(name) {
  fetchDataHeatmap("รัสเซีย-ยูเครน");
  totalOfTypeOfNews.value = [];
  isShowDetailsPopup.value = true;
  let data = newsDetailsList.value.filter((x) => x.topics == name);
  newsDetails.value = data;

  news_type_list.value.forEach((element) => {
    let name = element.split("/")[0];
    if (data[0][name] != null && data[0][name] != 0)
      totalOfTypeOfNews.value.push({
        name: element,
        total: data[0][name],
      });
  });
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
        <span><b>มีสี = วันที่มีข่าว</b></span>
        <div
          class="w-[8px] h-[8px] bg-[#E3DFCF] border border-[#939393] inline-block mx-1"
        ></div>
        <span><b>ไม่มีสี = วันที่ไม่มีข่าว</b></span>
        <img
          src="/image/lifecycle/many_news.svg"
          class="inline-block mx-1"
          alt=""
        />
        <span><b>มีหลายสี = วันที่มีข่าวหลายหมวด</b></span>

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

    <div
      class="px-[16px] lg:px-[50px] overflow-x-auto cursor-grab relative"
      id="news-list"
    >
      <div class="py-5 sticky left-0 top-0">
        <div class="flex items-center">
          <img src="/image/trends/Click.svg" alt="" class="w-[20px]" />
          <p class="b5">คลิกแต่ละข่าวเพื่อดูรายละเอียด</p>
        </div>
        <img src="/image/lifecycle/date.svg" alt="" class="max-w-fit" />
      </div>

      <template v-for="item in news_list">
        <div class="sticky left-0 pt-3">
          <p class="b4 font-bold" @click="showDetails(item.name)">
            {{ item.name }}
          </p>
          <p class="b4 text-[#717070]">{{ item.date }}</p>
        </div>
        <img
          :src="'/image/lifecycle/timeline_chart/' + item.img"
          class="max-w-fit pb-3"
          alt=""
        />
      </template>

      <div
        class="absolute top-0 left-0 right-0 max-w-[820px] bg-white mx-auto p-10 z-10"
        v-if="isShowDetailsPopup"
      >
        <h4 class="t4">{{ newsDetails[0].topics }}</h4>
        <p class="b3 py-3">
          พบ
          <b
            >{{
              parseInt(newsDetails[0].number_of_headlines).toLocaleString()
            }}
            ข่าว</b
          >
          ใน
          <b>{{ totalOfTypeOfNews.length }} หมวดข่าว</b>
        </p>

        <template v-for="item in totalOfTypeOfNews">
          <div
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
          <span class="b5"
            >{{ item.name }}
            <b>{{ parseInt(item.total).toLocaleString() }}</b></span
          >
        </template>

        <hr class="border-[#C5C4C4] my-4" />

        <p class="b3">
          <b>ได้พื้นที่สื่อ {{ newsDataHeatmap.length - 2 }} วันที่มีข่าว</b>
          <span class="text-[#C5C4C4] b5"> (นับเฉพาะวันที่มีข่าว)</span>
        </p>
        <p class="b5">
          วันที่มีข่าวครั้งแรก : {{ setDate(newsDataHeatmap[0].date) }}
        </p>
        <p class="b5">
          วันที่มีข่าวครั้งสุดท้าย :
          {{ setDate(newsDataHeatmap[newsDataHeatmap.length - 1].date) }}
        </p>

        <!-- <div class="flex py-3">
          <div
            v-for="item in newsDataHeatmap"
            class="w-[1px] h-[30px] bg-black"
            :class="{ 'opacity-20': item.total == 1 }"
          ></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#news-list::-webkit-scrollbar {
  display: none;
}
</style>

<script setup>
const news_type_list = [
  "การเมือง",
  "สังคมไทย",
  "เศรษฐกิจ/การเงิน",
  "ต่างประเทศ",
  "บันเทิง",
  "อาชญากรรม",
  "กีฬา",
  "วิทยาศาสตร์/เทคโนโลยี",
  "สิ่งแวดล้อม",
];
</script>

<template>
  <div>
    <h5 class="h5 font-bold">
      สำรวจ 10 ข่าวที่ได้พื้นที่สื่อนานในปี 2022-2023
    </h5>

    <div class="border-white border-2 p-2.5 mt-3 b5 text-center sm:text-left">
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
          }"
        ></div>
        <span>{{ item }}</span>
      </template>
    </div>
  </div>
</template>

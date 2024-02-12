<script setup>
import { defineProps } from "vue"
const props = defineProps({
  storyData: Object,
  category: String,
  totalCategoryData: Array,
  totalMonthData: Array,
  height: Number,
  color: String,
  isExplore: Boolean
})

const monthShortTH = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
]

const categoryList = [
  { name: "การเมือง", color: "bg-vermillion" },
  { name: "สังคมไทย", color: "bg-lightblue" },
  { name: "เศรษฐกิจ/การเงิน", color: "bg-orange" },
  { name: "ต่างประเทศ", color: "bg-rose" },
  { name: "บันเทิง", color: "bg-pink" },
  { name: "อาชญากรรม", color: "bg-brown" },
  { name: "กีฬา", color: "bg-purple" },
  { name: "วิทยาศาสตร์/เทคโนโลยี", color: "bg-blue" },
  { name: "สิ่งแวดล้อม", color: "bg-green" },
]

const colorCondition = (index) => {
  if (props.category === "การเมือง") {
    return [4, 16].includes(index)
  } else if (props.category === "ต่างประเทศ") {
    return [2, 6, 8, 10, 14, 21].includes(index)
  } else if (props.category === "อาชญากรรม") {
    return [6, 20].includes(index)
  } else if (props.category === "กีฬา") {
    return [4, 10, 20].includes(index)
  } else if (props.category === "สิ่งแวดล้อม") {
    return [8].includes(index)
  } else {
    return true
  }
}

const calculateHeight = (count, maxHeigh, category, max) => {
  if (category === "Total") {
    if (props.totalMonthData.length > 0) {
      let maxValueOfAll = Math.max(...props.totalMonthData.map((d) => d.total))
      let scalePercent = (count * 100) / maxValueOfAll
      let scale = Math.ceil((scalePercent * maxHeigh) / 100)
      return scale
    } else {
      return 0
    }
  } else {
    let scalePercent = (count * 100) / max
    let scale = Math.ceil((scalePercent * maxHeigh) / 100)
    return scale
  }
}

const yAxis = {
    'การเมือง' : [3000, 2500, 2000, 1500],
    'สังคมไทย' : [2000, 1500, 1000, 500],
    'เศรษฐกิจ/การเงิน' : [1000, 800, 600, 400],
    'ต่างประเทศ' : [1000, 800, 600, 400],
    'บันเทิง' : [800, 600, 400, 200],
    'อาชญากรรม' : [700,500,300,100],
    'กีฬา' : [400,300,200,100],
    'วิทยาศาสตร์/เทคโนโลยี' : [200,150,100,50],
    'สิ่งแวดล้อม' : [200,150,100,50]
}
</script>

<template>
  <div

    class="opacity-0 absolute pointer-events-none"
    style="transition: opacity 0.5s ease">
    <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
      จำนวนข่าว{{ category }}รายเดือน
    </p>
    <div class="relative">
      <div
        class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]">
        <div
          class="flex items-end gap-[1px] max-[375px]:w-[90vw] justify-center pointer-events-none">
          <div
            v-if="storyData && storyData[category]"
            v-for="(item, index) in storyData[category]['monthly']"
            :key="index"
            class="group flex flex-col items-center gap-2"
            :style="{
              width: `${90 / 24}%`,
            }"
            @click="scrollToSection()">
            <div
              v-if="totalCategoryData.length > 0"
              :class="colorCondition(index) ? color : `opacity-50 ${color}`"
              class="w-full cursor-pointer relative"
              :style="{
                height: `${calculateHeight(
                  item.total,
                  height,
                  'การเมือง',
                  parseInt(
                    totalCategoryData.find((item) =>
                      item.category.includes(category)
                    ).max
                  )
                )}px`,
              }"></div>
            <p
              class="text-[#939393] -rotate-90 b6"
              style="pointer-events: none">
              {{ monthShortTH[item.month - 1] }}
            </p>
          </div>
        </div>

        <div
          class="z-0 absolute bottom-0 w-full h-full md:px-[10px]"
          style="pointer-events: none">
          <div class="flex flex-col justify-between h-full p-[5px]">
            <div>
              <p class="b5 border-b border-black border-dotted">{{ yAxis[category][0].toLocaleString() }}</p>
            </div>
            <p class="b5 border-b border-black border-dotted">{{ yAxis[category][1].toLocaleString() }}</p>
            <p class="b5 border-b border-black border-dotted">{{ yAxis[category][2].toLocaleString() }}</p>
            <p class="b5 border-b border-black border-dotted">{{ yAxis[category][3].toLocaleString() }}</p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
      <div
        class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]">
        <p>2022</p>
        <p>2023</p>
      </div>
      <div
        class="absolute top-0 right-[50%] w-full h-full border-r-[2px] border-[#C5C4C4]"
        style="pointer-events: none"></div>
    </div>

    <div
      v-if="isExplore"
      class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]">
      <div v-for="(item, index) in categoryList">
        <div class="flex items-center gap-[5px] pr-[10px]">
          <div :class="item.color" class="w-[10px] h-[10px]"></div>
          <p class="b5">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

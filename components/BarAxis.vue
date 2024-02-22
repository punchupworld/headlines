<script setup>
const props = defineProps({
  isSection2: Boolean,
  maxOfMonthly: Number,
  totalDataEachCategory: Array,
  isExplore: Boolean,
  exploreModeSelected: String,
  categorySelected: String,
})

const findPlaceValue = (num) => {
  let placeValue = 1
  while (num >= 10) {
    num /= 10
    placeValue *= 10
  }
  return placeValue
}

const findYAxisScale = () => {
  let num
  let yAxisScale
  if (props.exploreModeSelected === "หมวดข่าว") {
    num =
      props.totalDataEachCategory.find(
        (item) => item.category === props.categorySelected
      )?.max || "N/A"
  } else if (props.exploreModeSelected === "คีย์เวิร์ด") {
    num = props.maxOfMonthly
  }

  let placeValue = findPlaceValue(num)
  // if(((num/placeValue)-Math.floor(num/placeValue)) > 0.5){
  //   yAxisScale = Math.ceil(num / placeValue) * placeValue
  // }else if(((num/placeValue)-Math.floor(num/placeValue)) <= 0.5){
  //   yAxisScale = ((Math.floor(num / placeValue))+0.5) * placeValue
  // }
  yAxisScale = (num / placeValue) * placeValue
  return yAxisScale
}


const yAxis = {
  การเมือง: [3000, 2500, 2000, 1500, 1000, 500],
  สังคมไทย: [2500, 2000, 1500, 1000, 500],
  "เศรษฐกิจ/การเงิน": [1200, 1000, 800, 600, 400, 200],
  ต่างประเทศ: [1000, 800, 600, 400, 200],
  บันเทิง: [800, 600, 400, 200], 
  อาชญากรรม: [700, 600, 500, 400, 300, 200, 100],
  กีฬา: [400, 300, 200, 100],
  "วิทยาศาสตร์/เทคโนโลยี": [200, 150, 100, 50],
  สิ่งแวดล้อม: [250, 200, 150, 100, 50],
}
const styleValue = computed(() => {
  let width = window.innerWidth
  if (!props.isExplore) {
    if (width <= 320) {
      return "height: 80%; top: 1px"
    } else if (width <= 375) {
      return "height: 80%; top: 2px"
    } else if (width <= 430) {
      return "height: 80%; top: 6px"
    } else if (width <= 768) {
      return "height: 80%; top: 11px"
    } else {
      return "height: 80%; top: 11px"
    }
  } else if (props.exploreModeSelected === "หมวดข่าว") {
    if (props.categorySelected.includes("การเมือง")) {
      if (width <= 320 || width < 768) {
        return "-top-[9px] h-[77%]"
      } 
      else if(width >= 768 && width < 1024){
        return "-top-[14px] h-[77%]"
      }
      else {
        return "-top-[11px] h-[65%]"
      }
    } else if (props.categorySelected.includes("สังคมไทย")) {
      if (width <= 320||width<768) {
        return "-top-[19px] h-[75%]"
      } else if (width >= 768 && width < 1024) {
        return "-top-[21px] h-[70%]"
      }else{
        return "-top-[27px] h-[70%]"
      }
    } else if (props.categorySelected.includes("เศรษฐกิจ/การเงิน")) {
      if (width <= 336 || width < 768) {
        return "-top-[24px] h-[80%]"
      }else if(width >= 768&& width < 1024){
        return "-top-[31px] h-[80%]"
      } else {
        return "-top-[31px] h-[73%]"
      }
    } else if (props.categorySelected.includes("ต่างประเทศ")) {
      if(width <= 320||width<768){
        return "-top-[7.5px] h-[70%]"
      }else if(width >= 768&& width < 1024){
        return "-top-[14px] h-[70%]"
      }else{
        return "-top-[15px] h-[65%]"
      }
      
    } else if (props.categorySelected.includes("บันเทิง")) {
      if (width <= 320||width<768) {
        return "-top-[1px] h-[67%]"
      }else if(width >= 768&& width < 1024){
        return "-top-[6px] h-[65%]"
      } else {
        return "-top-[6px] h-[60%]"
      }
    } else if (props.categorySelected.includes("อาชญากรรม")) {
      if (width <= 320||width<768) {
        return "-top-[13px] h-[80%]"
      }else if(width >= 768&& width < 1024){
        return "-top-[17px] h-[77%]"
      } else {
        return "-top-[16px] h-[70%]"
      }
    } else if (props.categorySelected.includes("กีฬา")) {
      if (width <= 320||width<768) {
        return "-top-[7px] h-[70%]"
      }else if(width >= 768&& width < 1024){
        return "-top-[12px] h-[69%]"
      }
       else {
        return "-top-[7px] h-[60%]"
      }
    } else if (props.categorySelected.includes("วิทยาศาสตร์/เทคโนโลยี")) {
      if (width <= 320||width<768) {
        return "top-[3px] h-[65%]"
      } else if(width >= 768&& width < 1024){
        return "-top-[3px] h-[64%]"
      }else {
        return "-top-[3px] h-[60%]"
      }
    } else if (props.categorySelected.includes("สิ่งแวดล้อม")) {
      if (width <= 320||width<768) {
        return "-top-[12px] h-[74%]"
      } else if(width >= 768&& width < 1024){
        return "-top-[16px] h-[72%]"
      }else {
        return "-top-[19px] h-[67%]"
      }
    }
  } else if (props.exploreModeSelected === "คีย์เวิร์ด") {
    if(width <= 320){
      return "h-[96%] -top-[14px]"
    }else if(width >= 768&& width < 1024){
        return "h-[90%] -top-[21px]"
      }else{
      return "h-[81.5%] -top-[20px]"
    }
      
  }
})
</script>

<template>
  <div
    class="z-0 absolute w-full"
    :class="isExplore ? styleValue : 'md:px-[10px]'"
    :style="styleValue"
    style="pointer-events: none">
    <div
      :class="isExplore ? 'p-[2px]' : 'p-[6px]'"
      class="flex flex-col justify-between h-full p-[4px]"
      v-if="exploreModeSelected === 'หมวดข่าว'">
      <p
        class="b6 border-b border-black border-dotted pl-[5px]"
        v-for="(item, i) in yAxis[categorySelected]">
        {{ yAxis[categorySelected][i].toLocaleString() }}
      </p>
    </div>
    <div
      v-if="exploreModeSelected === 'คีย์เวิร์ด' || !isExplore"
      class="flex flex-col justify-between h-full"
      :class="isExplore ? 'p-[2px]' : 'p-[6px]'">
      <div class="space-y-2">
        <p class="b6 border-b border-black border-dotted pl-[5px]">
          <span v-if="isExplore">
            {{ Math.ceil((findYAxisScale() * 4) / 4).toLocaleString() }}</span
          >
          <span v-else>{{ (8000).toLocaleString() }}</span>
        </p>
        <div v-if="isSection2" class="border-b-[2px] border-[#FF006B] relative">
          <p
            class="absolute -top-1.5 b6 text-[#FF006B] font-black stoke pl-[5px]"
            style="
              text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
                1px 1px 0 #fff;
            ">
            {{ (7816).toLocaleString() }}
          </p>
        </div>
      </div>
      <p class="b6 border-b border-black border-dotted pl-[5px]">
        <span v-if="isExplore">
          {{ Math.ceil((findYAxisScale() * 3) / 4).toLocaleString() }}</span
        >
        <span v-else>{{ (6000).toLocaleString() }}</span>
      </p>
      <p class="b6 border-b border-black border-dotted pl-[5px]">
        <span v-if="isExplore">
          {{ Math.ceil((findYAxisScale() * 2) / 4).toLocaleString() }}</span
        >
        <span v-else>{{ (4000).toLocaleString() }}</span>
      </p>
      <p class="b6 border-b border-black border-dotted pl-[5px]">
        <span v-if="isExplore">
          {{ Math.ceil((findYAxisScale() * 1) / 4).toLocaleString() }}</span
        >
        <span v-else>{{ (2000).toLocaleString() }}</span>
      </p>
      <p v-if="isExplore"></p>
      
      <p></p>
    </div>
  </div>
</template>

<style scoped>
/* .stoke {
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white;
} */
</style>

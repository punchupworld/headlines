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
  if (props.exploreModeSelected === "หมวดข่าว") {
    num =
      props.totalDataEachCategory.find(
        (item) => item.category === props.categorySelected
      )?.max || "N/A"
  } else if (props.exploreModeSelected === "คีย์เวิร์ด") {
    num = props.maxOfMonthly
  }

  let placeValue = findPlaceValue(num)
  return Math.floor(num / placeValue) * placeValue
}
</script>

<template>
  <div
    class="z-0 absolute bottom-0 w-full h-full"
    :class="isExplore ? '' : 'md:px-[10px]'"
    style="pointer-events: none">
    <div class="flex flex-col justify-between h-full" :class="isExplore ? 'p-[2px]' : 'p-[6px]'">
      <div class="space-y-2">
        <p class="b5 border-b border-black border-dotted">
          
          <span v-if="isExplore"> {{ Math.floor((findYAxisScale() * 4) / 4).toLocaleString() }}</span>
          <span v-else>{{ (8000).toLocaleString() }}</span>
        </p>
        <div v-if="isSection2" class="border-b border-[#FF006B] relative">
          <p class="absolute -top-1.5 b5 text-[#FF006B] font-bold stoke">
            {{ (7816).toLocaleString() }}
          </p>
        </div>
      </div>
      <p class="b5 border-b border-black border-dotted">
        <span v-if="isExplore"> {{ Math.floor((findYAxisScale() * 3) / 4).toLocaleString() }}</span>
          <span v-else>{{ (6000).toLocaleString() }}</span>
      </p>
      <p class="b5 border-b border-black border-dotted">
        <span v-if="isExplore"> {{ Math.floor((findYAxisScale() * 2) / 4).toLocaleString() }}</span>
          <span v-else>{{ (4000).toLocaleString() }}</span>
      </p>
      <p class="b5 border-b border-black border-dotted">
        <span v-if="isExplore"> {{ Math.floor((findYAxisScale() * 1) / 4).toLocaleString() }}</span>
          <span v-else>{{ (2000).toLocaleString() }}</span>
      </p>
      <p v-if="isExplore"></p>
      <p></p>
    </div>
  </div>
</template>

<style scoped>
.stoke {
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white;
}
</style>

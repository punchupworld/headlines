<script setup>
const props = defineProps({
  exploreModeSelected: String,
  dataSet: Object,
  sampleIndex: Number,
  borderColor: String,
  top10Keywords: Array,
  inputKeyword: String,
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
const formatMonth = (inputDate) => {
  const dateParts = inputDate.split("-")
  const day = parseInt(dateParts[2])
  const month = parseInt(dateParts[1])
  const year = parseInt(dateParts[0])
  return `${day} ${monthShortTH[month - 1]} ${year}`
}

const highlightKeyword = (headline, keyword) => {
  if (props.exploreModeSelected === "หมวดข่าว") {
    const keywordsRegex = new RegExp(
      `(${props.top10Keywords
        .map((k) =>
          k.keyword
            .replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
            .replace(/\s+/g, "\\s*")
        )
        .join("|")})`,
      "gi"
    )
    return headline.replace(
      keywordsRegex,
      '<span class="text-[#FFF8B5]">$1</span>'
    )
  } else {
    return headline.replace(
      new RegExp(`(${keyword})`, "gi"),
      '<span class="text-[#FFF8B5]">$1</span>'
    )
  }
}
</script>

<template>
  <div
    v-if="dataSet"
    :class="borderColor"
    class="bg-black border-l-[5px] md:border-l-[10px] text-white p-[10px] space-y-[5px] w-[90vw] max-w-[500px]">
    <p class="b4 font-bold">
      {{ formatMonth(dataSet[sampleIndex].date) }}
    </p>
    <p
      class="t4 font-black p-[3px] break-all"
      v-html="
        highlightKeyword(dataSet[sampleIndex].headline, inputKeyword)
      "></p>
    <p class="b5">
      ที่มา:
      <a :href="dataSet[sampleIndex].link" target="_blank">{{
        dataSet[sampleIndex].news_station
      }}</a>
    </p>
  </div>
</template>

<style scoped>
.overflow-hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

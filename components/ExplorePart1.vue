<script setup>
import scrollama from "scrollama"
import { sum, max } from "d3"
import SampleNews from "/components/SampleNews.vue"
import BarAxis from "/components/BarAxis.vue"

const currentIndex = ref(0)
const headlineShow = ref([])
const exploreModeSelected = ref("หมวดข่าว")
const categoryIndex = ref(0)
const categorySelected = ref("การเมือง")
const maxOfMonthCategory = ref(0)
const inputKeyword = ref("แซ่บ")
const showSuggestions = ref(false)
const isInputFocused = ref(false)
const keywords = ref()
const sampleHeadlineCategory = ref()
const filteredSampleHeadlineCategory = ref()
const exploreCategoryHeadlineData = ref()
const totalDataEachMonth = ref([])
const totalDataEachCategory = ref([])
const dataForKW = ref()
const maxOfMonthly = ref(0)
const exploreRef = ref(null)

const monthTH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]

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

const monthShortEN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

const category = [
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
const fetchExploreCategoryHeadline = async () => {
  const response = await fetch("/data/trends/sample_news_headlines.json")
  const data = await response.json()
  exploreCategoryHeadlineData.value = data
}

const summaryData = async () => {
  const year = [2022, 2023]
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const arrTotalEachMonth = []
  const arrSumEachCategory = []

  let allArr = []
  for (const category in exploreCategoryHeadlineData.value) {
    const monthly = exploreCategoryHeadlineData.value[category].monthly

    monthly.forEach((item) => {
      allArr.push({ ...item, category: category })
    })
  }

  year.forEach((year) => {
    month.forEach((month) => {
      let nowAllArr = allArr.filter(
        (item) => item.year === year && item.month === month
      )
      arrTotalEachMonth.push({
        year,
        month,
        total: sum(nowAllArr, (d) => d.total),
      })
    })
  })
  category.forEach((ct) => {
    const groupByCategory = allArr.filter((item) => item.category === ct.name)
    arrSumEachCategory.push({
      category: ct.name,
      total: sum(groupByCategory, (d) => d.total),
      max: max(groupByCategory, (d) => d.total),
    })
  })
  arrSumEachCategory.push({
    category: "Total",
    total: sum(arrSumEachCategory, (d) => d.total),
  })
  maxOfMonthCategory.value = max(arrTotalEachMonth, (d) => d.total)
  totalDataEachCategory.value = arrSumEachCategory
  totalDataEachMonth.value = arrTotalEachMonth
}

const filterSampleHeadlineCategory = async (category) => {
  let year
  const categoryToCompare = category.toLowerCase()
  filteredSampleHeadlineCategory.value =
    await sampleHeadlineCategory.value.filter((item) => {
      if (categoryIndex.value >= 12) {
        year = 2023
        let cateIndex = categoryIndex.value - 12
        return (
          item.news_category.toLowerCase().includes(categoryToCompare) &&
          item.Year === year &&
          item.Month === monthShortEN[cateIndex]
        )
      } else {
        year = 2022
        return (
          item.news_category.toLowerCase().includes(categoryToCompare) &&
          item.Year === year &&
          item.Month === monthShortEN[categoryIndex.value]
        )
      }
    })
}
const fetchSampleHeadlineCategory = async () => {
  const response = await fetch("/data/trends/HeadlinesSample.json")
  const data = await response.json()
  sampleHeadlineCategory.value = data
  await filterSampleHeadlineCategory(categorySelected.value)
  headlineShow.value = sampleHeadlineCategory.value
    .map((item) => item.headline)
    .slice(0, 10)
}

const fetchAggregateKW = async () => {
  const response = await fetch("/data/trends/aggregate_keywords.json")
  const data = await response.json()
  keywords.value = await data
  suggestionsKW.value = Object.keys(keywords.value)
}

const findMaxOfMonthly = () => {
  let dataValues = dataForKW.value.montly
  let maxValue = Math.max(...dataValues.map((d) => d.total))
  maxOfMonthly.value = maxValue
}
const selectExploreMode = async (mode) => {
  exploreModeSelected.value = mode
  sampleIndex.value = 0
  console.log("เปลี่ยนโหมด")
  console.log(exploreModeSelected.value)
  if (exploreModeSelected.value === "คีย์เวิร์ด") {
    dataForKW.value = await keywords.value[inputKeyword.value]
    findMaxOfMonthly()
  }
}

const getCategoryColorClass = (category) => {
  switch (true) {
    case category.includes("การเมือง"):
      return "bg-vermillion"
    case category.includes("สังคมไทย"):
      return "bg-lightblue"
    case category.includes("เศรษฐกิจ"):
      return "bg-orange"
    case category.includes("ต่างประเทศ"):
      return "bg-rose"
    case category.includes("บันเทิง"):
      return "bg-pink"
    case category.includes("อาชญากรรม"):
      return "bg-brown"
    case category.includes("กีฬา"):
      return "bg-purple"
    case category.includes("วิทยาศาสตร์"):
      return "bg-blue"
    case category.includes("สิ่งแวดล้อม"):
      return "bg-green"
    default:
      return ""
  }
}

const categoryBorderColorMap = {
  การเมือง: "border-[#FF3D00]",
  สังคมไทย: "border-[#4ADADA]",
  เศรษฐกิจ: "border-[#FF984D]",
  ต่างประเทศ: "border-[#BD4553]",
  บันเทิง: "border-[#FFB2AC]",
  อาชญากรรม: "border-[#8C6345]",
  กีฬา: "border-[#AA92E3]",
  วิทยาศาสตร์: "border-[#257DCC]",
  สิ่งแวดล้อม: "border-[#9BB95A]",
}

const getCategoryBorderColor = (category) => {
  for (const key in categoryBorderColorMap) {
    if (category.includes(key)) {
      return categoryBorderColorMap[key]
    }
  }
  return ""
}

const calculateHeightPerCategory = (total, count, maxHeigh, max) => {
  const totalHeight = (total * maxHeigh) / max
  const eachHeight = (count * totalHeight) / total
  return Math.ceil(eachHeight)
}

const calculateHeight = (count, maxHeigh, category, max) => {
  if (category === "Total") {
    if (totalDataEachMonth.value.length > 0) {
      let maxValueOfAll = Math.max(
        ...totalDataEachMonth.value.map((d) => d.total)
      )
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

const handleCurrentIndex = (index) => {
  categoryIndex.value = index
  filterCategoryKeyword(categorySelected.value)
  filterSampleHeadlineCategory(categorySelected.value)
  scrollToSection()
}

const scrollToSection = () => {
  exploreRef.value.scrollIntoView({ behavior: "smooth" })
}

const top10KeywordsData = ref()
const fetchExploreData10Keyword = async () => {
  const response = await fetch("/data/trends/Top10Keyword.json")
  const data = await response.json()
  top10KeywordsData.value = data
}
const top10Keywords = ref()
const filterCategoryKeyword = async (category) => {
  let year
  top10Keywords.value = await top10KeywordsData.value.filter((item) => {
    const itemMonths = item.month.split(",").map((m) => m.toLowerCase())
    const categoryToCompare = category.toLowerCase()
    if (categoryIndex.value >= 12) {
      year = 2023
      let cateIndex = categoryIndex.value - 12
      return (
        item.news_category.toLowerCase().includes(categoryToCompare) &&
        itemMonths.includes(monthShortEN[cateIndex].toLowerCase()) &&
        item.year === year
      )
    } else {
      year = 2022
      return (
        item.news_category.toLowerCase().includes(categoryToCompare) &&
        itemMonths.includes(monthShortEN[categoryIndex.value].toLowerCase()) &&
        item.year === year
      )
    }
  })
}
const handleExploreMounthYear = (action) => {
  if (action === "prev") {
    if (categoryIndex.value !== 0) {
      categoryIndex.value -= 1
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    } else if (categoryIndex.value === 0) {
      categoryIndex.value = 23
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    }
  } else if (action === "next") {
    if (categoryIndex.value !== 23) {
      categoryIndex.value += 1
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    } else if (categoryIndex.value === 23) {
      categoryIndex.value = 0
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    }
  }
}
const selectCategory = (category) => {
  categorySelected.value = category
  filterCategoryKeyword(category)
  filterSampleHeadlineCategory(categorySelected.value)
}

const fullMonthAndYear = computed(() => {
  if (categoryIndex.value >= 12) {
    return `${monthTH[categoryIndex.value - 12]} ${
      categoryIndex.value >= 12 ? 2023 : 2022
    }`
  } else {
    return `${monthTH[categoryIndex.value]} ${
      categoryIndex.value >= 12 ? 2023 : 2022
    }`
  }
})

const findAllWidthForGraph = (el) => {
  const elFocus = document.getElementById(el)
  if (elFocus) {
    const width = elFocus.offsetWidth
    return width
  } else {
    return 0
  }
}

const suggestionsKW = ref([])

const filteredSuggestions = computed(() => {
  const filtered = suggestionsKW.value.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputKeyword.value.toLowerCase())
  )
  return filtered.slice(0, 6)
})

const beforeKeyword = ref("")
const showTheSuggestion = () => {
  showSuggestions.value = true
  inputKeyword.value = ""
  handleInputFocus()
}

const handleInputFocus = () => {
  isInputFocused.value = !isInputFocused.value
}
const clearInput = () => {
  inputKeyword.value = ""
  showSuggestions.value = false
}

const handleInput = () => {
  showSuggestions.value = true
  isInputFocused.value = true
}

const hideSuggestions = () => {
  showSuggestions.value = false
  isInputFocused.value = false
  inputKeyword.value = beforeKeyword.value
}

const selectSuggestion = (selectedValue) => {
  inputKeyword.value = selectedValue
}
const searchKeyword = () => {
  dataForKW.value = keywords.value[inputKeyword.value]
  showSuggestions.value = false
  if (dataForKW.value) {
    beforeKeyword.value = inputKeyword.value
  }
  handleInputFocus()
  findMaxOfMonthly()
}

const handleTyping = () => {
  isInputFocused.value = true
}
const handleSuggestionMouseDown = (selectedValue) => {
  selectSuggestion(selectedValue)
  searchKeyword()
  showSuggestions.value = false
  isInputFocused.value = false
}

const highlightMatchedText = (suggestion) => {
  const typedText = inputKeyword.value.toLowerCase()
  const suggestionLower = suggestion.toLowerCase()
  const index = suggestionLower.indexOf(typedText)

  const highlightedText =
    suggestion.substring(0, index) +
    "<b>" +
    suggestion.substring(index, index + typedText.length) +
    "</b>" +
    suggestion.substring(index + typedText.length)

  return highlightedText
}

const sampleIndex = ref(0)
const handleNewSample = () => {
  if (sampleIndex.value === 9) {
    sampleIndex.value = 0
  }
  sampleIndex.value += 1
}

onMounted(async () => {
  await fetchExploreData10Keyword()
  await filterCategoryKeyword(categorySelected.value)
  await fetchAggregateKW()
  await fetchSampleHeadlineCategory()
  await fetchExploreCategoryHeadline()
  await summaryData()
})
</script>

<template>
  <div id="explore" class="py-[40px] bg-[#EBE8DE] z-10 relative max-w-[850px] mx-auto">
    <h1 class="h5 font-bold text-center">
      สำรวจเทรนด์ข่าวในปี<br />
      2022-2023 ด้วยตัวเอง ผ่าน
    </h1>
    <div
      class="b1 font-bold flex justify-center border-collapse pt-[10px] mb-[5px] w-full">
      <button
        :class="exploreModeSelected === 'หมวดข่าว' ? 'bg-black cream' : ''"
        class="border-black border p-[5px] w-full"
        @click="selectExploreMode('หมวดข่าว')">
        หมวดข่าว
      </button>
      <button
        :class="exploreModeSelected === 'คีย์เวิร์ด' ? 'bg-black cream' : ''"
        class="border-black border p-[5px] w-full"
        @click="selectExploreMode('คีย์เวิร์ด')">
        คีย์เวิร์ด
      </button>
    </div>
    <div class="my-[15px]">
      <div v-if="exploreModeSelected === 'คีย์เวิร์ด'" class="relative">
        <div
          :class="{ 'bg-white': isInputFocused }"
          class="group-focus:bg-white bg-[#EBE8DE] flex justify-between w-full h-full">
          <div class="flex border-b border-[#939393] w-full">
            <img
              src="/image/trends/Search.svg"
              alt=""
              class="w-[16px] m-[5px]" />
            <input
              autocomplete="off"
              type="text"
              name="exploreKeyword"
              list="exploreKeyword"
              id="exploreKeyword"
              @focus="showTheSuggestion"
              @blur="hideSuggestions"
              @keydown.enter="searchKeyword"
              @keydown.down="handleTyping"
              v-model="inputKeyword"
              @input="handleInput"
              class="group text-black bg-[#EBE8DE]/0 b2 font-bold focus:outline-none w-full pl-3 py-[5px]" />
          </div>

          <img
            src="/image/trends/Close.svg"
            alt=""
            class="w-[16px] cursor-pointer border-b border-[#939393]"
            @click="clearInput"
            v-if="!isInputFocused" />
          <button
            v-else
            class="border border-[#FF006B] text-[#FF006B] b4 px-[10px] flex items-center cursor-pointer"
            @mousedown.prevent="searchKeyword">
            ค้นหา
          </button>
        </div>
        <ul
          v-if="showSuggestions && filteredSuggestions.length > 0"
          class="w-full absolute bg-white p-[10px] b2 space-y-[10px] z-10 ml-0">
          <li
            v-for="(suggestion, index) in filteredSuggestions"
            :key="index"
            @mousedown="handleSuggestionMouseDown(suggestion)"
            @click.stop="hideSuggestions"
            class="cursor-pointer">
            <span v-html="highlightMatchedText(suggestion)"></span>
          </li>
        </ul>
      </div>
      <div
        class="flex items-center pb-[10px] w-full"
        v-if="exploreModeSelected === 'หมวดข่าว'">
        <p class="b4">หมวด</p>
        <select
          v-model="categorySelected"
          @change="selectCategory($event.target.value)"
          name=""
          id=""
          class="b2 font-bold bg-[#EBE8DE] border-b-black border w-full px-4 focus:outline-none">
          <option value="การเมือง">การเมือง</option>
          <option value="สังคมไทย">สังคมไทย</option>
          <option value="เศรษฐกิจ/การเงิน">เศรษฐกิจ/การเงิน</option>
          <option value="ต่างประเทศ">ต่างประเทศ</option>
          <option value="บันเทิง">บันเทิง</option>
          <option value="อาชญากรรม">อาชญากรรม</option>
          <option value="กีฬา">กีฬา</option>
          <option value="วิทยาศาสตร์/เทคโนโลยี">วิทยาศาสตร์/เทคโนโลยี</option>
          <option value="สิ่งแวดล้อม">สิ่งแวดล้อม</option>
        </select>
      </div>
      <div
        v-if="
          (exploreModeSelected === 'คีย์เวิร์ด' && dataForKW) ||
          exploreModeSelected === 'หมวดข่าว'
        ">
        <div class="grid grid-cols-2 my-[10px]">
          <div class="flex items-center">
            <p class="b5 font-bold">จำนวนพาดหัวข่าวรายเดือน</p>
          </div>
          <div class="flex items-center justify-end">
            <img src="/image/trends/Click.svg" alt="" class="w-[20px]" />
            <p class="b5" v-if="exploreModeSelected === 'หมวดข่าว'">
              คลิกแต่ละแท่งเพื่อเปลี่ยนเดือน
            </p>
            <p class="b5" v-else>คลิกแต่ละแท่งเพื่อดูจำนวน</p>
          </div>
        </div>
        <div class="relative">
          <div class="relative items-end justify-center w-full mt-6">
            <div class="relative w-full" id="exploreGraph">
              <div
                class="z-10 flex items-end gap-[2px] justify-center lg:w-full">
                <div
                  v-if="
                    exploreModeSelected === 'หมวดข่าว' &&
                    exploreCategoryHeadlineData
                  "
                  v-for="(item, index) in exploreCategoryHeadlineData[
                    categorySelected
                  ]['monthly']"
                  :key="index"
                  class="group flex flex-col items-center gap-2"
                  :style="{
                    width: `${
                      (parseInt(findAllWidthForGraph('exploreGraph')) - 50) / 24
                    }px`,
                  }">
                  <div
                    v-if="totalDataEachCategory.length > 0"
                    @click="handleCurrentIndex(index)"
                    :class="
                      index === categoryIndex
                        ? getCategoryColorClass(categorySelected)
                        : getCategoryColorClass(categorySelected) +
                          ' opacity-50'
                    "
                    class="w-full cursor-pointer relative"
                    :style="{
                      height: `${calculateHeight(
                        item.total,
                        200,
                        `${categorySelected}`,
                        totalDataEachCategory?.find((item) =>
                          item.category.includes(categorySelected)
                        ).max
                      )}px`,
                    }"></div>
                  <p
                    class="text-[#939393] -rotate-90 b6"
                    style="pointer-events: none">
                    {{ monthShortTH[item.month - 1] }}
                  </p>
                </div>
                <div
                  v-if="exploreModeSelected === 'คีย์เวิร์ด'"
                  class="flex flex-col items-end">
                  <div
                    class="cursor-pointer relative flex gap-[2px] w-[90vw] md:px-[9vw] justify-center">
                    <div
                      v-for="(item, itemIndex) in dataForKW.montly"
                      class="flex flex-col cursor-pointer relative justify-end"
                      :style="{
                        width: `${
                          (parseInt(findAllWidthForGraph('explore')) - 50) / 24
                        }px`,
                      }">
                      <div
                        v-if="totalDataEachCategory.length > 0"
                        class="group relative"
                        v-for="(ct, ctNo) in Object.keys(
                          dataForKW.categories_total
                        ).reverse()"
                        :class="getCategoryColorClass(ct)"
                        :style="{
                          height: `${calculateHeightPerCategory(
                            item.total,
                            item[ct],
                            200,
                            maxOfMonthly
                          )}px`,
                        }">
                        <div
                          id="popupDetail"
                          :class="itemIndex > 12 ? 'right-0' : 'left-0'"
                          class="absolute bg-white p-[5px] top-0 hidden group-hover:inline-block z-20 w-[85px] lg:w-[120px]">
                          <p class="font-bold flex b5">
                            {{ monthShortTH[item.month - 1] }}
                            {{ item.year % 100 }}
                          </p>
                          <p class="b5">
                            <span class="b3 font-bold">{{
                              parseInt(item.total).toLocaleString()
                            }}</span>
                            พาดหัวข่าว
                          </p>
                          <div class="b4 flex flex-wrap gap-[5px]">
                            <div
                              v-for="(cate, cateNo) in Object.keys(
                                dataForKW.categories_total
                              )">
                              <div
                                class="flex items-center gap-[2px]"
                                v-if="item[cate] > 0">
                                <div
                                  class="w-[10px] h-[10px] bg-orange"
                                  :class="getCategoryColorClass(cate)"></div>
                                <p>{{ item[cate] }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p
                        class="text-[#939393] -rotate-90 b5 py-[10px]"
                        style="pointer-events: none">
                        {{ monthShortTH[item.month - 1] }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <BarAxis
                :maxOfMonthly="maxOfMonthly"
                :isExplore="true"
                :totalDataEachCategory="totalDataEachCategory"
                :exploreModeSelected="exploreModeSelected"
                :categorySelected="categorySelected" />
            </div>
            <div
              class="b5 text-[#939393] grid grid-cols-2 place-items-center pt-[5px] lg:pt-[30px] lg:mb-[10px] font-bold">
              <p>2022</p>
              <p>2023</p>
            </div>
          </div>
          <div
            class="absolute top-0 right-[50%] w-full h-full border-r-[2px] border-[#C5C4C4]"
            style="pointer-events: none"></div>
        </div>

        <div class="flex flex-col justify-center items-center" ref="exploreRef">
          <div v-if="exploreModeSelected === 'หมวดข่าว'">
            <div class="flex justify-center items-center">
              <button
                @click="handleExploreMounthYear('prev')"
                class="cursor-pointer">
                <img src="/image/trends/PreviousBtn.svg" alt="" />
              </button>
              <p class="b3 font-bold">
                {{ fullMonthAndYear }}
              </p>
              <button
                @click="handleExploreMounthYear('next')"
                class="cursor-pointer">
                <img src="/image/trends/NextBtn.svg" alt="" />
              </button>
            </div>
            <p class="b3 text-center py-[5px]">
              มีข่าว{{ categorySelected }}ทั้งหมด
              <span
                class="font-bold"
                v-if="totalDataEachCategory && totalDataEachCategory.length > 0"
                >{{
                  parseInt(
                    totalDataEachCategory.find((item) =>
                      item.category.includes(categorySelected)
                    ).total
                  ).toLocaleString()
                }}
                พาดหัวข่าว</span
              >
              และมักพบ 10 คำ*เหล่านี้อยู่บ่อยๆ
            </p>
            <div
              class="flex flex-wrap justify-center gap-[5px] text-[#FFF8B5] w-fit mx-auto justify-items-center">
              <div
                v-for="(kw, index) in top10Keywords"
                class="bg-black flex items-center gap-[2px] px-[5px] justify-center text-center w-fit">
                <p class="b3 font-bold">{{ kw.keyword }}</p>
                <p class="b4">({{ kw.frequency }})</p>
              </div>
            </div>
          </div>
          <div v-if="exploreModeSelected === 'คีย์เวิร์ด'">
            <p class="b3 text-center pt-[10px]">
              พบคำว่า
              <span class="font-bold">"{{ inputKeyword }}"</span> ใน
              <span class="font-bold">{{ dataForKW.total }}</span>
              พาดหัวข่าว โดยอยู่ในหมวด
            </p>
            <div
              class="flex flex-wrap items-center justify-center gap-[5px] py-[5px]">
              <div
                v-for="(ct, index) in Object.keys(dataForKW.categories_total)">
                <p :class="getCategoryColorClass(ct)" class="b3 px-2">
                  <span class="font-bold"> {{ ct }}</span>
                  <span class="b4">
                    ({{ dataForKW.categories_total[ct] }})</span
                  >
                </p>
              </div>
            </div>
          </div>
          <p class="b3 py-[5px]">เช่น</p>
          <SampleNews
            v-if="exploreModeSelected === 'หมวดข่าว'"
            :dataSet="filteredSampleHeadlineCategory"
            :sampleIndex="sampleIndex"
            :exploreModeSelected="exploreModeSelected"
            :borderColor="getCategoryBorderColor(categorySelected)"
            :top10Keywords="top10Keywords" />
          <SampleNews
            v-if="exploreModeSelected === 'คีย์เวิร์ด'"
            :dataSet="dataForKW.sample_headlines"
            :sampleIndex="sampleIndex"
            :exploreModeSelected="exploreModeSelected"
            :borderColor="
              getCategoryBorderColor(
                dataForKW.sample_headlines[sampleIndex].category
              )
            "
            :top10Keywords="top10Keywords"
            :inputKeyword="inputKeyword" />
          <button
            class="text-[#FF006B] b4 w-fit mx-auto mt-[20px] border-[#EBE8DE] flex gap-[5px]">
            <img src="/image/Reset.svg" alt="" />
            <p @click="handleNewSample">สุ่มตัวอย่างเพิ่ม</p>
          </button>
          <p class="b5 text-[#717070] text-center pt-[15px]">
            *หมายเหตุ : คำที่มีความหมายเดียวกัน แต่เขียนต่างกันเล็กน้อย เช่น
            “กทม./กรุงเทพฯ”, “โควิด/โควิด-19/Covid-19” จะถือว่าเป็นคำเดียวกัน
            และนับจำนวนข่าวรวมกัน
          </p>
        </div>
      </div>
      <div class="h-[90vh]" v-else>
        <p class="b3 text-center p-[25px] h-3/4">
          ไม่พบพาดหัวข่าวที่มีคีย์เวิร์ดที่คุณค้นหา ลองเปลี่ยนคำใหม่ดู
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

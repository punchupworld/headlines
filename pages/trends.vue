<script setup>
import scrollama from "scrollama"
import { Vue3Lottie } from "vue3-lottie"
import lottie_1 from "public/lottie/lottie-1.json"

const headlineRef = ref(null)
const currentIndex = ref(0)
let headlineShow = []
const currentText = ref(headlineShow[currentIndex.value])
const exploreModeSelected = ref("หมวดข่าว")
const isShowRefPopup = ref(false)
const categoryIndex = ref(0)
const data = ref()
const exploreData = ref()
const categorySelected = ref("การเมือง")
// const max = ref(0)
// const min = ref(0)
const maxStory = ref(0)
const maxStoryIndex = ref(0)
const minStory = ref(0)
const minStoryIndex = ref(0)
const inputKeyword = ref("แซ่บ")
const showSuggestions = ref(false)
const isInputFocused = ref(false)
const keywords = ref()
const sampleHeadlineCategory = ref()
const filteredSampleHeadlineCategory = ref()
const exploreCategoryHeadlineData = ref()
let totalDataEachMonth = []
let totalDataEachCategory = []
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
  { name: "เศรษฐกิจ", color: "bg-orange" },
  { name: "ต่างประเทศ", color: "bg-rose" },
  { name: "บันเทิง", color: "bg-pink" },
  { name: "อาชญากรรม", color: "bg-brown" },
  { name: "กีฬา", color: "bg-purple" },
  { name: "วิทยาศาสตร์เทคโนโลยี", color: "bg-blue" },
  { name: "สิ่งแวดล้อม", color: "bg-green" },
]

const fetchExploreCategoryHeadline = async () => {
  const response = await fetch("/data/sample_news_headlines.json")
  const data = await response.json()
  exploreCategoryHeadlineData.value = data
  console.log(exploreCategoryHeadlineData.value["การเมือง"]["monthly"])

  for (let year = 2022; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      let totalForMonth = 0

      Object.keys(data).forEach((categoryName) => {
        const monthlyData = data[categoryName].monthly

        const totalForCategoryMonth =
          monthlyData.find((item) => item.year === year && item.month === month)
            ?.total || 0

        totalForMonth += totalForCategoryMonth
      })

      totalDataEachMonth.push({ year, month, total: totalForMonth })
    }
  }

  maxStory.value = Math.max(...totalDataEachMonth.map((d) => d.total))
  console.log(maxStory.value)

  const categorySums = {}
  let overallTotal = 0

  for (let year = 2022; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      Object.keys(data).forEach((categoryName) => {
        const monthlyData = data[categoryName].monthly
        const totalForCategoryMonth =
          monthlyData.find((item) => item.year === year && item.month === month)
            ?.total || 0

        categorySums[categoryName] =
          (categorySums[categoryName] || 0) + totalForCategoryMonth
        overallTotal += totalForCategoryMonth
      })
    }
  }

  Object.keys(categorySums).forEach((categoryName) => {
    totalDataEachCategory.push({
      category: categoryName,
      total: categorySums[categoryName],
    })
  })

  totalDataEachCategory.push({ category: "Total", total: overallTotal })

  console.log("total")
  console.log(totalDataEachCategory)
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
  const response = await fetch("/data/HeadlinesSample.json")
  const data = await response.json()
  sampleHeadlineCategory.value = data
  await filterSampleHeadlineCategory(categorySelected.value)
  headlineShow = sampleHeadlineCategory.value.map((item) => item.headline)
  headlineShow = headlineShow.slice(0, 10)
  // console.log(headlineShow)
}

const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value
}

const formatMonth = (inputDate) => {
  // const months = [
  //   "ม.ค.",
  //   "ก.พ.",
  //   "มี.ค.",
  //   "เม.ย.",
  //   "พ.ค.",
  //   "มิ.ย.",
  //   "ก.ค.",
  //   "ส.ค.",
  //   "ก.ย.",
  //   "ต.ค.",
  //   "พ.ย.",
  //   "ธ.ค.",
  // ]
  const dateParts = inputDate.split("-")
  const day = parseInt(dateParts[2])
  const month = parseInt(dateParts[1])
  const year = parseInt(dateParts[0])
  return `${day} ${monthShortTH[month - 1]} ${year}`
}

const setData = () => {
  data.value = exploreData.value.slice(1, -1)
  // max.value = Math.max(...data.value.map((d) => d[categorySelected.value]))
  // min.value = Math.min(...data.value.map((d) => d[categorySelected.value]))
  // data.value.forEach((entry, index) => {
  //   const totalValue = parseInt(entry.Total.trim(), 10)

  //   if (!isNaN(totalValue) && totalValue > maxStory.value) {
  //     maxStory.value = totalValue
  //     maxStoryIndex.value = index
  //   }
  // })
  minStory.value = Math.min(...data.value.map((d) => d.Total))
  minStoryIndex.value = data.value.findIndex(
    (d) => parseInt(d.Total.trim(), 10) === minStory.value
  )
}
const fetchAggregateKW = async () => {
  const response = await fetch("/data/aggregate_keywords.json")
  const data = await response.json()
  keywords.value = await data
  suggestionsKW.value = Object.keys(keywords.value)
  // const name = keywords.value.map((item)=>item.name)
  // suggestionsKW.value = name
  // console.log(suggestionsKW.value)
  // console.log(suggestions.value)
}
const dataForKW = ref()

const maxOfMonthly = computed(() => {
  return Math.max(...dataForKW.value.montly.map((d) => d.total))
})
const findMaxOfMonthly = () => {
  let dataValues = dataForKW.value.montly
  // console.log(dataValues)
  let maxValue = Math.max(...dataValues.map((d) => d.total))
  maxOfMonthly.value = maxValue
  // console.log(maxOfMonthly.value)
}
const selectExploreMode = async (mode) => {
  exploreModeSelected.value = mode
  sampleIndex.value = 0
  if (exploreModeSelected.value === "คีย์เวิร์ด") {
    dataForKW.value = await keywords.value[inputKeyword.value]
    console.log(dataForKW.value?.length)
    console.log(dataForKW.value)
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
  const scalePercent = (total * 100) / max
  // console.log("max", maxHeigh)
  // console.log("scalePercent", scalePercent)
  const scaleAll = (scalePercent * maxHeigh) / 100
  // console.log("scaleAll", scaleAll)
  const scalePerCategory = (count * scaleAll) / total
  // console.log("scalePerCategory", scalePerCategory)
  return Math.ceil(scalePerCategory)
}
const calculateHeightPerCategory2 = (total, count, maxHeigh, max) => {
  const totalHeight = (total * maxHeigh) / max
  const eachHeight = (count * totalHeight) / total
  // console.log('max',max)
  // console.log('maxH',maxHeigh)
  // console.log('totalHeight',totalHeight)
  // console.log('eachHeight',eachHeight)
  return Math.ceil(eachHeight)
}
const calculateHeight = (count, maxHeigh, category) => {
  if (category === "Total") {
    let maxValueOfAll = Math.max(...totalDataEachMonth.map((d) => d.total))
    let scalePercent = (count * 100) / maxValueOfAll
    let scale = Math.ceil((scalePercent * maxHeigh) / 100)
    return scale
  }
  let maxValue = findMaxEachCategory(category)
  let scalePercent = (count * 100) / maxValue
  let scale = Math.ceil((scalePercent * maxHeigh) / 100)
  return scale
}

const findMaxEachCategory = (category) => {
  const dataValues = data.value
  let maxValue = Math.max(...dataValues.map((d) => d[category]))
  return maxValue
}

const fetchData = async () => {
  try {
    const response = await fetch("/data/ExploreMonth.csv")
    const csvText = await response.text()
    const rows = csvText.split("\n").map((line) => {
      const [
        Year,
        Month,
        MonthName,
        การเมือง,
        กีฬา,
        ต่างประเทศ,
        บันเทิง,
        วิทยาศาสตร์เทคโนโลยี,
        สังคมไทย,
        อาชญากรรม,
        เศรษฐกิจ,
        สิ่งแวดล้อม,
        Total,
      ] = line.split(",")
      return {
        Year,
        Month,
        MonthName,
        การเมือง,
        กีฬา,
        ต่างประเทศ,
        บันเทิง,
        วิทยาศาสตร์เทคโนโลยี,
        สังคมไทย,
        อาชญากรรม,
        เศรษฐกิจ,
        สิ่งแวดล้อม,
        Total,
      }
    })
    exploreData.value = rows
    // console.log(exploreData.value)
    setData()
  } catch (error) {
    console.error("Error fetching CSV data:", error)
  }
}

const handleCurrentIndex = (index) => {
  categoryIndex.value = index
  filterCategoryKeyword(categorySelected.value)
  filterSampleHeadlineCategory(categorySelected.value)
  scrollToSection()
}

const exploreRef = ref(null)
const scrollToSection = () => {
  exploreRef.value.scrollIntoView({ behavior: "smooth" })
}

const top10KeywordsData = ref()
const fetchExploreData10Keyword = async () => {
  const response = await fetch("/data/Top10Keyword.json")
  const data = await response.json()
  top10KeywordsData.value = data
}
const top10Keywords = ref()
const filterCategoryKeyword = async (category) => {
  // const month = [
  //   "jan",
  //   "feb",
  //   "mar",
  //   "apr",
  //   "may",
  //   "jun",
  //   "jul",
  //   "aug",
  //   "sep",
  //   "oct",
  //   "nov",
  //   "dec",
  // ]
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
    }
    else if(categoryIndex.value === 0){
      categoryIndex.value = 23
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    }
  } else if (action === "next") {
    if (categoryIndex.value !== data.value.length - 1) {
      categoryIndex.value += 1
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    }else if(categoryIndex.value === 23){
      categoryIndex.value = 0
      filterCategoryKeyword(categorySelected.value)
      filterSampleHeadlineCategory(categorySelected.value)
    }
  }
}
const selectCategory = (category) => {
  categorySelected.value = category
  // console.log(categorySelected.value)
  // console.log(exploreCategoryHeadlineData.value[Object.keys(exploreCategoryHeadlineData.value).find((category) => category.includes(categorySelected.value))]['monthly'])
  // max.value = Math.max(...data.value.map((d) => d[categorySelected.value]))
  // min.value = Math.min(...data.value.map((d) => d[categorySelected.value]))
  filterCategoryKeyword(category)
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

const scroller = scrollama()
const height = ref(0)

const findWidthandHeight = (section) => {
  const sectionFocus = document.getElementById(section)
  const width = sectionFocus.offsetWidth
  height.value = (3 / 4) * width
  return height.value
}
const suggestionsKW = ref([])

const filteredSuggestions = computed(() => {
  const filtered = suggestionsKW.value.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputKeyword.value.toLowerCase())
  )
  return filtered.slice(0, 6)
})
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
  // handleInputFocus()
}

const selectSuggestion = (selectedValue) => {
  // console.log(selectedValue)
  inputKeyword.value = selectedValue
  // showSuggestions.value = false
}
const searchKeyword = () => {
  dataForKW.value = keywords.value[inputKeyword.value]
  showSuggestions.value = false
  handleInputFocus()
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

const highlightKeyword = (headline, keyword) => {
  if (exploreModeSelected.value === "หมวดข่าว") {
    // console.log(top10Keywords.value)
    const keywordsRegex = new RegExp(
      `(${top10Keywords.value
        .map((k) => k.keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"))
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

watchEffect(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % headlineShow.length
    currentText.value = headlineShow[currentIndex.value]
  }, 1000)
})
onMounted(async () => {
  await fetchData()
  await fetchExploreData10Keyword()
  await filterCategoryKeyword(categorySelected.value)
  findWidthandHeight("section2")
  await fetchAggregateKW()
  await fetchSampleHeadlineCategory()
  await fetchExploreCategoryHeadline()

  const handleSectionOpacity = (currentSection, direction) => {
    const sections = Array.from({ length: 12 }, (_, index) =>
      document.getElementById(`section${index + 1}`)
    )

    for (let i = 0; i < sections.length; i++) {
      if (i === currentSection - 1) {
        if (direction === "down") {
          sections[i].style.opacity = 1
          sections[i - 1].style.opacity = 0
        } else if (direction === "up") {
          sections[i].style.opacity = 1
          sections[i + 1].style.opacity = 0
        } else {
          sections[i].style.opacity = 1
          sections[i + 1].style.opacity = 0
        }
      }
    }
  }
  const handleStepEnter = (response) => {
    const currentSection = parseInt(response.element.id.replace("card", ""), 10)
    handleSectionOpacity(currentSection, response.direction)
  }
  const init = () => {
    scroller
      .setup({
        step: "#card1, #card2, #card3, #card4, #card5, #card6 ,#card7, #card8, #card9, #card10, #card11, #card12",
        offset: 0.9,
        debug: false,
      })
      .onStepEnter(handleStepEnter)
    window.addEventListener("resize", scroller.resize)
  }
  init()
})
</script>

<template>
  <div
    class="bg-[#EBE8DE] max-w-screen-sm md:max-w-full flex flex-col justify-center"
  >
    <div
      id="refPopup"
      class="max-w-screen-sm md:max-w-full fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-20 p-3"
      v-show="isShowRefPopup"
    >
      <div
        id="popUpScroll"
        class="relative bg-white w-[90vw] max-w-[900px] h-[80vh]"
      >
        <img
          @click="showRefPopup"
          src="/image/CanclePink.svg"
          alt=""
          class="absolute -top-2 -right-2"
        />
        <div id="ref" class="p-[20px] overflow-y-auto h-full">
          <h1 class="b1 font-bold" ref="reference">
            ที่มาและข้อจำกัดของข้อมูล
          </h1>
          <div class="pt-[10px]">
            <p class="b2 font-bold text-left">ที่มา</p>
            <ul class="list-disc">
              <li>
                <p class="b3 font-bold">กระบวนการหาคีย์เวิร์ดในพาดหัวข่าว</p>
                <p class="b3">
                  ทีมงานใช้เครื่องมือ
                  <span class="underline">python library newmm-tokenizer</span>
                  เพื่อตัดคำในพาดหัวข่าว และเครื่องมือ
                  <span class="underline">LCS</span> (Longest Common Substring)
                  เพื่อหาคีย์เวิร์ดที่มีความหมาย โดยการเทียบพาดหัวข่าว 2
                  ข่าวและหาคำเหมือนกันที่ยาวที่สุด
                  เมื่อได้ข้อมูลคีย์เวิร์ดครบแล้ว
                  คีย์เวิร์ดที่หาได้จะถูกเรียบเรียงและคัดเลือกอีกครั้ง
                  จากนั้นจะถูกหาความถี่ของจำนวนคำที่ปรากฏในข่าวด้วย Pandas
                </p>
              </li>
            </ul>
          </div>

          <div class="py-[10px] border-b border-[#C5C4C4]">
            <p class="b2 font-bold text-left">ข้อจำกัด</p>
            <ul class="b3 list-disc">
              <li>
                คีย์เวิร์ดในพาดหัวข่าวถูกคัดกรองโดยวิจารณญาณของผู้จัดทำ
                ผ่านการคัดคำที่ไม่มีความหมายหรือไม่สำคัญทิ้งไป เช่น
                คำเชื่อมประโยค คำกริยา หรือคำทั่วไปที่ขาดบริบท เช่น ที่ วิ่ง แดง
                นาย และสัญลักษณ์ เช่น - . ? เป็นต้น
              </li>
            </ul>
          </div>

          <p class="b3 pt-[10px]">
            หากมีข้อสงสัยหรือคำแนะนำเพิ่มเติมใดๆ เกี่ยวกับงานนี้
            ทักมาหาพวกเราได้ที่
            <a href="" class="text-[#FF006B] font-bold">m.me/punchupworld</a>
          </p>
        </div>
      </div>
    </div>
    <div
      id="part1"
      class="pb-[40px] px-[16px] max-w-[850px] md:max-w-full md:mx-[15vw]"
    >
      <div
        id="cover"
        class="space-y-[10px] text-center mb-[20px] h-screen flex flex-col justify-center"
      >
        <h1 class="t2 pb-5">..‘พาดหัวข่าว’ เล่าเรื่อง..</h1>
        <p class="h4 font-bold">คนไทยได้เจอข่าวอะไรมากที่สุด ?</p>
        <p class="b2">
          สำรวจเทรนด์ข่าวรายเดือน พร้อมคีย์เวิร์ดที่ปรากฏบ่อยในช่วง 2 ปี
        </p>
        <p
          @click="showRefPopup"
          class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto mt-[20px] border-[#EBE8DE] cursor-pointer"
        >
          อ่านที่มาและข้อจำกัดของข้อมูล
        </p>
        <div class="">
          <Vue3Lottie
            :animationData="lottie_1"
            class="max-w-[450px] w-[90vw]"
          />
        </div>

        <!-- <div class="flex gap-[19px] justify-center pl-[43px] pr-[88px]">
          <img src="/image/trends/Watch.svg" alt="" class="w-[100px]" />
          <img src="/image/trends/Color.svg" alt="" class="w-[38px]" />
        </div> -->
      </div>
      <div id="section" class="h-screen sticky top-0 overflow-hidden">
        <div
          class="flex flex-col items-center lg:items-start h-screen justify-center"
        >
          <div
            id="section1"
            style="opacity: 1; transition: opacity 0.5s ease"
            class="absolute flex justify-center items-center z-0"
          >
            <div
              ref="headlineRef"
              class="relative bg-black p-[10px] w-[90vw] max-w-[600px] lg:pr-[60px] lg:pl-[20px] lg:h-[550px] flex items-center"
            >
              <p class="cream t2">
                {{ currentText }}
              </p>
            </div>
          </div>
          <div
            id="section2"
            style="transition: opacity 0.5s ease"
            class="opacity-0 absolute pointer-events-none flex flex-col justify-center items-center lg:justify-start lg:items-start"
          >
            <p
              class="text-[#717070] b4 font-bold text-center pb-[10px] flex items-center justify-center mx-auto"
            >
              จำนวนข่าวรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center w-[90vw] lg:max-w-[600px]"
              >
                <div
                  v-for="(item, index) in totalDataEachMonth"
                  class="w-full cursor-pointer relative flex flex-col gap-[10px] justify-center"
                  :style="{
                    width: `${90 / data.length}%`,
                  }"
                >
                  <div
                    :class="
                      index === 8 || index === 23 ? 'bg-black' : 'bg-black/50'
                    "
                    :style="{
                      height: `${calculateHeight(
                        item.total,
                        findWidthandHeight('section2'),
                        'Total'
                      )}px`,
                    }"
                  ></div>
                  <p
                    class="text-[#939393] -rotate-90 b6"
                    style="pointer-events: none"
                  >
                    {{ monthShortTH[item.month - 1] }}
                  </p>
                </div>
                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div class="space-y-2">
                      <p class="b5 border-b border-black border-dotted">8000</p>
                      <div class="border-b border-[#FF006B] relative">
                        <p
                          class="absolute -top-1.5 b5 text-[#FF006B] font-bold stoke"
                        >
                          7816
                        </p>
                      </div>
                    </div>
                    <p class="b5 border-b border-black border-dotted">6000</p>
                    <p class="b5 border-b border-black border-dotted">4000</p>
                    <p class="b5 border-b border-black border-dotted">2000</p>

                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#C5C4C4]"
                style="pointer-events: none"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center py-[10px] lg:max-w-[600px] mx-auto"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section3"
            class="opacity-0 absolute pointer-events-none flex flex-col justify-center items-center"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวรายเดือน แบ่งตามหมวด
            </p>
            <div class="relative">
              <div class="relative flex items-end justify-center">
                <div
                  class="flex items-end gap-[1px] justify-center lg:max-w-[600px] w-[90vw]"
                >
                  <div
                    v-for="(no, index) in 24"
                    :style="{ width: `${90 / 24}%` }"
                    class="flex flex-col justify-center gap-[10px]"
                  >
                    <div>
                      <div
                        v-for="(ct, index) in Object.keys(
                          exploreCategoryHeadlineData || 0
                        )"
                        class="flex cursor-pointer"
                      >
                        <div
                          class="w-full"
                          :class="getCategoryColorClass(ct)"
                          :style="{
                            height: `${calculateHeightPerCategory2(
                              111,
                              exploreCategoryHeadlineData[ct]['monthly'][no - 1]
                                ?.total,
                              findWidthandHeight('section3'),
                              maxStory
                            )}px`,
                          }"
                        ></div>
                      </div>
                    </div>

                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{
                        index >= 12
                          ? monthShortTH[index - 12]
                          : monthShortTH[index]
                      }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">8000</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">6000</p>
                    <p class="b5 border-b border-black border-dotted">4000</p>
                    <p class="b5 border-b border-black border-dotted">2000</p>

                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#C5C4C4]"
                style="pointer-events: none"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center py-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section4"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวการเมืองรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div
                  class="flex items-end gap-[1px] w-[90vw] justify-center pointer-events-none"
                >
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['การเมือง']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'การเมือง'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                    @click="scrollToSection()"
                  >
                    <div
                      @click="handleCurrentIndex(index)"
                      :class="
                        index === 4 || index === 16
                          ? 'bg-[#FF3D00]'
                          : 'bg-[#FF3D00]/50'
                      "
                      class="w-full cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section4'),
                          'การเมือง'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">8000</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">6000</p>
                    <p class="b5 border-b border-black border-dotted">4000</p>
                    <p class="b5 border-b border-black border-dotted">2000</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
                style="pointer-events: none"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section5"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวสังคมไทยรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['สังคมไทย']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'สังคมไทย'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full bg-lightblue cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section5'),
                          'สังคมไทย'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section6"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวเศรษฐกิจ/การเงินรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['เศรษฐกิจ']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'เศรษฐกิจ'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full bg-orange cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section6'),
                          'เศรษฐกิจ'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section7"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวต่างประเทศรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['ต่างประเทศ']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'ต่างประเทศ'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full cursor-pointer relative"
                      :class="
                        index === 2 ||
                        index === 6 ||
                        index === 8 ||
                        index === 10 ||
                        index === 14 ||
                        index === 21
                          ? 'bg-rose'
                          : 'bg-rose opacity-50'
                      "
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section7'),
                          'ต่างประเทศ'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section8"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวบันเทิงรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['บันเทิง']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'บันเทิง'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full bg-pink cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section8'),
                          'บันเทิง'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section9"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวอาชญากรรมรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['อาชญากรรม']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'อาชญากรรม'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full cursor-pointer relative"
                      :class="
                        index === 6 || index === 20
                          ? 'bg-brown'
                          : 'bg-brown opacity-50'
                      "
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section9'),
                          'อาชญากรรม'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section10"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวกีฬารายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['กีฬา']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData['กีฬา'][
                      'monthly'
                    ]"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full cursor-pointer relative"
                      :class="
                        index === 4 || index === 10 || index === 20
                          ? 'bg-purple'
                          : 'bg-purple opacity-50'
                      "
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section10'),
                          'กีฬา'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>
                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section11"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าววิทยาศาสตร์/เทคโนโลยีรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['วิทยาศาสตร์เทคโนโลยี']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'วิทยาศาสตร์เทคโนโลยี'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full bg-blue cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section11'),
                          'วิทยาศาสตร์เทคโนโลยี'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="section12"
            class="opacity-0 absolute pointer-events-none"
            style="transition: opacity 0.5s ease"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวสิ่งแวดล้อมรายเดือน
            </p>
            <div class="relative">
              <div
                class="relative flex items-end gap-[1px] justify-center lg:max-w-[600px]"
              >
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-if="
                      exploreCategoryHeadlineData &&
                      exploreCategoryHeadlineData['สิ่งแวดล้อม']
                    "
                    v-for="(item, index) in exploreCategoryHeadlineData[
                      'สิ่งแวดล้อม'
                    ]['monthly']"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / 24}%`,
                    }"
                  >
                    <div
                      class="w-full cursor-pointer relative"
                      :class="index === 8 ? 'bg-green' : 'bg-green opacity-50'"
                      :style="{
                        height: `${calculateHeight(
                          item.total,
                          findWidthandHeight('section12'),
                          'สิ่งแวดล้อม'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>

                <div
                  class="z-0 absolute bottom-0 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full p-[5px]">
                    <div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                    </div>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>
                    <p class="b5 border-b border-black border-dotted">xxx</p>

                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
              <div
                class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
              <div
                style="pointer-events: none"
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
              ></div>
            </div>

            <div
              class="flex flex-wrap justify-center pt-[10px] lg:max-w-[600px]"
            >
              <div v-for="(item, index) in category">
                <div class="flex items-center gap-[5px] pr-[10px]">
                  <div :class="item.color" class="w-[10px] h-[10px]"></div>
                  <p class="b5">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="card" class="relative z-10 flex flex-col">
        <div
          id="card1"
          class="flex items-center justify-center lg:items-end lg:justify-end w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] lg:w-[350px] w-full text-center mx-[16px]"
          >
            <p class="b3">
              ในช่วง 2 ปีที่ผ่านมา<br />
              สื่อออนไลน์กระแสหลัก*ผลิตข่าวให้คนไทยเห็นทั้งหมด
            </p>
            <p class="b1 font-bold">187,582 พาดหัวข่าว</p>
            <p class="b5 text-[#717070]">
              *ประกอบด้วย 5 สำนักข่าว คือ ไทยรัฐ ออนไลน์, The Standard, Thai
              PBS, Voice TV, WorkpointTODAY
            </p>
          </div>
        </div>
        <div
          id="card2"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="b3 bg-white p-[20px] lg:w-[350px] w-full text-center mx-[16px]"
          >
            <p class=" ">
              <span class="text-[#FF006B] font-bold">
                โดยเฉลี่ยแล้ว <br />
                เรามีข่าวให้อ่านกันอย่างน้อยเดือนละ 7,816 พาดหัวข่าว</span
              >
              หรือตกวันละ 261 พาดหัวข่าว
            </p>
            <p class="font-bold">เดือนที่มีข่าวมากที่สุดคือ ก.ย. 2022</p>
            <p>(8,781 พาดหัวข่าว)</p>
            <p>
              <span class="font-bold"
                >ส่วนเดือนที่มีข่าวน้อยที่สุดคือ ธ.ค. 2023</span
              >
              (6,469 พาดหัวข่าว)
            </p>
            <p></p>
          </div>
        </div>
        <div
          id="card3"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <p class="b3 leading-[1000px]">
              เมื่อเจาะดูเป็นรายหมวดพบว่า คนไทยมีโอกาสเห็นพาดหัวข่าว
              <span class="bg-vermillion font-bold my-2">การเมือง</span> และ
              <span class="bg-lightblue font-bold">สังคมไทย</span> มากที่สุด
              ในขณะที่
              <span class="bg-green font-bold">สิ่งแวดล้อม</span>
              เป็นข่าวที่ถูกนำเสนอน้อยที่สุด
            </p>
            <p class="b4 text-[#939393]">สัดส่วนข่าวแต่ละหมวด รวม 2 ปี</p>
            <div class="flex h-[60px] my-[10px] w-full">
              <div
                class="stoke bg-vermillion w-[28%] flex items-center justify-center font-bold"
              >
                28.2%
              </div>
              <div
                class="stoke bg-lightblue w-[26%] flex items-center justify-center font-bold"
              >
                26%
              </div>
              <div class="bg-orange opacity-20 w-[13%]"></div>
              <div class="bg-rose opacity-20 w-1/12"></div>
              <div class="bg-pink opacity-20 w-1/12"></div>
              <div class="bg-brown opacity-20 w-1/12"></div>
              <div class="bg-purple opacity-20 w-[4%]"></div>
              <div class="bg-blue opacity-20 w-[3%]"></div>
              <div
                class="stoke bg-green w-[2%] flex items-center justify-center font-bold"
              >
                1.7%
              </div>
            </div>
            <p class="b3 font-bold">
              ไปดูกันว่าข่าวในแต่ละหมวดมีประเด็นอะไรที่น่าสนใจบ้าง..
            </p>
          </div>
        </div>
        <div
          id="card4"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div>
                <p class="b1 font-bold">ข่าวการเมือง</p>
                <p class="b4 text-[#717070]">
                  รวม 52,971 ข่าว (28.2% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3">
                <p>
                  เป็นที่น่าสังเกตว่าจำนวนข่าวในหมวดนี้จะแปรผันตรงกับวาระทางการเมืองที่ร้อนแรง
                  โดยเดือนที่มีข่าวสูงสุดของปี 2022 และ 2023
                  ล้วนตรงกับวาระสำคัญทางการเมือง ได้แก่
                </p>
              </div>
              <div>
                <ul class="list-disc">
                  <li>
                    <span class="font-bold">พ.ค. 2022 </span>
                    <span class="text-[#717070]"> (2,521 หัวข่าว)</span>
                    <br />
                    <p class="text-[#FF3D00]">#เลือกตั้งผู้ว่าฯกทม.</p>
                  </li>
                  <li>
                    <span class="font-bold">พ.ค. 2023 </span>
                    <span class="text-[#717070]"> (3,134 ข่าว)</span>
                    <br />
                    <p class="text-[#FF3D00]">#การเลือกตั้ง2566</p>
                  </li>
                </ul>
              </div>
              <div class="b3">
                <p class="font-bold">5 คีย์เวิร์ดพบบ่อย</p>
                <p>ในพาดหัวข่าวการเมือง ได้แก่</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[4px] mt-[10px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">นายกฯ</span>(7,884)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">เลือกตั้ง2566</span>(6,521)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ประยุทธ์</span>(3,539)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">รัฐบาล</span>(4,681)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">เพื่อไทย</span>(4,617)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card5"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวสังคมไทย</p>
                <p class="b4 text-[#717070]">
                  รวม 48,745 ข่าว (26% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 py-[10px] border-b border-[#C5C4C4]">
                <p>
                  แม้จำนวนพาดหัวข่าวสังคมไทยจะมีแนวโน้มลดลงอย่างต่อเนื่องตั้งแต่
                  ก.ย. 2022 แต่ในภาพรวม 2 ปี ยังถือว่ามีสัดส่วนมากเป็นอันดับ 2
                  รองจากข่าวการเมือง
                  ด้วยประเด็นข่าวที่กว้างและครอบคลุมหลายเรื่องในสังคม
                  หลายคำที่เจอในพาดหัวข่าวบ่อยๆ
                  จึงเป็นคำที่สามารถพบในข่าวหมวดอื่นๆ ได้เช่นกัน
                  จำแนกเป็นประเภทต่างๆ ได้ ดังนี้
                </p>
              </div>
              <div>
                <p class="b3 font-bold pt-[10px] pb-[5px]">เหตุการณ์สำคัญ</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">สงกรานต์</span>(478)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> เรือหลวงสุโขทัย</span>(150)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> ลอยกระทง</span>(148)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> APEC</span>(105)
                  </div>

                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">กราดยิงหนองบัวลำภู</span>(59)
                  </div>
                </div>
              </div>
              <div class="py-[10px] border-b border-[#C5C4C4]">
                <p class="b3 font-bold pb-[5px]">ภัยธรรมชาติ</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> น้ำท่วม</span>(1,153)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ฝุ่น PM2.5</span>(505)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ไต้ฝุ่นโนรู</span>(108)
                  </div>
                </div>
              </div>
              <div class="border-b border-[#C5C4C4] py-[10px]">
                <p class="b3 font-bold">โรค</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> โควิด-19</span>(2,703)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">โอมิครอน</span>(301)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ฝีดาษลิง</span>(254)
                  </div>
                </div>
              </div>
              <div class="border-b border-[#C5C4C4] py-[10px]">
                <p class="b3 font-bold pb-[5px ]">บุคคล</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ชัชชาติ</span>(912)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> พิธา</span>(177)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> ทักษิณ</span>(146)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> แตงโมนิดา</span>(104)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> กำนันนก</span>(54)
                  </div>
                </div>
              </div>
              <div class="pt-[10px]">
                <p class="b3 py-[5px]">
                  นอกจากนี้ยังมีคำที่บ่งชี้เพศสภาพซึ่งปรากฏในพาดหัวข่าวอยู่บ่อยๆ
                  อย่าง
                </p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">สาว</span>(2,283)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">หนุ่ม</span>(1,736)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card6"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวเศรษฐกิจ/การเงิน</p>
                <p class="b4 text-[#717070]">
                  รวม 24,586 ข่าว (13.1% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 pt-[10px]">
                <p>
                  ในขณะที่ข่าวหมวดอื่นมีการเปลี่ยนแปลงสัดส่วนของจำนวนข่าวระหว่าง
                  2 ปี บ้างลดลง บ้างเพิ่มขึ้น แต่ข่าวเศรษฐกิจ/การเงิน
                  <span class="font-bold"
                    >เป็นหมวดเดียวที่มีสัดส่วนข่าวเท่าเดิมเป๊ะ</span
                  >
                </p>
              </div>
              <div class="py-[10px] border-b border-[#C5C4C4]">
                <p class="b4 text-[#717070]">
                  สัดส่วนข่าวแต่ละหมวดต่อจำนวนข่าวทั้งหมดในแต่ละปี
                </p>
                <img src="/image/trends/economyChart.svg" alt="" />
              </div>
              <div class="b3 py-[10px]">
                <p class="font-bold">Top</p>
                <p>
                  <span class="font-bold">คีย์เวิร์ดพบบ่อย</span>
                  ในแต่ละเดือนของข่าวหมวดนี้ไม่ค่อยแตกต่างกันมากนัก
                  โดยจะวนเวียนอยู่กับประเด็นเหล่านี้
                </p>
              </div>
              <div class="">
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">หุ้น</span>(4,024)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> จีน</span>(1,555)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ดอกเบี้ย</span>(1,296)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">กำไร</span>(1,067)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">สหรัฐ</span>(976)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card7"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวต่างประเทศ</p>
                <p class="b4 text-[#717070]">
                  รวม 20,236 ข่าว (10.8% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 pt-[10px]">
                <p>
                  เทรนด์ข่าวต่างประเทศมี
                  <span class="font-bold">6 ช่วงเวลา</span>
                  ที่จำนวนข่าวสูงกว่าเดือนอื่นๆ
                  เมื่อส่องดูคีย์เวิร์ดในพาดหัวข่าว 6 เดือนนี้
                  พบว่ามีเหตุการณ์ระดับโลก หรือบุคคลสำคัญของชาติอื่นๆ
                  มาเกี่ยวข้อง
                </p>
              </div>
              <div>
                <ul class="list-disc">
                  <li>
                    <span class="font-bold">มี.ค. 2022</span>
                    <span class="text-[#717070]"> (1,017 ข่าว) </span>
                    <br />
                    <p class="text-[#BD4553]">#สงครามยูเครนรัสเซีย</p>
                  </li>
                  <li>
                    <span class="font-bold">ก.ค. 2022</span>
                    <span class="text-[#717070]"> (933 ข่าว)</span>
                    <br />
                    <p class="text-[#BD4553]">#ลอบสังหารชินโซ อาเบะ</p>
                  </li>
                  <li>
                    <span class="font-bold">ก.ย. 2022</span>
                    <span class="text-[#717070]"> (1,021 ข่าว)</span> มี
                    <br />
                    <p class="text-[#BD4553]">#ควีนเอลิซาเบธที่ 2 สวรรคต</p>
                  </li>
                  <li>
                    <span class="font-bold">พ.ย. 2022</span>
                    <span class="text-[#717070]"> (972 ข่าว)</span> มี
                    <br />
                    <p class="text-[#BD4553]">#ประท้วงมาตรการโควิดในจีน,</p>
                    <p class="text-[#BD4553]">#เลือกตั้งกลางเทอมที่สหรัฐฯ</p>
                  </li>
                  <li>
                    <span class="font-bold">มี.ค. 2023</span>
                    <span class="text-[#717070]"> (954 ข่าว)</span> มี
                    <br />
                    <p class="text-[#BD4553]">
                      #การเมืองระหว่างประเทศสหรัฐฯ จีน และรัสเซีย
                    </p>
                  </li>
                  <li>
                    <span class="font-bold">ต.ค. 2023</span>
                    <span class="text-[#717070]"> (929 ข่าว)</span> มี
                    <br />
                    <p class="text-[#BD4553]">#สงครามอิสราเอล-ฮามาส</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card8"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวบันเทิง</p>
                <p class="b4 text-[#717070]">
                  รวม 14,253 ข่าว (7.6% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 py-[10px] space-y-[10px]">
                <p>
                  คนไทยให้ความสนใจต่อวงการบันเทิงไทยน้อยลงหรือเปล่านะ ?
                  เพราะดูเหมือนว่าจำนวนข่าวบันเทิงจะ
                  <span class="font-bold"
                    >ลดลงเกือบครึ่งหนึ่งตั้งแต่เดือน เม.ย. 2023 เป็นต้นมา</span
                  >
                </p>
                <p>
                  แต่แล้วไงใครแคร์
                  เช็กกันสักนิดว่าสำนักข่าวไทยเขียนข่าวอะไรในหมวดข่าวบันเทิง
                </p>
                <p>
                  แม้คีย์เวิร์ดที่โผล่มาให้เห็นบ่อยๆจะเป็นชื่อคนในวงการ เช่น
                </p>
              </div>
              <div>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">แตงโม-นิดา</span>(199)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">อิงฟ้า</span>(180)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ดิว-อริสรา</span>(97)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">แอนโทเนีย โพซิ้ว</span>(35)
                  </div>
                </div>
              </div>
              <div class="pt-[10px]">
                <p class="b3">
                  แต่คำกริยาและคำคุณศัพท์ในพาดหัวข่าวนี่แหละ
                  บอกสถานะโดยรวมของคนวงการนี้ หรือคนบันเทิงจะชอบ
                </p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px] py-[10px]"
                >
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">รัก</span>(1,347)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">โพสต์</span>(978)
                  </div>

                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">แซ่บ</span>(646)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">โชว์</span>(517)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">สวย</span>(512)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">อวด</span>(440)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">เลิก</span>(437)
                  </div>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ดราม่า</span>(423)
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <p class="b3 pb-[10px]">หรือแม้แต่</p>
                  <div
                    class="b4 bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">ติดโควิด</span>(148)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card9"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวอาชญากรรม</p>
                <p class="b4 text-[#717070]">
                  รวม 13,651 ข่าว (7.3% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 py-[10px] space-y-[10px]">
                <p>
                  เมื่อลองเปรียบเทียบ Top 10
                  คีย์เวิร์ดพบบ่อยในพาดหัวข่าวอาชญากรรมของเดือนที่มีจำนวนข่าวอาชญากรรมมากที่สุดกับน้อยที่สุด
                  จะพบประเด็นที่มีร่วมกัน คือ
                </p>
              </div>
              <div class="grid grid-cols-2 gap-[10px]">
                <div class="b4 flex flex-col justify-end items-end gap-[5px]">
                  <div>
                    <p class="b3 font-bold">ก.ย. 2023</p>
                    <p class="b4 text-end">(712 ข่าว)</p>
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ตำรวจ (217)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    กำนันนก (145)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    คดี (110)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    บิ๊กโจ๊ก (98)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ยิง (93)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    จับ (89)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    บ้าน (83)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ฆ่า (65)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    ปืน (56)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    ผกก. (55)
                  </div>
                </div>
                <div class="b4 flex flex-col items-start gap-[5px]">
                  <div>
                    <p class="b3 font-bold">ก.ค. 2022</p>
                    <p class="b4 text-start">(415 ข่าว)</p>
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ตำรวจ (127)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    จับ (112)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    ดับ/ตาย (87)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ยิง (59)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    คดี (57)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    รถ (52)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ฆ่า (51)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    หนี (47)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    หนุ่ม (46)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50"
                  >
                    แม่ (40)
                  </div>
                </div>
              </div>
              <div class="pt-[10px]">
                <p class="b3">
                  เมื่อนำ 5 คำนี้ไปเทียบกับ Top 10 คีย์เวิร์ดของเดือนอื่นๆ
                  อาจได้ข้อสรุปว่า
                </p>

                <div class="">
                  <p class="b3 pb-[10px]">
                    ข่าวอาชญากรรมมักหลีกหนีไม่พ้นตัวละคร<span class="font-bold"
                      >ตำรวจ</span
                    >ที่ต้องทำ<span class="font-bold">คดี</span>เมื่อมีคน<span
                      class="font-bold"
                      >ยิง</span
                    >กัน เพราะ 3 คำนี้โผล่ให้เห็นใน Top 10 คีย์เวิร์ดของทุกเดือน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card10"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวกีฬา</p>
                <p class="b4 text-[#717070]">
                  รวม 5,538 ข่าว (3% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 py-[10px]">
                <p>
                  เทรนด์ข่าวมีขึ้นและลง แต่หากลองสำรวจเทรนด์ของเดือนที่โดดเด่น
                  หรือมีจำนวนข่าวสูงกว่าเดือนใกล้เคียง
                  คนไทยคนแรกอย่างเราจะรู้ว่า
                </p>
              </div>
              <div class="b3">
                <ul class="list-disc">
                  <li>
                    <span class="font-bold">พ.ค. 2022</span>
                    <span class="text-[#717070]"> (250 ข่าว) </span>
                    <br />
                    <p class="">มีแข่งซีเกมส์ครั้งที่ 31 ที่เวียดนาม</p>
                  </li>
                  <li>
                    <span class="font-bold">พ.ย. 2022</span>
                    <span class="text-[#717070]"> (313 ข่าว) </span>
                    <br />
                    <p class="">เริ่มแข่งฟุตบอลโลก 2022 ที่กาตาร์</p>
                  </li>
                  <li>
                    <span class="font-bold">ก.ย. 2023</span>
                    <span class="text-[#717070]"> (434 ข่าว) </span>
                    <br />
                    <p class="">ศึกเอเชียนเกมส์ครั้งที่ 19 ที่จีน</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card11"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าววิทยาศาสตร์/เทคโนโลยี</p>
                <p class="b4 text-[#717070]">
                  รวม 4,408 ข่าว (2.3% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 py-[10px] space-y-[10px]">
                <p>
                  แม้หมวดข่าวจะชื่อวิทยาศาสตร์/เทคโนโลยี แต่ข่าวหมวดนี้ขยี้แต่
                  ‘เทคโนโลยี’ เน้นๆ
                  เพราะสัดส่วนข่าวเทคโนโลยีเห็นทีจะมีมากกว่าข่าววิทยาศาสตร์
                  หากสำรวจคำที่โผล่ในพาดหัวข่าวหมวดนี้บ่อยๆ ในช่วง 2 ปี จะเจอ
                </p>
              </div>
              <div class="gap-[10px]">
                <div class="b4 grid grid-cols-2 gap-[5px] text-end">
                  <p class="b3 font-bold">ตัวละคร</p>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold"> อีลอน มัสก์ </span>(288)
                  </div>
                  <p class="b3 font-bold">แพลตฟอร์ม</p>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">Twitter/X</span>(459)
                  </div>
                  <p class="b3 font-bold">สมาร์ตโฟน</p>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">iPhone15</span> (63)
                  </div>
                  <p class="b3 font-bold">ประเทศ</p>
                  <div
                    class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                  >
                    <span class="font-bold">รัสเซีย</span>(75)
                  </div>
                </div>
                <div class="b4 flex flex-col items-start gap-[5px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card12"
          class="flex items-center justify-center lg:items-end lg:justify-end top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div
            class="bg-white p-[20px] w-full lg:w-[350px] text-center mx-[16px]"
          >
            <div>
              <div class="border-b border-[#C5C4C4] pb-[10px]">
                <p class="b1 font-bold">ข่าวสิ่งแวดล้อม</p>
                <p class="b4 text-[#717070]">
                  รวม 3,194 ข่าว (1.7% ของข่าวทั้งหมด)
                </p>
              </div>
              <div class="b3 py-[10px] space-y-[10px]">
                <p>
                  แนมโน้มจำนวนข่าวสิ่งแวดล้อมที่เพิ่มขึ้น
                  อาจสะท้อนการเพิ่มขึ้นของข่าวร้ายมากกว่าข่าวดี
                  เพราะคุณจะพบคำเกี่ยวกับภัยธรรมชาติ
                  หรืออุบัติภัยที่มนุษย์ก่อในข่าวหมวดนี้อยู่บ่อยๆ เช่น
                </p>
              </div>
              <div
                class="b4 flex flex-wrap items-center justify-center gap-[5px] pt-[10px]"
              >
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">น้ำท่วม</span>(256)
                </div>
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">ฝนตกหนัก</span>(196)
                </div>
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">ฝุ่น PM2.5</span>(94)
                </div>
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">น้ำป่า</span>(66)
                </div>
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">ฝนถล่ม</span>(34)
                </div>
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">คราบน้ำมัน</span>(34)
                </div>
                <div
                  class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit"
                >
                  <span class="font-bold">มลพิษ</span>(33)
                </div>

                <div class="b4 flex flex-col items-start gap-[5px]"></div>
              </div>
              <div class="b3 pt-[10px] space-y-[10px]">
                <p>
                  อย่างเดือน
                  <span class="font-bold"> ก.ย. 2022</span> ที่มีจำนวนข่าวสูงสุด
                  (254 ข่าว) ก็เป็นเดือนที่เกิดเหตุการณ์
                  <span class="font-bold">น้ำท่วม และพายุโนรู</span>
                </p>
              </div>
              <div class="b3 pt-[10px]">
                <p>
                  แต่ก็ไม่ได้แปลว่าจะไม่มีข่าวน่าสนใจอื่นๆ เลย
                  ตัวอย่างข่าวน่าติดตามที่มีคีย์เวิร์ดโผล่มาใน Top 10
                  ของบางเดือนก็เช่น
                </p>
                <div class="font-bold">
                  <p>ข่าวพลายศักดิ์สุรินทร์</p>
                  <p>คดีสินบนกรมอุทยานฯ</p>
                  <p>หรือแก้มลิงเกาะพระทอง</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="explore" class="py-[40px] bg-[#EBE8DE] z-10 relative">
        <h1 class="h5 font-bold text-center">
          สำรวจเทรนด์ข่าวในปี<br />
          2022-2023 ด้วยตัวเอง ผ่าน
        </h1>
        <div
          class="b1 font-bold flex justify-center border-collapse pt-[10px] mb-[5px] w-full"
        >
          <button
            :class="exploreModeSelected === 'หมวดข่าว' ? 'bg-black cream' : ''"
            class="border-black border p-[5px] w-full"
            @click="selectExploreMode('หมวดข่าว')"
          >
            หมวดข่าว
          </button>
          <button
            :class="
              exploreModeSelected === 'คีย์เวิร์ด' ? 'bg-black cream' : ''
            "
            class="border-black border p-[5px] w-full"
            @click="selectExploreMode('คีย์เวิร์ด')"
          >
            คีย์เวิร์ด
          </button>
        </div>
        <div class="my-[15px]">
          <div v-if="exploreModeSelected === 'คีย์เวิร์ด'" class="relative">
            <div
              :class="{ 'bg-white': isInputFocused }"
              class="group-focus:bg-white bg-[#EBE8DE] flex justify-between w-full h-full"
            >
              <div class="flex border-b border-[#939393] w-full">
                <img
                  src="/image/trends/Search.svg"
                  alt=""
                  class="w-[16px] m-[5px]"
                />
                <input
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
                  class="group text-black bg-[#EBE8DE]/0 b2 font-bold focus:outline-none w-full pl-3 py-[5px]"
                />
              </div>

              <img
                src="/image/trends/Close.svg"
                alt=""
                class="w-[16px] cursor-pointer border-b border-[#939393]"
                @click="clearInput"
                v-if="!isInputFocused"
              />
              <div
                v-else
                class="border border-[#FF006B] text-[#FF006B] b4 px-[10px] flex items-center cursor-pointer"
                @click="searchKeyword"
              >
                ค้นหา
              </div>
            </div>
            <ul
              v-if="showSuggestions && filteredSuggestions.length > 0"
              class="w-full absolute bg-white p-[10px] b2 space-y-[10px] z-10 ml-0"
            >
              <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                @mousedown="handleSuggestionMouseDown(suggestion)"
                @blur="hideSuggestions"
                class="cursor-pointer"
              >
                <span v-html="highlightMatchedText(suggestion)"></span>
              </li>
            </ul>
          </div>

          <div
            class="flex items-center pb-[10px] w-full"
            v-if="exploreModeSelected === 'หมวดข่าว'"
          >
            <p class="b4">หมวด</p>
            <select
              v-model="categorySelected"
              @change="selectCategory($event.target.value)"
              name=""
              id=""
              class="b2 font-bold bg-[#EBE8DE] border-b-black border w-full px-4 focus:outline-none"
            >
              <option value="การเมือง">การเมือง</option>
              <option value="สังคมไทย">สังคมไทย</option>
              <option value="เศรษฐกิจ">เศรษฐกิจ/การเงิน</option>
              <option value="ต่างประเทศ">ต่างประเทศ</option>
              <option value="บันเทิง">บันเทิง</option>
              <option value="อาชญากรรม">อาชญากรรม</option>
              <option value="กีฬา">กีฬา</option>
              <option value="วิทยาศาสตร์">วิทยาศาสตร์เทคโนโลยี</option>
              <option value="สิ่งแวดล้อม">สิ่งแวดล้อม</option>
            </select>
          </div>
          <div
            class=""
            v-if="
              (exploreModeSelected === 'คีย์เวิร์ด' && dataForKW) ||
              exploreModeSelected === 'หมวดข่าว'
            "
          >
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
                <div class="relative w-full">
                  <div
                    class="z-10 flex items-end gap-[1px] justify-center lg:w-full"
                  >
                    <div
                      v-if="
                        exploreModeSelected === 'หมวดข่าว' &&
                        exploreCategoryHeadlineData
                      "
                      v-for="(item, index) in exploreCategoryHeadlineData[
                        Object.keys(exploreCategoryHeadlineData).find(
                          (category) => category.includes(categorySelected)
                        )
                      ]['monthly']"
                      :key="index"
                      class="group flex flex-col items-center gap-2 w-[3.75%] lg:w-[4.06%]"
                    >
                      <div
                        v-if="exploreModeSelected === 'หมวดข่าว'"
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
                            `${categorySelected}`
                          )}px`,
                        }"
                      ></div>
                      <p
                        class="text-[#939393] -rotate-90 b6"
                        style="pointer-events: none"
                      >
                        {{ monthShortTH[item.month - 1] }}
                      </p>
                    </div>
                    <div
                      v-if="exploreModeSelected === 'คีย์เวิร์ด'"
                      class="flex flex-col items-end"
                    >
                      <div
                        class="cursor-pointer relative flex gap-[1px] w-[90vw] lg:px-[9vw] justify-center"
                      >
                        <div
                          v-for="(item, itemIndex) in dataForKW.montly"
                          class="flex flex-col cursor-pointer relative justify-end"
                          :style="{
                            width: `${90 / dataForKW.montly.length}%`,
                          }"
                        >
                          <div
                            class="group relative"
                            v-for="(ct, ctNo) in Object.keys(
                              dataForKW.categories_total
                            ).reverse()"
                            :class="getCategoryColorClass(ct)"
                            :style="{
                              height: `${calculateHeightPerCategory2(
                                item.total,
                                item[ct],
                                200,
                                maxOfMonthly
                              )}px`,
                            }"
                          >
                            <div
                              id="popupDetail"
                              :class="itemIndex > 12 ? 'right-0' : 'left-0'"
                              class="absolute bg-white p-[5px] top-0 hidden group-hover:inline-block z-20 w-[85px] lg:w-[120px]"
                            >
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
                                  )"
                                >
                                  <div
                                    class="flex items-center gap-[2px]"
                                    v-if="item[cate] > 0"
                                  >
                                    <div
                                      class="w-[10px] h-[10px] bg-orange"
                                      :class="getCategoryColorClass(cate)"
                                    ></div>
                                    <p>{{ item[cate] }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p
                            class="text-[#939393] -rotate-90 b5 py-[10px]"
                            style="pointer-events: none"
                          >
                            {{ monthShortTH[item.month - 1] }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="exploreModeSelected === 'หมวดข่าว'"
                    class="z-0 absolute bottom-0 w-full h-full"
                    style="pointer-events: none"
                  >
                    <div class="flex flex-col justify-between h-full p-[5px]">
                      <div>
                        <p class="b5 border-b border-black border-dotted">
                          xxx
                        </p>
                      </div>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                      <p class="b5 border-b border-black border-dotted">xxx</p>
                      <p class="b5 border-b border-black border-dotted">xxx</p>

                      <p></p>
                      <p></p>
                    </div>
                  </div>
                </div>

                <div
                  class="b5 text-[#939393] grid grid-cols-2 place-items-center lg:pt-[30px] lg:mb-[10px] font-bold"
                >
                  <p>2022</p>
                  <p>2023</p>
                </div>
              </div>
              <div
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#C5C4C4]"
                style="pointer-events: none"
              ></div>
            </div>

            <div
              class="flex flex-col justify-center items-center"
              ref="exploreRef"
            >
              <div v-if="exploreModeSelected === 'หมวดข่าว'">
                <div class="flex justify-center items-center">
                  <button
                    @click="handleExploreMounthYear('prev')"
                    class="cursor-pointer"
                  >
                    <img src="/image/trends/PreviousBtn.svg" alt="" />
                  </button>
                  <p class="b3 font-bold">
                    {{ fullMonthAndYear }}
                  </p>
                  <button
                    @click="handleExploreMounthYear('next')"
                    class="cursor-pointer"
                  >
                    <img src="/image/trends/NextBtn.svg" alt="" />
                  </button>
                </div>
                <p class="b3 text-center py-[5px]">
                  มีข่าว{{ categorySelected }}ทั้งหมด
                  <span
                    class="font-bold"
                    v-if="
                      totalDataEachCategory && totalDataEachCategory.length > 0
                    "
                    >{{
                      parseInt(
                        totalDataEachCategory.find(
                          (item) => item.category.includes(categorySelected)
                        ).total
                      ).toLocaleString()
                    }}
                    พาดหัวข่าว</span
                  >
                  และมักพบ 10 คำ*เหล่านี้อยู่บ่อยๆ
                </p>
                <div
                  class="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-[5px] text-[#FFF8B5] w-fit mx-auto justify-items-center"
                >
                  <div
                    v-for="(kw, index) in top10Keywords"
                    :class="
                      index % 2 === 0
                        ? 'justify-self-end'
                        : 'justify-self-start'
                    "
                    class="bg-black flex items-center gap-[2px] px-[5px] justify-center text-center w-fit"
                  >
                    <p class="b3">{{ kw.keyword }}</p>
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
                  class="flex flex-wrap items-center justify-center gap-[5px] py-[5px]"
                >
                  <div
                    v-for="(ct, index) in Object.keys(
                      dataForKW.categories_total
                    )"
                  >
                    <p :class="getCategoryColorClass(ct)" class="b3 px-2">
                      {{ ct
                      }}<span class="b4">
                        ({{ dataForKW.categories_total[ct] }})</span
                      >
                    </p>
                  </div>
                </div>
              </div>
              <p class="b3 py-[5px]">เช่น</p>
              <div
                id="sampleNewsCategory"
                v-if="
                  filteredSampleHeadlineCategory &&
                  exploreModeSelected === 'หมวดข่าว'
                "
                :class="getCategoryBorderColor(categorySelected)"
                class="bg-black border-l-[5px] lg:border-l-[10px] text-white p-[10px] space-y-[5px] w-[288px] lg:w-[400px]"
              >
                <p class="b4 font-bold">
                  {{
                    formatMonth(
                      filteredSampleHeadlineCategory[sampleIndex].date
                    )
                  }}
                </p>
                <h1
                  class="t4 font-black"
                  v-html="
                    highlightKeyword(
                      filteredSampleHeadlineCategory[sampleIndex].headline,
                      'a'
                    )
                  "
                ></h1>
                <p class="b5">
                  ที่มา:
                  <a :href="filteredSampleHeadlineCategory[sampleIndex].link">{{
                    filteredSampleHeadlineCategory[sampleIndex].news_station
                  }}</a>
                </p>
              </div>
              <div
                id="sampleNewsKW"
                :class="
                  getCategoryBorderColor(
                    dataForKW.sample_headlines[sampleIndex].category
                  )
                "
                v-if="
                  dataForKW &&
                  dataForKW.sample_headlines &&
                  dataForKW.sample_headlines[sampleIndex] &&
                  exploreModeSelected === 'คีย์เวิร์ด'
                "
                class="bg-black border-l-[5px] lg:border-l-[10px] text-white p-[10px] space-y-[5px] w-[288px] lg:w-[400px]"
              >
                <p class="b4 font-bold">
                  {{
                    formatMonth(dataForKW.sample_headlines[sampleIndex].date)
                  }}
                </p>
                <h1
                  class="t4 font-black"
                  v-html="
                    highlightKeyword(
                      dataForKW.sample_headlines[sampleIndex].headline,
                      inputKeyword
                    )
                  "
                ></h1>
                <p class="b5">
                  ที่มา:
                  <a :href="dataForKW.sample_headlines[sampleIndex].link">{{
                    dataForKW.sample_headlines[sampleIndex].news_station
                  }}</a>
                </p>
              </div>
              <button
                class="text-[#FF006B] b4 w-fit mx-auto mt-[20px] border-[#EBE8DE] flex gap-[5px]"
              >
                <img src="/image/Reset.svg" alt="" />
                <p @click="handleNewSample">สุ่มตัวอย่างเพิ่ม</p>
              </button>
              <p class="b5 text-[#717070] text-center pt-[15px]">
                *หมายเหตุ : คำที่มีความหมายเดียวกัน แต่เขียนต่างกันเล็กน้อย เช่น
                “กทม./กรุงเทพฯ”, “โควิด/โควิด-19/Covid-19”
                จะถือว่าเป็นคำเดียวกัน และนับจำนวนข่าวรวมกัน
              </p>
            </div>
          </div>
          <div class="h-[90vh]" v-else>
            <p class="b3 text-center p-[25px] h-3/4">
              ไม่พบพาดหัวข่าวที่มีคีย์เวิร์ดที่คุณค้นหา ลองเปลี่ยนคำใหม่ดู
            </p>
          </div>
        </div>
        <p
          @click="showRefPopup"
          class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto my-[10px] border-[#EBE8DE]"
        >
          อ่านที่มาและข้อจำกัดของข้อมูล
        </p>
        <div class="py-[40px] text-center">
          <p class="b3 font-bold py-[20px] border-t-2 border-[#C5C4C4]">
            สำรวจประเด็นที่เหลือ
          </p>
          <SectionBtn link="/lifecycle" />
          <NuxtLink
            to="/"
            class="text-[#FF006B] b4 border-b-1 border-[#FF006B] w-fit mx-auto"
          >
            <p class="my-[20px]">กลับไปหน้าแรก</p>
          </NuxtLink>
          <Share :hasMsgerLink="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
option {
  background-color: white;
}

.stoke {
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: white;
}
</style>

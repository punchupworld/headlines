<script setup>
import scrollama from "scrollama"

const headlineRef = ref(null)
const currentIndex = ref(0)
const currentText = computed(() => headlineShow[currentIndex.value])
const exploreModeSelected = ref("หมวดข่าว")
const isShowRefPopup = ref(false)
const categoryIndex = ref(0)
const data = ref()
const exploreData = ref()
const categorySelected = ref("การเมือง")
const max = ref(0)
const min = ref(0)
const maxStory = ref(0)
const maxStoryIndex = ref(0)
const minStory = ref(0)
const minStoryIndex = ref(0)
const inputKeyword = ref("แซ่บ")
const showSuggestions = ref(false)
const isInputFocused = ref(false)
const keywords = ref()

const headlineShow = [
  'ดิว อริสรา มาตามนัด เข้าให้ปากคำตำรวจไซเบอร์ คดีเว็บพนัน "มาเก๊า 888"',
  'เปิดเผย! คนไทยเจอข่าวอะไรมากที่สุด คือ "โควิด-19" และ "เศรษฐกิจ"',
  "“ทิม” มอง “หมออ๋อง” ไม่มีเจตนาโฆษณาคราฟต์เบียร์ แต่คงภูมิใจสินค้าบ้านเกิด",
]

const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value
}

const startLoop = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % headlineShow.length
  }, 1000)
}

const formatMonth = (inputDate) => {
  const months = [
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
  const dateParts = inputDate.split("-")
  const day = parseInt(dateParts[2])
  const month = parseInt(dateParts[1])
  const year = parseInt(dateParts[0])
  return `${day} ${months[month - 1]} ${year}`
}

const setData = () => {
  data.value = exploreData.value.slice(1, -1)
  max.value = Math.max(...data.value.map((d) => d[categorySelected.value]))
  min.value = Math.min(...data.value.map((d) => d[categorySelected.value]))
  data.value.forEach((entry, index) => {
    const totalValue = parseInt(entry.Total.trim(), 10)

    if (!isNaN(totalValue) && totalValue > maxStory.value) {
      maxStory.value = totalValue
      maxStoryIndex.value = index
    }

    // if (!isNaN(totalValue) && totalValue < minStory.value && totalValue !== 0) {

    //     minStory.value = Math.min(...data.value.map((d) => d.Total))
    //     minStoryIndex.value = index;
    // }
  })
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

const maxOfMonthly = ref()
const findMaxOfMonthly = () => {
  let dataValues = dataForKW.value.montly
  console.log(dataValues)
  let maxValue = Math.max(...dataValues.map((d) => d.total))
  maxOfMonthly.value = maxValue
  console.log(maxOfMonthly.value)
}
const selectExploreMode = async (mode) => {
  exploreModeSelected.value = mode
  if (exploreModeSelected.value === "คีย์เวิร์ด") {
    dataForKW.value = await keywords.value[inputKeyword.value]
    console.log(dataForKW.value)
    findMaxOfMonthly()
  }
}

const getCategoryColorClass = (category) => {
  switch (category) {
    case "การเมือง":
      return "bg-vermillion"
    case "สังคมไทย":
      return "bg-lightblue"
    case "เศรษฐกิจ":
      return "bg-orange"
    case "ต่างประเทศ":
      return "bg-rose"
    case "บันเทิง":
      return "bg-pink"
    case "อาชญากรรม":
      return "bg-brown"
    case "กีฬา":
      return "bg-purple"
    case "วิทยาศาสตร์เทคโนโลยี":
      return "bg-blue"
    case "สิ่งแวดล้อม":
      return "bg-green"
  }
}

const getCategoryBorderColor = (category) => {
  switch (category) {
    case "การเมือง":
      return "border-[#FF3D00]"
    case "สังคมไทย":
      return "border-[#4ADADA]"
    case "เศรษฐกิจ":
      return "border-[#FF984D]"
    case "ต่างประเทศ":
      return "border-[#BD4553]"
    case "บันเทิง":
      return "border-[#FFB2AC]"
    case "อาชญากรรม":
      return "border-[#8C6345]"
    case "กีฬา":
      return "border-[#AA92E3]"
    case "วิทยาศาสตร์เทคโนโลยี":
      return "border-[#257DCC]"
    case "สิ่งแวดล้อม":
      return "border-[#9BB95A]"
  }
}
const calculateHeight = (count, maxHeigh, mode, max) => {
  if (mode) {
    const scalePercent =
      (count * 100) /
      exploreData.value[exploreData.value.length - 1][categorySelected.value]
    const scale = (scalePercent * maxHeigh) / 100
    // console.log("maxMode", max)
    return Math.ceil(scale)
    // const scale =
    //   (count * maxHeigh) / exploreData.value[exploreData.value.length - 1][categorySelected.value]
    //   console.log('hi',exploreData.value[exploreData.value.length - 1][categorySelected.value])
    //   console.log('hi',count)
    // return Math.ceil(scale)
  } else {
    // console.log("maxJa", max)
    const scalePercent = (count * 100) / max
    const scale = (scalePercent * maxHeigh) / 100
    return Math.ceil(scale)
  }
}

const calculateHeightPerCategory = (total, count, maxHeigh, max) => {
  const scalePercent = (total * 100) / max
  const scaleAll = (scalePercent * maxHeigh) / 100
  const scalePerCategory = (count * scaleAll) / total
  return Math.ceil(scalePerCategory)
}

const calculateHeight2 = (count, maxHeigh, category) => {
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

const handleCurrentIndex = (index) => {
  categoryIndex.value = index
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
  const month = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ]
  let year
  top10Keywords.value = await top10KeywordsData.value.filter((item) => {
    const itemMonths = item.month.split(",").map((m) => m.toLowerCase())
    if (categoryIndex.value >= 12) {
      year = 2023
      let cateIndex = categoryIndex.value - 12
      return (
        item.news_category === category &&
        itemMonths.includes(month[cateIndex]) &&
        item.year === year
      )
    } else {
      year = 2022
      return (
        item.news_category === category &&
        itemMonths.includes(month[categoryIndex.value]) &&
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
    }
  } else if (action === "next") {
    if (categoryIndex.value !== data.value.length - 1) {
      categoryIndex.value += 1
      filterCategoryKeyword(categorySelected.value)
    }
  }
}
const selectCategory = (category) => {
  categorySelected.value = category
  max.value = Math.max(...data.value.map((d) => d[categorySelected.value]))
  min.value = Math.min(...data.value.map((d) => d[categorySelected.value]))
  filterCategoryKeyword(category)
}

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

const convertToMonthShortTH = (monthEN) => {
  const index = monthShortEN.indexOf(monthEN)
  return index !== -1 ? monthShortTH[index] : ""
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
}

const hideSuggestions = () => {
  // showSuggestions.value = false
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
const handleSuggestionMouseDown = (selectedValue) => {
  selectSuggestion(selectedValue)
  showSuggestions.value = false
}

const highlightKeyword = (headline, keyword) => {
  return headline.replace(
    new RegExp(`(${keyword})`, "gi"),
    '<span class="text-[#FFF8B5]">$1</span>'
  )
}

const sampleIndex = ref(0)
const handleNewSample = () => {
  if (sampleIndex.value === 9) {
    sampleIndex.value = 0
  }
  sampleIndex.value += 1
}

onMounted(async () => {
  startLoop()
  await fetchData()
  await fetchExploreData10Keyword()
  await filterCategoryKeyword(categorySelected.value)
  findWidthandHeight("section2")
  await fetchAggregateKW()

  const handleSectionOpacity = (currentSection, direction) => {
    const sections = Array.from({ length: 12 }, (_, index) =>
      document.getElementById(`section${index + 1}`)
    )

    for (let i = 0; i < sections.length; i++) {
      if (i === currentSection) {
        sections[i].style.opacity = direction === "down" ? 0 : 1
      } else if (i === currentSection - 1) {
        sections[i].style.opacity = direction === "down" ? 1 : 0
      } else {
        sections[i].style.opacity = 0
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
        step: "#card2, #card3, #card4, #card5, #card6 ,#card7, #card8, #card9, #card10, #card11, #card12",
        offset: 0.9,
        debug: false,
      })
      .onStepEnter(handleStepEnter)
    window.addEventListener("resize", scroller.resize)
  }
  init()
})

watchEffect(() => {})
</script>

<template>
  <div class="bg-[#EBE8DE] max-w-screen-sm">
    <div
      id="refPopup"
      class="max-w-screen-sm fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-20 p-3"
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
    <div id="part1" class="pb-[40px] px-[16px] max-w-[850px]">
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
          class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto mt-[20px] border-[#EBE8DE]"
        >
          อ่านที่มาและข้อจำกัดของข้อมูล
        </p>
        <div class="flex gap-[19px] justify-center pl-[43px] pr-[88px]">
          <img src="/image/trends/Watch.svg" alt="" class="w-[100px]" />
          <img src="/image/trends/Color.svg" alt="" class="w-[38px]" />
        </div>
      </div>
      <div id="section" class="h-screen sticky top-0">
        <div class="flex flex-col items-center h-screen justify-center">
          <div
            id="section1"
            style="opacity: 1; transition: opacity 0.5s ease"
            class="absolute flex justify-center items-center z-0"
          >
            <div
              ref="headlineRef"
              class="relative bg-black p-[10px] w-[90vw] h-3/4 max-w-[600px]"
            >
              <p class="cream t2">
                {{ currentText }}
              </p>
            </div>
          </div>
          <div
            id="section2"
            style="transition: opacity 0.5s ease"
            class="opacity-0 absolute pointer-events-none flex flex-col justify-center items-center"
          >
            <p class="text-[#717070] b4 font-bold text-center pb-[10px]">
              จำนวนข่าวรายเดือน
            </p>
            <div class="relative">
              <div
              class="relative flex items-end gap-[1px] justify-center w-[90vw] max-w-[600px]"
            >
              <div
                v-for="(item, index) in data"
                class="w-full cursor-pointer relative flex flex-col gap-[10px] justify-center"
                :style="{
                  width: `${90 / data.length}%`,
                }"
              >
                <div
                  :class="
                    index === maxStoryIndex
                      ? 'bg-black'
                      : index === minStoryIndex
                      ? 'bg-black'
                      : 'bg-[#717070]'
                  "
                  :style="{
                    height: `${calculateHeight2(
                      item.Total,
                      findWidthandHeight('section2'),
                      'Total'
                    )}px`,
                  }"
                ></div>
                <p
                  class="text-[#939393] -rotate-90 b6"
                  style="pointer-events: none"
                >
                  {{ convertToMonthShortTH(item.MonthName) }}
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
                      class="absolute -top-1.5 b5  text-[#FF006B] font-bold stoke"
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
            
            <div class="flex flex-wrap justify-center py-[10px]">
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
              <div
              class="relative flex items-end gap-[1px] justify-center w-[90vw] max-w-[600px]"
            >
              <div
                v-for="(item, index) in data"
                :style="{
                  width: `${90 / data.length}%`,
                }"
                class="flex flex-col-reverse cursor-pointer relative"
              >
                <p
                  class="text-[#939393] -rotate-90 b6 py-[10px]"
                  style="pointer-events: none"
                >
                  {{ convertToMonthShortTH(item.MonthName) }}
                </p>
                <div
                  v-for="(ct, index) in category"
                  :class="ct.color"
                  :style="{
                    height: `${calculateHeightPerCategory(
                      item.Total,
                      item[ct.name],
                      findWidthandHeight('section3'),
                      maxStory
                    )}px`,
                  }"
                ></div>
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
            
            <div class="flex flex-wrap justify-center py-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div
                  class="flex items-end gap-[1px] w-[90vw] justify-center pointer-events-none"
                >
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
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
                        height: `${calculateHeight2(
                          item.การเมือง,
                          findWidthandHeight('section4'),
                          'การเมือง'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
                    }"
                  >
                    <div
                      class="w-full bg-lightblue cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight2(
                          item.สังคมไทย,
                          findWidthandHeight('section5'),
                          'สังคมไทย'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
                    }"
                  >
                    <div
                      class="w-full bg-orange cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight2(
                          item.เศรษฐกิจ,
                          findWidthandHeight('section6'),
                          'เศรษฐกิจ'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
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
                        height: `${calculateHeight2(
                          item.ต่างประเทศ,
                          findWidthandHeight('section7'),
                          'ต่างประเทศ'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
                    }"
                  >
                    <div
                      class="w-full bg-pink cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight2(
                          item.บันเทิง,
                          findWidthandHeight('section8'),
                          'บันเทิง'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
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
                        height: `${calculateHeight2(
                          item.อาชญากรรม,
                          findWidthandHeight('section9'),
                          'อาชญากรรม'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
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
                        height: `${calculateHeight2(
                          item.กีฬา,
                          findWidthandHeight('section10'),
                          'กีฬา'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
                    }"
                  >
                    <div
                      class="w-full bg-blue cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight2(
                          item.วิทยาศาสตร์เทคโนโลยี,
                          findWidthandHeight('section11'),
                          'วิทยาศาสตร์เทคโนโลยี'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
              <div class="relative flex items-end gap-[1px] justify-center">
                <div class="flex items-end gap-[1px] w-[90vw] justify-center">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2"
                    :style="{
                      width: `${90 / data.length}%`,
                    }"
                  >
                    <div
                      class="w-full cursor-pointer relative"
                      :class="index === 8 ? 'bg-green' : 'bg-green opacity-50'"
                      :style="{
                        height: `${calculateHeight2(
                          item.สิ่งแวดล้อม,
                          findWidthandHeight('section12'),
                          'สิ่งแวดล้อม'
                        )}px`,
                      }"
                    ></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                    {{ convertToMonthShortTH(item.MonthName) }}
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

            <div class="flex flex-wrap justify-center pt-[10px]">
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
      <div id="card" class="relative z-10">
        <div
          id="card1"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="b3 bg-white p-[20px] w-full text-center mx-[16px]">
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
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
            <p class="b3">
              เมื่อเจาะดูเป็นรายหมวดพบว่า คนไทยมีโอกาสเห็นพาดหัวข่าว
              <span class="bg-vermillion font-bold">การเมือง</span> และ
              <span class="bg-lightblue font-bold">สังคมไทย</span> มากที่สุด
              ในขณะที่
              <span class="bg-green font-bold">สิ่งแวดล้อม</span>
              เป็นข่าวที่ถูกนำเสนอน้อยที่สุด
            </p>
            <p class="b4 text-[#939393]">สัดส่วนข่าวแต่ละหมวด รวม 2 ปี</p>
            <div class="flex h-[60px] my-[10px] w-full">
              <div
                class="stoke bg-vermillion w-[28%] flex items-center justify-center"
              >
                28.2%
              </div>
              <div
                class="stoke bg-lightblue w-[26%] flex items-center justify-center"
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
                class="stoke bg-green w-[2%] flex items-center justify-center"
              >
                1.7%
              </div>
            </div>
            <p class="b3 font-bold">
              ไปดูกันว่าข่าวในแต่ละหมวดมีประเด็นอะไรที่น่าสนใจบ้าง
            </p>
          </div>
        </div>
        <div
          id="card4"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                  class="b4 flex flex-wrap items-center justify-center gap-[2px]"
                >
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    keyword-1(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    keyword-1(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    keyword-1(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    keyword-1(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    keyword-1(xxx)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card5"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                <p class="b1 font-bold pt-[10px]">เหตุการณ์สำคัญ</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    สงกรานต์(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    กราดยิงหนองบัวลำภู(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    APEC(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ลอยกระทง(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    เรือหลวงสุโขทัย(xxx)
                  </div>
                </div>
              </div>
              <div class="py-[10px] border-b border-[#C5C4C4]">
                <p class="b1 font-bold">ภัยธรรมชาติ</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    น้ำท่วม(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ฝุ่น PM2.5(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ไต้ฝุ่นโนรู(xxx)
                  </div>
                </div>
              </div>
              <div class="border-b border-[#C5C4C4] py-[10px]">
                <p class="b1 font-bold">โรค</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    โควิด-19(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    โอมิครอน(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ฝีดาษลิง(xxx)
                  </div>
                </div>
              </div>
              <div class="border-b border-[#C5C4C4] py-[10px]">
                <p class="b1 font-bold">บุคคล</p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    แตงโมนิดา(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ชัชชาติ(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    พิธา(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ทักษิณ(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    กำนันนก(xxx)
                  </div>
                </div>
              </div>
              <div class="pt-[10px]">
                <p class="b3">
                  นอกจากนี้ยังมีคำที่บ่งชี้เพศสภาพซึ่งปรากฏในพาดหัวข่าวอยู่บ่อยๆ
                  อย่าง
                </p>
                <div
                  class="b4 flex flex-wrap items-center justify-center gap-[5px]"
                >
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    สาว(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    หนุ่ม(xxx)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card6"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                <p class="font-bold">Top10</p>
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
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    หุ้น/ตลาดหุ้น(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    จีน(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ดอกเบี้ย(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    เงินเฟ้อ(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    กำไร(xxx)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card7"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    แตงโม(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    อิงฟ้า(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ดิวอริสรา(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    แอนโทเนีย(xxx)
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
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    โพสต์(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    รัก(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    แซ่บ(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    โชว์(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    อวด(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    สวย(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ดราม่า(xxx)
                  </div>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    เลิก(xxx)
                  </div>
                </div>
                <div class="flex flex-col items-center">
                  <p class="b3 pb-[10px]">หรือแม้แต่</p>
                  <div
                    class="b4 bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    ติดโควิด(xxx)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card9"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                    <p class="b3 font-bold">ก.ย. 2022</p>
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
                    ข่าวอาชญากรรมมักหลีกหนีไม่พ้นตัวละคร
                    <span class="font-bold">ตำรวจ</span> ที่ต้องทำ
                    <span class="font-bold">คดี</span> เมื่อมีคน
                    <span class="font-bold">ยิง</span> กัน เพราะ 3
                    คำนี้โผล่ให้เห็นใน Top 10 คีย์เวิร์ดของทุกเดือน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card10"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
              <div>
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
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    อีลอน มัสก (541)
                  </div>
                  <p class="b3 font-bold">แพลตฟอร์ม</p>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    Twitter/X(1,421)
                  </div>
                  <p class="b3 font-bold">สมาร์ตโฟน</p>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    iPhone15 (70)
                  </div>
                  <p class="b3 font-bold">ประเทศ</p>
                  <div
                    class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                  >
                    รัสเซีย (3,557)
                  </div>
                </div>
                <div class="b4 flex flex-col items-start gap-[5px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="card12"
          class="flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
        >
          <div class="bg-white p-[20px] w-full text-center mx-[16px]">
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
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  น้ำท่วม (2,391)
                </div>
                <div
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  ฝนตกหนัก (852)
                </div>
                <div
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  ฝุ่น PM2.5 (654)
                </div>
                <div
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  น้ำป่า (354)
                </div>
                <div
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  ฝนถล่ม (340)
                </div>
                <div
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  มลพิษ (191)
                </div>
                <div
                  class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit"
                >
                  คราบน้ำมัน (118)
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
              v-if="showSuggestions"
              class="w-full absolute bg-white p-[10px] b2 space-y-[10px] z-10 ml-0"
            >
              <li
                v-for="(suggestion, index) in filteredSuggestions"
                :key="index"
                @mousedown="handleSuggestionMouseDown(suggestion)"
                class="cursor-pointer"
              >
                {{ suggestion }}
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
              <option value="เศรษฐกิจ">เศรษฐกิจ</option>
              <option value="ต่างประเทศ">ต่างประเทศ</option>
              <option value="บันเทิง">บันเทิง</option>
              <option value="อาชญากรรม">อาชญากรรม</option>
              <option value="กีฬา">กีฬา</option>
              <option value="วิทยาศาสตร์เทคโนโลยี">วิทยาศาสตร์เทคโนโลยี</option>
              <option value="สิ่งแวดล้อม">สิ่งแวดล้อม</option>
            </select>
          </div>
          <div class="">
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
                  <div class="z-10 flex items-end gap-[1px] justify-center">
                    <div
                      v-if="exploreModeSelected === 'หมวดข่าว'"
                      v-for="(item, index) in data"
                      :key="index"
                      class="group flex flex-col items-center gap-2"
                      :style="{
                        width: `${90 / data.length}%`,
                      }"
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
                            item[categorySelected],
                            3000,
                            'all'
                          )}px`,
                        }"
                      >
                        <div
                          id="popupDetail"
                          class="absolute bg-white p-[5px] top-10 left-0 hidden group-hover:inline-block w-max z-20"
                        >
                          <p class="font-bold flex">
                            {{ item.MonthName }} {{ item.Year }}
                          </p>
                          <p class="b5">
                            <span class="b3 font-bold">{{
                              parseInt(item[categorySelected]).toLocaleString()
                            }}</span>
                            พาดหัวข่าว
                          </p>
                          <div class="b4 flex flex-wrap gap-[2px]">
                            <div class="flex items-center gap-[2px]">
                              <div class="w-[10px] h-[10px] bg-orange"></div>
                              <p>20</p>
                            </div>
                            <div class="flex items-center gap-[2px]">
                              <div class="w-[10px] h-[10px] bg-brown"></div>
                              <p>20</p>
                            </div>
                            <div class="flex items-center gap-[2px]">
                              <div class="w-[10px] h-[10px] bg-green"></div>
                              <p>20</p>
                            </div>
                            <div class="flex items-center gap-[2px]">
                              <div class="w-[10px] h-[10px] bg-blue"></div>
                              <p>20</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="exploreModeSelected === 'คีย์เวิร์ด'"
                        class="w-full cursor-pointer relative"
                      >
                        <div
                          v-for="(ct, index) in category"
                          :class="ct.color"
                          :style="{
                            height: `${calculateHeightPerCategory(
                              item.Total,
                              item[ct.name],
                              300,
                              maxStory
                            )}px`,
                          }"
                        >
                          <div
                            id="popupDetail"
                            class="absolute bg-white p-[5px] top-10 left-0 hidden group-hover:inline-block w-max z-20"
                          >
                            <p class="font-bold flex">
                              {{ item.MonthName }} {{ item.Year }}
                            </p>
                            <p class="b5">
                              <span class="b3 font-bold">{{
                                parseInt(
                                  item[categorySelected]
                                ).toLocaleString()
                              }}</span>
                              พาดหัวข่าว
                            </p>
                            <div class="b4 flex flex-wrap gap-[2px]">
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-orange"></div>
                                <p>20</p>
                              </div>
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-brown"></div>
                                <p>20</p>
                              </div>
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-green"></div>
                                <p>20</p>
                              </div>
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-blue"></div>
                                <p>20</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <p
                        class="text-[#939393] -rotate-90 b6"
                        style="pointer-events: none"
                      >
                        {{ convertToMonthShortTH(item.MonthName) }}
                      </p>
                    </div>
                    <div
                      v-if="exploreModeSelected === 'คีย์เวิร์ด'"
                      class="group flex flex-col items-end"
                    >
                      <div
                        class="cursor-pointer relative flex gap-[1px] w-[90vw]"
                      >
                        <div
                          v-for="(item, index) in dataForKW.montly"
                          class="flex flex-col-reverse cursor-pointer relative"
                          :style="{
                            width: `${90 / dataForKW.montly.length}%`,
                          }"
                        >
                          <div
                            v-for="(ct, index) in Object.keys(
                              dataForKW.categories_total
                            )"
                            :class="getCategoryColorClass(ct)"
                            :style="{
                              height: `${calculateHeightPerCategory(
                                dataForKW.total,
                                item[ct],
                                findWidthandHeight('section12'),
                                maxOfMonthly
                              )}px`,
                            }"
                          ></div>

                          <div
                            id="popupDetail"
                            class="absolute bg-white p-[5px] top-10 left-0 hidden group-hover:inline-block w-max z-20"
                          >
                            <p class="font-bold flex">
                              {{ monthShortTH }}
                            </p>
                            <p class="b5">
                              <!-- <span class="b3 font-bold">{{
                                parseInt(
                                  item[categorySelected]
                                ).toLocaleString()
                              }}</span> -->
                              พาดหัวข่าว
                            </p>
                            <div class="b4 flex flex-wrap gap-[2px]">
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-orange"></div>
                                <p>20</p>
                              </div>
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-brown"></div>
                                <p>20</p>
                              </div>
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-green"></div>
                                <p>20</p>
                              </div>
                              <div class="flex items-center gap-[2px]">
                                <div class="w-[10px] h-[10px] bg-blue"></div>
                                <p>20</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                      <p
                        class="text-[#939393] -rotate-90 b6"
                        style="pointer-events: none"
                      >
                        {{ monthShortTH[1] }}
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
                  class="b5 text-[#939393] grid grid-cols-2 place-items-center pt-[10 px]"
                >
                  <p>2022</p>
                  <p>2023</p>
                </div>
              </div>
              <div
                class="absolute top-0 right-[50%] w-full h-full border-r border-[#939393]"
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
                    <!-- {{ exploreData[categoryIndex+1]?.MonthName }}
                    {{ exploreData[categoryIndex+1]?.Year }} -->
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
                  <!-- <span class="font-bold">{{exploreData[exploreData?.length-1][categorySelected] }} พาดหัวข่าว</span> และมักพบ 10 -->
                  คำเหล่านี้อยู่บ่อยๆ
                </p>
                <div
                  class="grid grid-cols-2 gap-[5px] text-[#FFF8B5] w-fit mx-auto"
                >
                  <div
                    v-for="(kw, index) in top10Keywords"
                    class="bg-black flex items-center gap-[2px] px-[5px] justify-center text-center"
                  >
                    <p class="b3">{{ kw.keyword }}</p>
                    <p class="b4">({{ kw.frequency }})</p>
                  </div>
                </div>
              </div>
              <div v-if="exploreModeSelected === 'คีย์เวิร์ด'">
                <p class="b3 text-center">
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
                v-if="exploreModeSelected === 'หมวดข่าว'"
                class="bg-black border-l-[5px] border-red-500 text-white p-[10px] space-y-[5px]"
              >
                <p class="b4 font-bold">22 07 2545</p>
                <!-- <h1
                  class="t4 font-black"
                  v-html="
                    highlightKeyword(
                      dataForKW.sample_headlines[sampleIndex].headline,
                      inputKeyword
                    )
                  "
                ></h1> -->
                <!-- <p class="b5">
                  ที่มา:
                  <a :href="dataForKW.sample_headlines[sampleIndex].link">{{
                    dataForKW.sample_headlines[sampleIndex].news_station
                  }}</a>
                </p> -->
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
                class="bg-black border-l-[5px] text-white p-[10px] space-y-[5px]"
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
            </div>
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

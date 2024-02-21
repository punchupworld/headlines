<script setup>
import scrollama from "scrollama"
import { Vue3Lottie } from "vue3-lottie"
import lottie_1 from "public/lottie/lottie-1.json"
import { sum, max } from "d3"
import BarChart from "/components/BarChart.vue"
import StoryCardSet from "/components/StoryCardSet.vue"
import BarAxis from "/components/BarAxis.vue"
import ExplorePart1 from "/components/ExplorePart1.vue"
import { vOnClickOutside } from "@vueuse/components"

const headlineRef = ref(null)
const currentIndex = ref(0)
const headlineShow = ref([])
const isShowRefPopup = ref(false)
const maxOfMonthCategory = ref(0)
const sampleHeadlineCategory = ref()
const exploreCategoryHeadlineData = ref()
const totalDataEachMonth = ref([])
const totalDataEachCategory = ref([])

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

const fetchSampleHeadlineCategory = async () => {
  const response = await fetch("/data/trends/HeadlinesSample.json")
  const data = await response.json()
  sampleHeadlineCategory.value = data
  headlineShow.value = sampleHeadlineCategory.value
    .map((item) => item.headline)
    .slice(0, 10)
}

const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value
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

const scroller = scrollama()

const findWidthandHeight = (section) => {
  const sectionFocus = document.getElementById(section)
  if (sectionFocus) {
    const width = sectionFocus.offsetWidth
    const height = (3 / 4) * width
    return height
  } else {
    return 0
  }
}

watchEffect((onCleanup) => {
  if (process.client) {
    if (headlineShow.value.length === 0) return

    let interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % headlineShow.value.length
    }, 1000)

    onCleanup(() => {
      clearInterval(interval)
    })
  }
})

const currentText = computed(() => {
  return headlineShow.value[currentIndex.value]
})

const step = ref(0)
onMounted(async () => {
  console.log(window.innerWidth)
  await fetchSampleHeadlineCategory()
  await fetchExploreCategoryHeadline()
  await summaryData()

  const handleSectionOpacity = (currentSection) => {
    const sections = Array.from({ length: 12 }, (_, index) =>
      document.getElementById(`section${index + 1}`)
    )

    for (let i = 0; i < sections.length; i++) {
      if (i === currentSection - 1) {
        sections.forEach((section) => {
          section.style.opacity =
            section.id === `section${currentSection}` ? 1 : 0
        })
      }
    }
  }

  const handleStepEnter = (response) => {
    step.value = response.index
    console.log("step", step.value)
    const currentSection = parseInt(response.element.id.replace("card", ""), 10)
    handleSectionOpacity(currentSection, response.direction)
  }
  const init = () => {
    nextTick(() => {
      scroller
        .setup({
          step: "#card1, #card2, #card3, #card4, #card5, #card6 ,#card7, #card8, #card9, #card10, #card11, #card12",
          offset: 0.9,
          debug: false,
        })
        .onStepEnter((response) => {
          handleStepEnter(response)
        })
      window.addEventListener("resize", scroller.resize)
    })
  }
  init()
})

const closeModal = () => {
  isShowRefPopup.value = false
}
</script>

<template>
  <div
    class="bg-[#EBE8DE] max-w-screen-sm md:max-w-full flex flex-col justify-center">
    <div
      id="refPopup"
      class="max-w-screen-sm md:max-w-full fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-20 p-3"
      v-show="isShowRefPopup">
      <div
        v-on-click-outside="closeModal"
        id="popUpScroll"
        class="relative bg-white w-[90vw] max-w-[900px] max-h-[80vh] h-fit">
        <img
          @click="isShowRefPopup = false"
          src="/image/CanclePink.svg"
          alt="CanclePinkIcon"
          class="absolute -top-2 -right-2 cursor-pointer" />
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
                  <a
                    href="https://zenodo.org/records/8373578"
                    target="_blank"
                    class="underline"
                    >python library newmm-tokenizer</a
                  >
                  เพื่อตัดคำในพาดหัวข่าว และเครื่องมือ
                  <a
                    href="https://doi.nrct.go.th//ListDoi/listDetail?Resolve_DOI=10.14456/nuej.2022.14"
                    target="_blank"
                    class="underline"
                    >LCS</a
                  >
                  (Longest Common Substring) เพื่อหาคีย์เวิร์ดที่มีความหมาย
                  โดยการเทียบพาดหัวข่าว 2 ข่าวและหาคำเหมือนกันที่ยาวที่สุด
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
            <a
              href="https://m.me/punchupworld"
              target="_blank"
              class="text-[#FF006B] font-bold"
              >m.me/punchupworld</a
            >
          </p>
        </div>
      </div>
    </div>
    <div
      id="part1"
      class="pb-[40px] px-[16px] max-w-[850px] md:max-w-full md:mx-[15vw]">
      <div
        id="cover"
        class="space-y-[10px] text-center mb-[20px] h-screen flex flex-col justify-center">
        <h1 class="t2 pb-5">..‘พาดหัวข่าว’ เล่าเรื่อง..</h1>
        <p class="h4 font-bold">คนไทยได้เจอข่าวอะไรมากที่สุด ?</p>
        <p class="b2">
          สำรวจเทรนด์ข่าวรายเดือน พร้อมคีย์เวิร์ดที่ปรากฏบ่อยในช่วง 2 ปี
        </p>
        <p
          @click="isShowRefPopup = true"
          class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto mt-[20px] border-[#EBE8DE] cursor-pointer">
          อ่านที่มาและข้อจำกัดของข้อมูล
        </p>
        <div class="">
          <ClientOnly>
            <Vue3Lottie
              :animationData="lottie_1"
              class="max-w-[450px] w-[90vw]" />
          </ClientOnly>
        </div>
        <img
          src="/image/trends/ArrowDown.svg"
          alt="ArrowDown"
          class="w-[20px] mx-auto mt-[10px] md:mt-[20px]" />
      </div>
      <div class="max-w-[850px] mx-auto">
        <div id="section" class="h-screen sticky top-0 overflow-hidden z-0">
          <div
            class="flex flex-col items-center xl:items-start h-screen justify-center">
            <div
              id="section1"
              style="opacity: 1; transition: opacity 0.5s ease"
              class="absolute flex justify-center items-center z-0 pointer-events-none">
              <div
                ref="headlineRef"
                class="relative bg-black p-[10px] max-[375px]:w-[90vw] max-w-[600px] xl:pr-[60px] xl:pl-[20px] flex items-center"
                :style="findWidthandHeight('section1')"
                style="overflow: hidden">
                <p class="cream t2">
                  {{ currentText }}
                </p>
              </div>
            </div>
            <div
              id="section2"
              style="transition: opacity 0.5s ease"
              class="opacity-0 absolute pointer-events-none flex flex-col justify-center items-center xl:justify-start xl:items-start">
              <p
                class="text-[#717070] b4 font-bold text-center pb-[10px] flex items-center justify-center mx-auto">
                จำนวนข่าวรายเดือน
              </p>
              <div class="relative">
                <div
                  class="relative flex items-end gap-[1px] justify-center max-[375px]:w-[90vw] lg:max-w-[600px]">
                  <div
                    v-for="(item, index) in totalDataEachMonth"
                    class="w-full cursor-pointer relative flex flex-col gap-[10px] justify-center"
                    :style="{
                      width: `${90 / 24}%`,
                    }">
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
                      }"></div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none">
                      {{ monthShortTH[item.month - 1] }}
                    </p>
                  </div>
                </div>
                <BarAxis :isSection2="true" />
                <div
                  class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]">
                  <p>2022</p>
                  <p>2023</p>
                </div>
                <div
                  class="absolute top-0 right-[50%] w-full h-full border-r border-[#C5C4C4]"
                  style="pointer-events: none"></div>
              </div>
            </div>
            <div
              id="section3"
              class="opacity-0 absolute pointer-events-none flex flex-col justify-center items-start max-[1024px]:items-center"
              style="transition: opacity 0.5s ease">
              <p
                class="text-[#717070] b4 font-bold text-center pb-[10px] mx-auto">
                จำนวนข่าวรายเดือน แบ่งตามหมวด
              </p>
              <div class="relative">
                <div class="relative flex items-end justify-center">
                  <div
                    class="flex items-end gap-[1px] justify-center lg:max-w-[600px] max-[375px]:w-[90vw]">
                    <div
                      v-for="(no, index) in 24"
                      :style="{ width: `${90 / 24}%` }"
                      class="flex flex-col justify-center gap-[10px]">
                      <div class="flex flex-col-reverse">
                        <div
                          v-for="(ct, index) in category || 0"
                          class="flex cursor-pointer">
                          <div
                            v-if="totalDataEachMonth.length > 0"
                            class="w-full"
                            :class="ct.color"
                            :style="{
                              height: `${calculateHeightPerCategory(
                                totalDataEachMonth[index].total,
                                exploreCategoryHeadlineData[ct?.name][
                                  'monthly'
                                ][no - 1].total,
                                findWidthandHeight('section2'),
                                maxOfMonthCategory
                              )}px`,
                            }"></div>
                        </div>
                      </div>

                      <p
                        class="text-[#939393] -rotate-90 b6"
                        style="pointer-events: none">
                        {{
                          index >= 12
                            ? monthShortTH[index - 12]
                            : monthShortTH[index]
                        }}
                      </p>
                    </div>
                  </div>
                </div>
                <BarAxis />
                <div
                  class="b5 font-bold text-[#939393] grid grid-cols-2 justify-items-center pt-[10px]">
                  <p>2022</p>
                  <p>2023</p>
                </div>
                <div
                  class="absolute top-0 right-[50%] w-full h-full border-r border-[#C5C4C4]"
                  style="pointer-events: none"></div>
              </div>

              <div
                class="flex flex-wrap justify-center py-[10px] lg:max-w-[600px]">
                <div v-for="(item, index) in category">
                  <div class="flex items-center gap-[5px] pr-[10px]">
                    <div :class="item.color" class="w-[10px] h-[10px]"></div>
                    <p class="b5">{{ item.name }}</p>
                  </div>
                </div>
              </div>
            </div>
            <BarChart
              v-for="(ct, index) in category"
              :step="step"
              :id="'section' + (index + 4)"
              :category="ct.name"
              :color="ct.color"
              :storyData="exploreCategoryHeadlineData"
              :totalCategoryData="totalDataEachCategory"
              :totalMonthData="totalDataEachMonth"
              :height="findWidthandHeight(`section${index + 4}`)" />
          </div>
        </div>
        <div id="card" class="relative z-10 flex flex-col pointer-events-none">
          <StoryCardSet />
        </div>
      </div>
      <ExplorePart1 />
      <p
        @click="showRefPopup"
        class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto my-[10px] border-[#EBE8DE] cursor-pointer">
        อ่านที่มาและข้อจำกัดของข้อมูล
      </p>
      <div class="py-[40px] text-center">
        <p class="b3 font-bold py-[20px] border-t-2 border-[#C5C4C4]">
          สำรวจประเด็นที่เหลือ
        </p>
        <SectionBtn link="/lifecycle" />
        <NuxtLink
          to="/"
          class="text-[#FF006B] b4 border-b-1 border-[#FF006B] w-fit mx-auto">
          <p class="my-[20px]">กลับไปหน้าแรก</p>
        </NuxtLink>
        <Share :hasMsgerLink="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
option {
  background-color: white;
}
</style>

<script setup>
const headlineShow = [
  'ดิว อริสรา มาตามนัด เข้าให้ปากคำตำรวจไซเบอร์ คดีเว็บพนัน "มาเก๊า 888"',
  'เปิดเผย! คนไทยเจอข่าวอะไรมากที่สุด คือ "โควิด-19" และ "เศรษฐกิจ"',
  "“ทิม” มอง “หมออ๋อง” ไม่มีเจตนาโฆษณาคราฟต์เบียร์ แต่คงภูมิใจสินค้าบ้านเกิด",
]

const headlineRef = ref(null)
const currentIndex = ref(0)
const currentText = computed(() => headlineShow[currentIndex.value])
const exploreModeSelected = ref("หมวดข่าว")
const isShowRefPopup = ref(false)
const categoryIndex = ref(0)
const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value
}

const selectExploreMode = (mode) => {
  exploreModeSelected.value = mode
}

const startLoop = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % headlineShow.length
  }, 1000)
}
const formatMonth = (inputDate, type) => {
  const fullMonth = [
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
  if (type === "full") {
    return `${fullMonth[inputDate - 1]}`
  } else {
    return `${months[inputDate - 1]}`
  }
}
// const data = [
//   { month: 1, year: 2022, count: 3000 },
//   { month: 2, year: 2022, count: 4000 },
//   { month: 3, year: 2022, count: 5000 },
//   { month: 4, year: 2022, count: 6000 },
//   { month: 5, year: 2022, count: 7000 },
//   { month: 6, year: 2022, count: 5000 },
//   { month: 7, year: 2022, count: 4000 },
//   { month: 8, year: 2022, count: 3000 },
//   { month: 9, year: 2022, count: 2000 },
//   { month: 10, year: 2022, count: 1000 },
//   { month: 11, year: 2022, count: 2000 },
//   { month: 12, year: 2022, count: 3000 },
//   { month: 1, year: 2023, count: 4000 },
//   { month: 2, year: 2023, count: 5000 },
//   { month: 3, year: 2023, count: 6000 },
//   { month: 4, year: 2023, count: 7000 },
//   { month: 5, year: 2023, count: 8000 },
//   { month: 6, year: 2023, count: 9000 },
//   { month: 7, year: 2023, count: 10000 },
//   { month: 8, year: 2023, count: 11000 },
//   { month: 9, year: 2023, count: 12000 },
//   { month: 10, year: 2023, count: 13000 },
//   { month: 11, year: 2023, count: 14000 },
//   { month: 12, year: 2023, count: 15000 },
// ]
const data = ref()
const exploreData = ref()
const categorySelected = ref("การเมือง")
const max = ref(0)
const min = ref(0)
const maxStory = ref(0)
const maxStoryIndex = ref(0)
const minStory = ref(0)
const minStoryIndex = ref(0)
const setData = () => {
  data.value = exploreData.value.slice(1, -1)
  console.log(data.value)
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

  console.log("Max Total:", maxStory.value)
  console.log("Min Total:", minStory.value)
  console.log("Min Index:", minStoryIndex.value)
}

const selectCategory = (category) => {
  categorySelected.value = category
  max.value = Math.max(...data.value.map((d) => d[categorySelected.value]))
  min.value = Math.min(...data.value.map((d) => d[categorySelected.value]))
}

const calculateHeight = (count, maxHeigh, mode, max) => {
  if (mode==="all") {
    const scale =
      (count * 330) / exploreData.value[exploreData.value.length - 1].Total
    return Math.ceil(scale)
  }
  else if(mode==="month"){
  const scalePercent = (count * 100) / max
  const scaleAll = (scalePercent * maxHeigh) / 100
  const scalePerCategory = c
  return Math.ceil(scale)
  }
  else {
    const scalePercent = (count * 100) / max
    const scale = (scalePercent * maxHeigh) / 100
    return Math.ceil(scale)
  }
}

const calculateHeightPerCategory = (total, count,maxHeigh, max) => {
  const scalePercent = (total * 100) / max
  const scaleAll = (scalePercent * maxHeigh) / 100
  const scalePerCategory = (count*scaleAll)/total
  return Math.ceil(scalePerCategory)
}

const calculateHeight2 = (count, maxHeigh, max) => {
  const scalePercent = (count * 100) / max
  const scale = (scalePercent * maxHeigh) / 100
  return Math.ceil(scale)
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
    exploreData.value = await rows
    console.log(exploreData.value)
    setData()
  } catch (error) {
    console.error("Error fetching CSV data:", error)
  }
}
const handleExploreMounthYear = (action) => {
  if (action === "prev") {
    if (categoryIndex.value !== 0) {
      categoryIndex.value -= 1
    }
  } else if (action === "next") {
    if (categoryIndex.value !== data.value.length - 1) {
      categoryIndex.value += 1
    }
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
}

const inputKeyword = ref("ทิม")
const showSuggestions = ref(false)
const isInputFocused = ref(false)
const suggestions = ref([
  "ทิม",
  "พิธา",
  "นายก",
  "เมือง",
  "เศรษฐกิจ",
  "ต่างประเทศ",
  "บันเทิง",
  "วิทยาศาสตร์เทคโนโลยี",
  "สังคมไทย",
  "อาชญากรรม",
  "กีฬา",
  "สิ่งแวดล้อม",
])

const filteredSuggestions = computed(() => {
  return suggestions.value.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputKeyword.value.toLowerCase())
  )
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
  console.log(selectedValue)
  inputKeyword.value = selectedValue
  // showSuggestions.value = false
}

const handleSuggestionMouseDown = (selectedValue) => {
  selectSuggestion(selectedValue)
}

const calculateHeightWithNewScale = (total, maxHeight, maxStory) => {
  const totalValue = parseInt(total.trim(), 10)
  const scale = maxStory / 4 // 4 เป็นจำนวนเส้นใหม่ที่ต้องการ
  const normalizedValue = Math.min(totalValue, scale)
  return (normalizedValue / scale) * maxHeight
}
onMounted(async () => {
  startLoop()
  await fetchData()
})

watchEffect(() => {})
</script>

<template>
  <div class="bg-[#EBE8DE] max-w-screen-sm">
    <div
      id="refPopup"
      class="max-w-screen-sm fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-10 p-3"
      v-show="isShowRefPopup"
    >
      <div id="popUpScroll" class="relative bg-white w-full h-[335px] p-1">
        <img
          @click="showRefPopup"
          src="/image/CanclePink.svg"
          alt=""
          class="absolute -top-2 -right-2"
        />
        <div id="ref" class="p-[15px] text-center overflow-y-auto h-full">
          <div class="pb-5">
            <h1 class="h5 font-bold py-4" ref="reference">
              ที่มาและข้อจำกัดของข้อมูล
            </h1>
            <p class="b3">
              ข้อมูลที่ใช้พัฒนางานชิ้นนี้
              ทีมงานได้เก็บรวบรวมจากเว็บไซต์สำนักข่าวในประเทศไทยที่น่าเชื่อถือและมีผู้ใช้งานจำนวนมาก
              จากการจัดอันดับของ
              <span class="font-bold"
                >Reuters Institute for the Study of Journalism</span
              >
              ในปี 2023
              และมีการจัดโครงสร้างเว็บไซต์ที่เป็นระบบที่ทำให้สามารถเก็บรวบรวมข้อมูลได้
              ข้อมูลในงานชิ้นนี้ จึงไม่ได้ครอบคลุมข่าวทั้งหมดที่มีในประเทศไทย
              แต่มาจาก 5 เว็บไซต์ข่าวออนไลน์ที่สำคัญ
            </p>
          </div>

          <h2 class="b2 font-bold py-5 border border-t-[#C5C4C4] border-white">
            สัดส่วนข่าวจากแต่ละสำนัก
          </h2>
          <p class="b3 pb-5">
            เนื่องจากแต่ละสำนักข่าวมีจำนวนข่าวที่ไม่เท่ากัน
            จึงทำให้เทรนด์ที่พบในงานนี้ได้รับอิทธิพลจากสำนักข่าวที่มีจำนวนข่าวเยอะเป็นพิเศษ
          </p>
          <div class="flex flex-col items-center">
            <img src="/image/NewsAgency.svg" alt="" />
            <div class="grid grid-cols-2 py-5 px-[37px]">
              <div>
                <ol class="b4 font-bold list-decimal text-start">
                  <li>ไทยรัฐ ออนไลน์</li>
                  <li>The Standard</li>
                  <li>Thai PBS</li>
                  <li>Voice TV</li>
                  <li>WorkpointTODAY</li>
                </ol>
              </div>
              <div class="b4">
                <p>55.8 %</p>
                <p>55.8 %</p>
                <p>55.8 %</p>
                <p>55.8 %</p>
                <p>55.8 %</p>
              </div>
            </div>
          </div>
          <h2 class="b2 font-bold border border-t-[#C5C4C4] border-white py-5">
            หมวดข่าวจากแต่ละสำนัก
          </h2>
          <p class="b3 leading-[19.6px]">
            จากประเภทข่าวที่แต่ละสำนักข่าวได้แบ่งไว้เป็นหมวดหมู่
            เราได้รวบรวมและจำแนกหมวดหมู่ประเภทข่าวให้ใหม่ เป็น 9 ประเภทข่าว
            เพื่อความสะดวกในการศึกษาและง่ายต่อการนำเสนอข้อมูล
            โดยเราไม่ได้หยิบใช้ข่าวในบางหมวดหมู่
            เนื่องด้วยจำนวนข่าวที่มีไม่มากและไม่มีส่วนเกียวข้องกับหมวดหมู่หลัก
          </p>
          <div class="flex justify-center gap-2">
            <div
              class="flex flex-col items-center font-bold border border-r-black border-white pr-2 b4"
            >
              <h3 class="h-[50px] b3 flex items-center">หมวดร่วม</h3>
              <div class="groupBlock">
                <div class="block_categry bg-vermillion">การเมือง</div>
                <div class="block_categry bg-lightblue">สังคมไทย</div>
                <div class="block_categry bg-orange">เศรษฐกิจ/การเงิน</div>
                <div class="block_categry bg-rose">ต่างประเทศ</div>
                <div class="block_categry bg-pink">บันเทิง</div>
                <div class="block_categry bg-brown">อาชญกรรม</div>
                <div class="block_categry bg-purple">กีฬา</div>
                <div class="block_categry bg-blue">วิทยาศาสตร์/เทคโนโลยี</div>
                <div class="block_categry bg-green">สิ่งแวดล้อม</div>
                <div class="block_categry not-use">หมวดอื่นๆที่ไม่ได้ใช้</div>
              </div>
            </div>
            <div
              class="flex gap-2 overflow-x-auto overflow-y-hidden scroll-smooth scroll-content b4"
            >
              <div class="flex flex-col items-center">
                <img src="/image/Thairath.svg" alt="" />
                <div class="groupBlock">
                  <div class="block_categry bg-vermillion">การเมื่อง</div>
                  <div class="block_categry bg-lightblue">ในกระแส</div>
                  <div class="block_categry bg-lightblue">ทั่วไทย</div>
                  <div class="block_categry bg-orange">money</div>
                  <div class="block_categry bg-rose">ต่างประเทศ</div>
                  <div class="block_categry bg-pink">บันเทิง</div>
                  <div class="block_categry bg-brown">อาชญกรรม</div>
                  <div class="block_categry bg-blue">เทคโนโลยี</div>
                  <div class="block_categry bg-green">ความยั่งยืน</div>
                  <div class="block_categry not-use">ยานยนต์</div>
                  <div class="block_categry not-use">พระราชสำนัก</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/Today.svg" alt="" />
                <div class="groupBlock">
                  <div class="block_categry bg-vermillion">การเมื่อง</div>
                  <div class="block_categry bg-orange">เศรษฐกิจ</div>
                  <div class="block_categry bg-orange">การเงิน</div>
                  <div class="block_categry bg-purple">กีฬา</div>
                  <div class="block_categry bg-blue">Tech</div>
                  <div class="block_categry bg-green">สิ่งแวดล้อม</div>
                  <div class="block_categry not-use">สิทธิมนุษยชน</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/ThaiPBS.svg" alt="" />
                <div class="groupBlock">
                  <div class="block_categry bg-vermillion">การเมื่อง</div>
                  <div class="block_categry bg-lightblue">สังคม</div>
                  <div class="block_categry bg-lightblue">ภูมิภาค</div>
                  <div class="block_categry bg-orange">เศรษฐกิจ</div>
                  <div class="block_categry bg-rose">ต่างประเทศ</div>
                  <div class="block_categry bg-pink">ศิลปะ-บันเทิง</div>
                  <div class="block_categry bg-brown">อาชญกรรม</div>
                  <div class="block_categry bg-purple">กีฬา</div>
                  <div class="block_categry bg-blue">วิทยาศาสตร์/เทคโนโลยี</div>
                  <div class="block_categry bg-green">สิ่งแวดล้อม</div>
                  <div class="block_categry bg-green">ภัยพิบัติ</div>
                  <div class="block_categry not-use">พระราชสำนัก</div>
                  <div class="block_categry not-use">ไลฟ์สไตล์</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/Standard.svg" alt="" />
                <div class="groupBlock">
                  <div class="block_categry bg-vermillion">Politics</div>
                  <div class="block_categry bg-lightblue">Thailand</div>
                  <div class="block_categry bg-orange">Business</div>
                  <div class="block_categry bg-rose">World</div>
                  <div class="block_categry bg-rose">China</div>
                  <div class="block_categry bg-purple">Sport</div>
                  <div class="block_categry bg-blue">Science</div>
                  <div class="block_categry bg-blue">Tech</div>
                  <div class="block_categry bg-green">Environment</div>
                  <div class="block_categry not-use">LGBTQ+</div>
                  <div class="block_categry not-use">On this day</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/VOICE.svg" alt="" />
                <div class="groupBlock">
                  <div class="block_categry bg-vermillion">การเมื่อง</div>
                  <div class="block_categry bg-orange">เศรษฐกิจ</div>
                  <div class="block_categry bg-rose">ต่างประเทศ</div>
                  <div class="block_categry bg-pink">บันเทิง</div>
                  <div class="block_categry not-use">คุณภาพชีวิต</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="part1" class="py-[40px] px-[16px]">
      <div class="space-y-[10px] text-center mb-[20px]">
        <h1 class="t2">..‘พาดหัวข่าว’<br />เล่าเรื่อง..</h1>
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
          <img src="/image/part1/Watch.svg" alt="" class="w-[100px]" />
          <img src="/image/part1/Color.svg" alt="" class="w-[38px]" />
        </div>
      </div>
      <div id="section1">
        <div
          ref="headlineRef"
          class="relative bg-black p-[10px] my-[40px] w-[90vw]"
        >
          <p class="cream t2">
            {{ currentText }}
          </p>

          <div class="overflow-y-auto">
            <div
              class="absolute flex items-center justify-center top-0 left-0 w-full mb-[70vh] mt-[10vh]"
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
          </div>
        </div>
      </div>
      <div id="section2">
        <div class="relative flex items-end gap-[1px] justify-center">
          <div
            v-for="(item, index) in data"
            :class="
              index === maxStoryIndex
                ? 'bg-black'
                : index === minStoryIndex
                ? 'bg-black'
                : 'bg-[#717070]'
            "
            class="cursor-pointer relative"
            :style="{
              width: `${90 / data.length}%`,
              height: `${calculateHeight2(item.Total, 300, maxStory)}px`,
            }"
          > </div>
          <div
            class="z-0 absolute -bottom-0 w-full h-[300px]"
            style="pointer-events: none"
          >
            <div class="flex flex-col justify-between h-full p-[5px]">
              <div>
                <p class="b5 border-b border-black border-dotted">8000</p>
                <p
                  class="b5 border-b border-[#FF006B] text-[#FF006B] font-bold"
                >
                  7816
                </p>
              </div>
              <p class="b5 border-b border-black border-dotted">6000</p>
              <p class="b5 border-b border-black border-dotted">4000</p>
              <p class="b5 border-b border-black border-dotted">2000</p>
              <p></p>
            </div>
          </div>
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
      <div id="section2">
        <div class="relative flex items-end gap-[1px] justify-center">
          <div
            v-for="(item, index) in data"
            :class="
              index === maxStoryIndex
                ? 'bg-black'
                : index === minStoryIndex
                ? 'bg-black'
                : 'bg-[#717070]'
            "
            class="cursor-pointer relative"
            :style="{
              width: `${90 / data.length}%`,
              height: `${calculateHeight2(item.Total, 300, maxStory)}px`,
            }"
          > </div>
          <div
            class="z-0 absolute -bottom-0 w-full h-[300px]"
            style="pointer-events: none"
          >
            <div class="flex flex-col justify-between h-full p-[5px]">
              <div>
                <p class="b5 border-b border-black border-dotted">8000</p>
                <p
                  class="b5 border-b border-[#FF006B] text-[#FF006B] font-bold"
                >
                  7816
                </p>
              </div>
              <p class="b5 border-b border-black border-dotted">6000</p>
              <p class="b5 border-b border-black border-dotted">4000</p>
              <p class="b5 border-b border-black border-dotted">2000</p>
              <p></p>
            </div>
          </div>
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
      <div id="section3">
        <div class="relative flex items-end gap-[1px] justify-center">
          <div
            v-for="(item, index) in data"
            :class="
              index === 16
                ? 'bg-vermillion'
                : index === 4
                ? 'bg-vermillion'
                : 'bg-[#FF3D00]/50'
            "
            class="cursor-pointer relative"
            :style="{
              width: `${90 / data.length}%`,
              height: `${calculateHeight2(item.การเมือง, 900, maxStory)}px`,
            }"
          >
        </div>
          <div
            class="z-0 absolute -bottom-0 w-full h-[300px]"
            style="pointer-events: none"
          >
            <div class="flex flex-col justify-between h-full p-[5px]">
              <div>
                <p class="b5 border-b border-black border-dotted">8000</p>
                <p
                  class="b5 border-b border-[#FF006B] text-[#FF006B] font-bold"
                >
                  7816
                </p>
              </div>
              <p class="b5 border-b border-black border-dotted">6000</p>
              <p class="b5 border-b border-black border-dotted">4000</p>
              <p class="b5 border-b border-black border-dotted">2000</p>
              <p></p>
            </div>
          </div>
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
      <!-- <div>
        <div class="h-screen">
          <p class="text-center b3 font-bold py-[10px]">
            สัดส่วนข่าวแต่ละหมวด รวม 2 ปี
          </p>
          <div class="relative flex flex-col-reverse">
            <div
              v-for="(item, index) in category"
              class="text-center b3 font-bold flex justify-center items-center gap-2 w-full py-[3px]"
              :class="item.color"
              :style="{
                height: `${calculateHeight(
                  exploreData[exploreData.length - 1][item.name],
                  330,
                  'a'
                )}px`,
              }"
            >
              <p>xx%</p>
            </div>
            <div class="flex items-center justify-center">
              <div
                class="absolute bg-white p-[10px] top-2/3 text-center mx-[16px]"
              >
                <p class="b3">
                  คนไทยเห็นพาดหัวข่าว จากข่าว
                  <span class="font-bold bg-vermillion">การเมือง</span> และ
                  <span class="font-bold bg-lightblue">สังคมไทย</span> มากที่สุด
                  ในขณะที่
                  <span class="font-bold bg-green">สิ่งแวดล้อม</span>
                  เป็นข่าวที่ถูกนำเสนอน้อยที่สุด
                </p>
              </div>
            </div>
          </div>
          <p class="b5 font-bold text-center py-[10px]">2022-2023</p>
          <div class="flex flex-wrap justify-center py-[10px]">
            <div v-for="(item, index) in category">
              <div class="flex items-center gap-[5px] pr-[10px]">
                <div :class="item.color" class="w-[10px] h-[10px]"></div>
                <p class="b5">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="h-screen">
          <p class="text-center b3 font-bold py-[10px]">
            สัดส่วนข่าวแต่ละหมวด แยกรายปี
          </p>
          <div class="relative">
            <div class="grid grid-cols-2 w-full">
              <div class="relative flex flex-col-reverse border-r-2 border-black">
                <div
                  v-for="(item, index) in category"
                  class="text-center b3 font-bold flex justify-center items-center gap-2 w-full py-[3px]"
                  :class="item.color"
                  :style="{
                    height: `${calculateHeight(
                      exploreData[exploreData.length - 1][item.name],
                      330,
                      'a'
                    )}px`,
                  }"
                >
                  <p>xx%</p>
                </div>
              </div>
              <div class="relative flex flex-col-reverse">
                <div
                  v-for="(item, index) in category"
                  class="text-center b3 font-bold flex justify-center items-center gap-2 w-full py-[3px]"
                  :class="item.color"
                  :style="{
                    height: `${calculateHeight(
                      exploreData[exploreData.length - 1][item.name],
                      330,
                      'a'
                    )}px`,
                  }"
                >
                  <p>xx%</p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div
                class="absolute bg-white p-[10px] top-2/3 text-center mx-[16px]"
              >
                <p class="b3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, nostrum!
                </p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2">
            <p class="b5 font-bold text-center py-[10px] border-r-2 border-black">2022</p>
            <p class="b5 font-bold text-center py-[10px]">2023</p>
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
      </div> -->
      <div id="explore" class="py-[40px]">
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
                  src="/image/part1/Search.svg"
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
                src="/image/part1/Close.svg"
                alt=""
                class="w-[16px] cursor-pointer border-b border-[#939393]"
                @click="clearInput"
                v-if="!isInputFocused"
              />
              <div
                v-else
                class="border border-[#FF006B] text-[#FF006B] b4 px-[10px] flex items-center cursor-pointer"
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
              class="b2 font-bold bg-[#EBE8DE] border-b-black border w-full px-4"
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
            <div class="grid grid-cols-2 place-items-start my-[10px]">
              <p class="b5 font-bold">จำนวนพาดหัวข่าวรายเดือน</p>
              <div class="flex items-center">
                <img src="/image/part1/Click.svg" alt="" class="w-[20px]" />
                <p class="b5">คลิกแต่ละแท่งเพื่อเปลี่ยนเดือน</p>
              </div>
            </div>
            <div class="relative items-end justify-center w-full mt-6">
              <div class="relative w-full">
                <div class="z-10 flex items-end gap-[1px]">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="group flex flex-col items-center gap-2 w-[20%]"
                  >
                    <div
                      v-if="exploreModeSelected === 'หมวดข่าว'"
                      @click="handleCurrentIndex(index)"
                      :class="
                        index === categoryIndex
                          ? 'bg-[#FF3D00]'
                          : 'bg-[#FF3D00]/50'
                      "
                      class="w-full cursor-pointer relative"
                      :style="{
                        height: `${calculateHeight(
                          item[categorySelected],
                          150
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
                      class="w-full"
                    >
                      <!--  -->
                    </div>
                    <p
                      class="text-[#939393] -rotate-90 b6"
                      style="pointer-events: none"
                    >
                      {{ item.MonthName }}
                    </p>
                  </div>
                </div>
                <!-- <div
                  class="z-0 absolute -top-5 w-full h-full"
                  style="pointer-events: none"
                >
                  <div class="flex flex-col justify-between h-full">
                    <p class="b5 border-t border-gray-500 border-dotted">
                      {{ Math.ceil(max / 100) * 100 }}
                    </p>
                    <p class="b5 border-t border-gray-500 border-dotted">
                      {{ min }}
                    </p>
                    <p class="b5 border-t border-gray-500 border-dotted">
                      {{ min }}
                    </p>
                    <p class="b5 border-t border-gray-500 border-dotted">
                      {{ min }}
                    </p>
                    <p></p>
                  </div>
                </div> -->
              </div>

              <div
                class="b5 text-[#939393] grid grid-cols-2 place-items-center py-[5px]"
              >
                <p>2022</p>
                <p>2023</p>
              </div>
            </div>
            <div class="flex flex-col justify-center items-center">
              <div v-if="exploreModeSelected === 'หมวดข่าว'">
                <div class="flex justify-center items-center">
                  <button @click="handleExploreMounthYear('prev')">
                    <img src="/image/part1/PreviousBtn.svg" alt="" />
                  </button>
                  <p class="b3 font-bold">
                    <!-- {{ data[categoryIndex].MonthName }}
                    {{ data[categoryIndex].Year }} -->
                  </p>
                  <button @click="handleExploreMounthYear('next')">
                    <img src="/image/part1/NextBtn.svg" alt="" />
                  </button>
                </div>
                <p class="b3 text-center py-[5px]">
                  มีข่าว{{ categorySelected }}ทั้งหมด
                  <!-- <span class="font-bold">{{exploreData[exploreData.length-1][categorySelected] }} พาดหัวข่าว</span> และมักพบ 10 -->
                  คำเหล่านี้อยู่บ่อยๆ
                </p>
                <div
                  class="grid grid-cols-2 gap-[5px] text-[#FFF8B5] w-fit mx-auto"
                >
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                  <div class="bg-black flex items-center gap-2 px-2">
                    <p class="b3">keyword-1</p>
                    <p class="b4">(xx%)</p>
                  </div>
                </div>
              </div>
              <div v-if="exploreModeSelected === 'คีย์เวิร์ด'">
                <p class="b3 text-center">
                  พบคำว่า
                  <span class="font-bold">"ทิม"</span> ใน
                  <span class="font-bold">200</span>
                  พาดหัวข่าว โดยอยู่ในหมวด
                </p>
                <div class="flex flex-wrap gap-[5px]">
                  <div class="bg-orange flex items-center gap-2 px-2">
                    <p class="b3">การเมือง</p>
                    <p class="b4">(xx)</p>
                  </div>
                  <div class="bg-orange flex items-center gap-2 px-2">
                    <p class="b3">การเมือง</p>
                    <p class="b4">(xx)</p>
                  </div>
                  <div class="bg-orange flex items-center gap-2 px-2">
                    <p class="b3">กีฬา</p>
                    <p class="b4">(xx)</p>
                  </div>
                  <div class="bg-orange flex items-center gap-2 px-2">
                    <p class="b3">การเมือง</p>
                    <p class="b4">(xx)</p>
                  </div>
                  <div class="bg-orange flex items-center gap-2 px-2">
                    <p class="b3">การเมือง</p>
                    <p class="b4">(xx)</p>
                  </div>
                </div>
              </div>
              <p class="b3 py-[5px]">เช่น</p>
              <div
                class="bg-black border-l-8 border-red-600 text-white p-[10px] space-y-[5px]"
              >
                <p class="b4 font-bold">10 ม.ค. 22</p>
                <h1 class="t4 font-black">
                  “ทิม” มอง “หมออ๋อง” ไม่มีเจตนาโฆษณา คราฟต์เบียร์
                  แต่คงภูมิใจสินค้าบ้านเกิด
                </h1>
                <p class="b5">ที่มา: <a href="">ไทยรัฐ</a></p>
              </div>
              <button
                class="text-[#FF006B] b4 w-fit mx-auto mt-[20px] border-[#EBE8DE] flex gap-[5px]"
              >
                <img src="/image/Reset.svg" alt="" />
                <p>สุ่มตัวอย่างเพิ่ม</p>
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
          <NuxtLink to="/">
            <button>
              <div
                class="flex flex-col border-[2px] border-black hover:border-[#FF006B] bg-[#FFF8B5] p-[20px] gap-[5px]"
              >
                <h1 class="t3 font-black">
                  ..‘พาดหัวข่าว’<br />
                  มาราธอน..
                </h1>
                <h2 class="h5 font-bold">
                  เห็นตั้งแต่กุมภา เดือนกันยาก็ยังไม่หลุดเทรนด์
                </h2>
                <p class="b2">
                  รวมข่าวที่ได้แอร์ไทม์นาน
                  <br />ข่าวไหนบ้างที่ครองพื้นที่สื่อหลายเดือน
                </p>
                <p
                  class="text-[#FF006B] b3 flex gap-1 items-center justify-center"
                >
                  อ่านต่อ
                  <img src="/image/ArrowRight.svg" alt="" />
                </p>
              </div></button
          ></NuxtLink>
          <NuxtLink
            to="/"
            class="text-[#FF006B] b4 border-b-1 border-[#FF006B] w-fit mx-auto"
          >
            <p class="my-[20px]">กลับไปหน้าแรก</p>
          </NuxtLink>
          <div class="space-y-2">
            <p class="b4">แชร์</p>
            <div class="flex gap-[5px] justify-center">
              <img src="/image/Facebook.svg" alt="" class="h-[30px]" />
              <img src="/image/X.svg" alt="" />
              <img src="/image/Line.svg" alt="" />
            </div>
          </div>
          <div class="flex flex-col justify-center mt-5">
            <p class="b4">Produced by</p>
            <img src="/image/PunchUpLogo.svg" alt="" class="h-[40px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.groupBlock {
  border-collapse: collapse;
  width: max-content;
}

.not-use {
  border: 1px solid #c5c4c4 !important;
  color: #939393 !important;
}
.block_categry {
  border-collapse: collapse;
  width: 130px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

option {
  background-color: white;
}

/* .autocomplete {
  position: relative;
}

.autocomplete-input {
  width: 200px;
  padding: 5px;
} */

/* .suggestion-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
}

.suggestion-list li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.suggestion-list li:last-child {
  border-bottom: none;
} */
</style>

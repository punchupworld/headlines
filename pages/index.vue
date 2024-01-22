<script setup>
import draggable from "vuedraggable"
import Papa from "papaparse"
const myArray = ref([
  {
    id: 1,
    name: 'ดิว อริสรา มาตามนัด เข้าให้ปากคำตำรวจไซเบอร์ คดีเว็บพนัน "มาเก๊า 888" (คลิป)',
    date: "2021-06-30",
  },
  {
    id: 2,
    name: "“ทิม” มอง “หมออ๋อง” ไม่มีเจตนาโฆษณาคราฟต์เบียร์ แต่คงภูมิใจสินค้าบ้านเกิด",
    date: "2021-06-30",
  },
  {
    id: 3,
    name: "เช็กตารางบอลโลก 2022 ทรูโฟร์ยูถ่ายทอดสด 32 คู่",
    date: "2021-06-30",
  },
  // {
  //   id: 4,
  //   name: "คึกคัก! บุพเพสันนิวาส ๒ ฉาย 3 วัน กวาดรายได้ทั่วไทย 134 ล้าน",
  //   date: "2021-06-30",
  // },
  // {
  //   id: 5,
  //   name: '"อิ๊งค์" ชัด "เพื่อไทย" เสนอ "เศรษฐา" เป็นนายกฯ มั่นใจ คุย ส.ส. รู้เรื่อง',
  //   date: "2021-06-30",
  // },
])

const isShowAnswer = ref(false)
const resultTextHead = ref("")
const resultTextDesc = ref()
const numOfCorrect = ref(0)
const isShowContent = ref(false)
const isShowQuiz = ref(true)
const isShowRefPopup = ref(false)
const quizData = ref([])
const reference = ref(null)
const quizSet = ref(1)
const quiz = ref([])

const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value
}
const showContent = () => {
  isShowContent.value = true
  isShowQuiz.value = false
}

const answer = computed(() => {
  return [...quiz.value].sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })
})

const checkAnswer = () => {
  console.log(quiz.value)
  numOfCorrect.value = quiz.value.filter((item, index) => {
    return item.name === answer.value[index].name
  }).length
  if (numOfCorrect.value === 3) {
    resultTextHead.value =
      "คุณมีความแม่นยำถึง " +
      (numOfCorrect.value * 100) / answer.value.length +
      "%"
    resultTextDesc.value = `คุณคือนักอ่านข่าวตัวยง ! <br/> และอาจชอบงานชิ้นนี้ของเรา`
  } else if (numOfCorrect.value === 0) {
    resultTextHead.value = "คุณเรียงผิดหมดเลย"
    resultTextDesc.value = `จำเป็นต้องอ่านงานเราอย่างยิ่ง !`
  } else {
    resultTextHead.value =
      "คุณมีความแม่นยำแค่ " +
      Math.floor((numOfCorrect.value * 100) / answer.value.length) +
      "%"
    resultTextDesc.value = `จำเป็นต้องอ่านงานเราอย่างยิ่ง !`
  }
  isShowAnswer.value = true
  isShowContent.value = true
}
const formatDate = (inputDate) => {
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
  const dateObject = new Date(inputDate)
  const day = dateObject.getDate()
  const monthIndex = dateObject.getMonth()
  const year = dateObject.getFullYear() % 100
  return `${day} ${months[monthIndex]} ${year}`
}
const setQuiz = async () => {
  if (quizSet.value !== 10) {
    quiz.value = quizData.value.filter(
      (item) => parseInt(item.id) === parseInt(quizSet.value)
    )
    console.log(quiz.value)
    quizSet.value++
  } else {
    quizSet.value = 1
    quiz.value = quizData.value.filter(
      (item) => parseInt(item.id) === parseInt(quizSet.value)
    )
    
  }
  const addFieldToObject = (obj, fieldName, fieldValue) => {
      obj[fieldName] = fieldValue
    }
    addFieldToObject(quiz.value[0], "no", 1)
    addFieldToObject(quiz.value[1], "no", 2)
    addFieldToObject(quiz.value[2], "no", 3)
}
const restartQuiz = async () => {
  isShowAnswer.value = false
  isShowContent.value = false
  await setQuiz()
}

const scrollToReference = () => {
  reference.value.scrollIntoView({ behavior: "smooth" })
}

const fetchData = async () => {
  try {
    const response = await fetch("/data/quiz.csv")
    const csvText = await response.text()
    const rows = csvText.split("\n").map((line) => {
      const [id, name, link, date] = line.split(",")
      return { id, name, link, date }
    })
    quizData.value = rows
    console.log(quizData.value)
    setQuiz()
  } catch (error) {
    console.error("Error fetching CSV data:", error)
  }
}

onMounted(() => {
  fetchData()
  quizSet.value = 1
})
</script>

<template>
  <div class="max-w-screen-sm bg-[#EBE8DE] flex flex-col justify-center h-full">
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
              <div class="group">
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
                <div class="group">
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
                <div class="group">
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
                <div class="group">
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
                <div class="group">
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
                <div class="group">
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
    <div
      id="quiz"
      class="flex flex-col h-screen py-[30px] px-[16px] max-w-[850px]"
      v-show="isShowQuiz"
    >
      <div class="text-center space-y-[5px] pb-[30px]" v-if="isShowAnswer">
        <h5
          :class="numOfCorrect === 0 ? 'bg-[#FF3D00]' : 'bg-[#4ADADA]'"
          class="h5 font-bold mx-auto w-fit"
        >
          {{ resultTextHead }}
        </h5>
        <p class="b2" v-if="numOfCorrect !== 0">
          ในการเรียงลำดับ<span v-if="numOfCorrect === 3">เหตุการณ์</span>ข่าว
        </p>
        <h5 v-html="resultTextDesc" class="h5 font-bold"></h5>
      </div>
      <div class="flex flex-col space-y-[10px] pb-[15px]" v-else>
        <div>
          <h1 class="h5 font-bold text-2xl text-center">
            คุณจำข่าวในช่วง 2 <br />ปีที่ผ่านมาได้แม่นแค่ไหน
          </h1>
          <p class="b2 font-bold text-[#717070] text-center">
            บอกได้มั้ย ข่าวไหนเกิดก่อน
          </p>
        </div>

        <div class="flex gap-[2px] mx-auto px-7">
          <img src="/image/Frame.svg" alt="" class="w-[33px]" />
          <p class="b4">
            กดที่พาดหัวข่าวด้านล่าง แล้วลากขึ้น-ลง
            เพื่อเรียงลำดับเหตุการณ์ก่อน-หลัง
          </p>
        </div>
      </div>
      <draggable
        v-model="quiz"
        :component-data="{ name: 'fade' }"
        :sort="!isShowAnswer"
        item-key="id"
      >
        <template #item="{ element, index }">
          <div
            class="t5 cream cursor-grab space-y-[15px] relative bg-black w-[256px] p-[10px] mx-auto text-pretty mb-4 hover:bg-[#FF006B] hover:text-[#EBE8DE]"
          >
            <div>
              <p v-if="isShowAnswer" class="b4">
                {{ formatDate(element.date) }}
              </p>
              <p class="font-semibold">{{ element.name }}</p>
            </div>

            <div
              :class="
                isShowAnswer
                  ? element.name === answer[index].name
                    ? 'bg-[#4ADADA]'
                    : 'bg-[#FF3D00]'
                  : 'bg-[#FFF8B5]'
              "
              class="absolute -top-6 -left-2 b4 text-black border rounded-full w-[20px] h-[20px] text-center border-black"
            >
              {{ element.no }}
            </div>
          </div>
        </template>
      </draggable>
      <div v-if="isShowAnswer" class="flex flex-col gap-[20px] pb-[40px]">
        <button
          @click="restartQuiz"
          class="flex gap-2 text-[#FF006B] text-sm border border-b-[#FF006B] w-fit mx-auto"
        >
          <img src="/image/Reset.svg" alt="" />
          เล่นอีกรอบ
        </button>
        <button class="flex flex-col items-center mx-auto">
          <p class="text-[16px] font-bold">เริ่มอ่าน</p>
          <img src="/image/ArrowDown.svg" alt="" class="w-[20px]" />
        </button>
      </div>
      <div v-else class="flex flex-col gap-[20px]">
        <button
          @click="checkAnswer"
          class="b3 bg-[#FFF8B5] border border-black px-[20px] py-[10px] w-[200px] h-[40px] mx-auto"
        >
          ส่งคำตอบ
        </button>
        <button
          @click="showContent"
          class="b3 text-[#FF006B] text-sm border border-b-[#FF006B] w-fit mx-auto"
        >
          ข้ามไปอ่านเนื้อหา
        </button>
      </div>
    </div>
    <div id="intro" class="text-center" v-show="isShowContent">
      <img src="/image/Head.svg" alt="" class="w-full" />
      <div class="px-[16px] py-[40px] text-pretty space-y-[20px]">
        <div class="b3">
          <p>
            เนื้อหาข่าวจาก
            <span class="font-bold">สื่อกระแสหลัก</span
            >ยังคงเป็นแหล่งข้อมูลสำคัญที่ทำให้คนไทยรับรู้เรื่องราวปัญหาบ้านเมือง
          </p>
          <p class="pt-4">
            งานศึกษา Reuters Institute Digital News Report 2023
          </p>
          <p>
            ชี้ให้เห็นว่าคนไทยเสพข่าวสารจาก<span
              class="text-[#5773DC] font-bold"
              >สื่อข่าวออนไลน์</span
            >
            มากเป็นอันดับแรก (รวมถึงข่าวสารจาก Social Media) โดย 88%
            ของผู้ตอบแบบสอบถามทั้งหมดให้ความเชื่อมั่นและบริโภคข่าวจากสื่อข่าวออนไลน
          </p>
          <p class="pt-4">
            ในขณะที่ช่องทาง<span class="font-bold">สื่อโทรทัศน์</span
            >ถูกอ้างอิงเป็นแหล่งที่มาของข่าวแค่ 50% ของจำนวนผู้ตอบแบบสอบถาม
          </p>
        </div>
        <img src="/image/Media.svg" alt="" class="h-[110px] px-[28px]" />
        <div class="b3 space-y-[20px]">
          <div>
            <p>
              สื่อข่าวออนไลน์จึงเป็นแพลตฟอร์มยอดฮิตที่คนไทยใช้เข้าถึงข้อมูลข่าวสาร
            </p>
            <p>
              โดยในเนื้อหาจะมี<span class="font-bold">พาดหัวข่าว</span
              >เป็นบทนำในการเล่าเรื่องราวให้ผู้อ่านข่าวรับทราบ
            </p>
          </div>
          <p>
            เมื่อชีวิตติดคอนเทนต์ เราขอชวนคุณมาสำรวจ คอนเทนต์
            <span class="font-bold">‘พาดหัวข่าว’</span>
            บนเว็บไซต์ข่าวออนไลน์ไทย เพื่อหาคำตอบว่า
          </p>
        </div>
        <h3 class="b2 font-bold">
          2 ปีมานี้ ‘พาดหัวข่าว’ <br />เล่าอะไรให้คนไทยฟังบ้าง?
        </h3>

        <div
          class="relative border-[2px] border-[#C5C4C4] px-[10px] py-[15px] space-y-[10px]"
        >
          <p class="b3 font-bold text-[#717070]">ที่มาและข้อจำกัดของข้อมูล</p>
          <p class="b4">
            ข้อมูลที่ใช้พัฒนางานชิ้นนี้ไม่ได้ครอบคลุมข่าวทั้งหมดในประเทศไทย
            แต่เลือกมา 5 สำนักข่าว จากทั้งหมด xx
            สำนักข่าวที่ถูกจัดอันดับด้วยความน่าเชื่อถือของ Reuters Institute for
            the Study of Journalism ในปี 2023 ประกอบด้วย
          </p>
          <div class="grid grid-cols-2 px-[40px]">
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
          <button
            @click="showRefPopup"
            class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto mt-[20px]"
          >
            อ่านรายละเอียดเพิ่มเติม
          </button>
          <img
            src="/image/Warning.svg"
            alt=""
            class="absolute -top-6 right-[50%] transform translate-x-[50%]"
          />
        </div>

        <p class="b3 font-bold">
          หากพร้อมแล้ว คลิกเพื่อสำรวจเนื้อหา <br />‘พาดหัวข่าว’ ที่คุณสนใจ
        </p>
        <div class="flex flex-col gap-[20px]">
          <NuxtLink to="/part1">
            <button class="">
              <div
                class="flex flex-col border-[2px] border-black hover:border-[#FF006B] bg-[#FFF8B5] p-[20px] gap-[5px]"
              >
                <h1 class="t3 font-black">
                  ..‘พาดหัวข่าว’<br />
                  เล่าเรื่อง..
                </h1>
                <h2 class="h5 font-bold">คนไทยได้เจอข่าวอะไรมากที่สุด ?</h2>
                <p class="b2">
                  สำรวจเทรนด์ข่าวรายเดือน<br />
                  พร้อมคีย์เวิร์ดที่ปรากฏบ่อยในช่วง 2 ปี
                </p>
                <p
                  class="text-[#FF006B] b3 flex gap-1 items-center justify-center"
                >
                  อ่านต่อ
                  <img src="/image/ArrowRight.svg" alt="" />
                </p>
              </div></button
          ></NuxtLink>
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
        </div>
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
        <p class="b3 px-[16px] pb-[40px]">
          หากมีข้อสงสัยหรือคำแนะนำเพิ่มเติมใดๆ เกี่ยวกับงานนี้
          ทักมาหาพวกเราได้ที่
          <a href="" class="text-[#FF006B] font-bold">m.me/punchupworld</a>
        </p>
      </div>
    </div>
    <!-- <div id="ref" class="bg-[#E3DFCF] p-[15px] text-center" v-if="isShowAnswer">
      <div class="border border-b-[#C5C4C4]">
        <h1 class="text-[21px] font-bold" ref="reference">
          ที่มาและข้อจำกัดของข้อมูล
        </h1>
        <p>
          ข้อมูลที่ใช้พัฒนางานชิ้นนี้
          ทีมงานได้เก็บรวบรวมจากเว็บไซต์สำนักข่าวในประเทศไทยที่น่าเชื่อถือและมีผู้ใช้งานจำนวนมาก
          จากการจัดอันดับของ Reuters Institute for the Study of Journalism ในปี
          2023
          และมีการจัดโครงสร้างเว็บไซต์ที่เป็นระบบที่ทำให้สามารถเก็บรวบรวมข้อมูลได้
          ข้อมูลในงานชิ้นนี้ จึงไม่ได้ครอบคลุมข่าวทั้งหมดที่มีในประเทศไทย
          แต่มาจาก 5 เว็บไซต์ข่าวออนไลน์ที่สำคัญ
        </p>
      </div>

      <h2>สัดส่วนข่าวจากแต่ละสำนัก</h2>
      <p>
        เนื่องจากแต่ละสำนักข่าวมีจำนวนข่าวที่ไม่เท่ากัน
        จึงทำให้เทรนด์ที่พบในงานนี้ได้รับอิทธิพลจากสำนักข่าวที่มีจำนวนข่าวเยอะเป็นพิเศษ
      </p>
      <div class="flex flex-col items-center border border-b-[#C5C4C4]">
        <img src="/image/NewsAgency.svg" alt="" />
        <ul>
          <li>ไทยรัฐ ออนไลน์ <span>55.8%</span></li>
          <li>The Standard <span>55.8%</span></li>
          <li>Thai PBS <span>55.8%</span></li>
          <li>Voice TV <span>55.8%</span></li>
          <li>WorkpointTODAY<span>55.8%</span></li>
        </ul>
      </div>
      <h2 class="text-[16px] font-bold">หมวดข่าวจากแต่ละสำนัก</h2>
      <p class="leading-[19.6px]">
        จากประเภทข่าวที่แต่ละสำนักข่าวได้แบ่งไว้เป็นหมวดหมู่
        เราได้รวบรวมและจำแนกหมวดหมู่ประเภทข่าวให้ใหม่ เป็น 9 ประเภทข่าว
        เพื่อความสะดวกในการศึกษาและง่ายต่อการนำเสนอข้อมูล
        โดยเราไม่ได้หยิบใช้ข่าวในบางหมวดหมู่
        เนื่องด้วยจำนวนข่าวที่มีไม่มากและไม่มีส่วนเกียวข้องกับหมวดหมู่หลัก
      </p>
      <div class="flex justify-center gap-2">
        <div
          class="flex flex-col items-center font-bold border border-r-black pr-2 fix"
        >
          <h3 class="h-[50px] text-[14px]">หมวดร่วม</h3>
          <div class="group">
            <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
            <div class="block_categry">สังคมไทย</div>
            <div class="block_categry">เศรษฐกิจ/การเงิน</div>
            <div class="block_categry">ต่างประเทศ</div>
            <div class="block_categry">บันเทิง</div>
            <div class="block_categry">อาชญกรรม</div>
            <div class="block_categry">กีฬา</div>
            <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
            <div class="block_categry">สิ่งแวดล้อม</div>
            <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
          </div>
        </div>
        <div class="flex gap-2 overflow-x-auto scroll-smooth scroll-content">
          <div class="flex flex-col items-center">
            <img src="/image/Thairath.svg" alt="" />
            <div>
              <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
              <div class="block_categry">ในกระแส</div>
              <div class="block_categry">ทั่วไทย</div>
              <div class="block_categry">ต่างประเทศ</div>
              <div class="block_categry">บันเทิง</div>
              <div class="block_categry">อาชญกรรม</div>
              <div class="block_categry">กีฬา</div>
              <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
              <div class="block_categry">สิ่งแวดล้อม</div>
              <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img src="/image/Today.svg" alt="" />
            <div>
              <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
              <div class="block_categry">ในกระแส</div>
              <div class="block_categry">ทั่วไทย</div>
              <div class="block_categry">ต่างประเทศ</div>
              <div class="block_categry">บันเทิง</div>
              <div class="block_categry">อาชญกรรม</div>
              <div class="block_categry">กีฬา</div>
              <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
              <div class="block_categry">สิ่งแวดล้อม</div>
              <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img src="/image/ThaiPBS.svg" alt="" />
            <div>
              <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
              <div class="block_categry">ในกระแส</div>
              <div class="block_categry">ทั่วไทย</div>
              <div class="block_categry">ต่างประเทศ</div>
              <div class="block_categry">บันเทิง</div>
              <div class="block_categry">อาชญกรรม</div>
              <div class="block_categry">กีฬา</div>
              <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
              <div class="block_categry">สิ่งแวดล้อม</div>
              <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img src="/image/Standard.svg" alt="" />
            <div>
              <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
              <div class="block_categry">ในกระแส</div>
              <div class="block_categry">ทั่วไทย</div>
              <div class="block_categry">ต่างประเทศ</div>
              <div class="block_categry">บันเทิง</div>
              <div class="block_categry">อาชญกรรม</div>
              <div class="block_categry">กีฬา</div>
              <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
              <div class="block_categry">สิ่งแวดล้อม</div>
              <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img src="/image/VOICE.svg" alt="" />
            <div>
              <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
              <div class="block_categry">ในกระแส</div>
              <div class="block_categry">ทั่วไทย</div>
              <div class="block_categry">ต่างประเทศ</div>
              <div class="block_categry">บันเทิง</div>
              <div class="block_categry">อาชญกรรม</div>
              <div class="block_categry">กีฬา</div>
              <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
              <div class="block_categry">สิ่งแวดล้อม</div>
              <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
            </div>
          </div>
        </div>
      </div>
      <p>
        หากมีข้อสงสัยหรือคำแนะนำเพิ่มเติมใดๆ เกี่ยวกับงานนี้ ทักมาหาพวกเราได้ที่
        m.me/punchupworld
      </p>
    </div> -->
  </div>
</template>

<style scoped>
.group {
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
</style>

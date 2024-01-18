<script setup>
import draggable from "vuedraggable"

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

const answer = [3, 1, 2]
const isShowAnswer = ref(false)
const resultTextHead = ref("")
const resultTextDesc = ref()
const numOfCorrect = ref(0)
const isShowContent = ref(false)
const isShowQuiz = ref(true)
const isShowRefPopup = ref(false)

const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value
}
const showContent = () => {
  isShowContent.value = true
  isShowQuiz.value = false
}
const checkAnswer = () => {
  const result = myArray.value.map((item) => item.id)
  numOfCorrect.value = answer.filter(
    (item, index) => item === result[index]
  ).length
  console.log(numOfCorrect.value)
  if (numOfCorrect.value === 3) {
    resultTextHead.value =
      "คุณมีความแม่นยำถึง" + (numOfCorrect.value * 100) / answer.length + "%"
    resultTextDesc.value = `คุณคือนักอ่านข่าวตัวยง<br/> และอาจชอบงานชิ้นนี้ของเรา`
  } else if (numOfCorrect.value === 0) {
    resultTextHead.value = "คุณเรียงผิดหมดเลย"
    resultTextDesc.value = `จำเป็นต้องอ่านงานเราอย่างยิ่ง !`
  } else {
    resultTextHead.value =
      "คุณมีความแม่นยำแค่" +
      ((numOfCorrect.value * 100) / answer.length).toFixed(2) +
      "%"
    resultTextDesc.value = `จำเป็นต้องอ่านงานเราอย่างยิ่ง !`
  }
  isShowAnswer.value = true
  isShowContent.value = true
  console.log(isShowAnswer.value)
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

const restartQuiz = () => {
  isShowAnswer.value = false
  isShowContent.value = false
  // myArray.value = myArray.value.sort(() => Math.random() - 0.5)
}

const reference = ref(null)
const scrollToReference = () => {
  reference.value.scrollIntoView({ behavior: "smooth" })
}
watchEffect(() => {
  // console.log(myArray.value)
})
</script>

<template>
  <div class="max-w-screen-sm bg-[#EBE8DE] flex flex-col justify-center h-full">
    <div
      id="refPopup"
      class="fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-10 p-3"
      v-show="isShowRefPopup"
    >
      <div class="relative bg-white w-full h-[335px] p-1">
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
            <div class="grid grid-cols-2 py-5">
              <div>
                <ol class="b4 font-bold text-start">
                  <li>1. ไทยรัฐ ออนไลน์</li>
                  <li>2. The Standard</li>
                  <li>3. Thai PBS</li>
                  <li>4. Voice TV</li>
                  <li>5. WorkpointTODAY</li>
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
          <h2 class="b2 font-bold">หมวดข่าวจากแต่ละสำนัก</h2>
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
                <div class="block_categry">หมวดอื่นๆที่ไม่ได้ใช้</div>
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
                  <div class="block_categry">ยานยนต์</div>
                  <div class="block_categry">พระราชสำนัก</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/Today.svg" alt="" />
                <div class="group">
                  <div class="block_categry bg-vermillion">การเมื่อง</div>
                  <div class="block_categry">เศรษฐกิจ</div>
                  <div class="block_categry">การเงิน</div>
                  <div class="block_categry">กีฬา</div>
                  <div class="block_categry">Tech</div>
                  <div class="block_categry">สิ่งแวดล้อม</div>
                  <div class="block_categry">สิทธิมนุษยชน</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/ThaiPBS.svg" alt="" />
                <div class="group">
                  <div class="block_categry bg-vermillion">การเมื่อง</div>
                  <div class="block_categry">สังคม</div>
                  <div class="block_categry">ภูมิภาค</div>
                  <div class="block_categry">เศรษฐกิจ</div>
                  <div class="block_categry">ต่างประเทศ</div>
                  <div class="block_categry">ศิลปะ-บันเทิง</div>
                  <div class="block_categry">อาชญกรรม</div>
                  <div class="block_categry">กีฬา</div>
                  <div class="block_categry">วิทยาศาสตร์/เทคโนโลยี</div>
                  <div class="block_categry">สิ่งแวดล้อม</div>
                  <div class="block_categry">ภัยพิบัติ</div>
                  <div class="block_categry">พระราชสำนัก</div>
                  <div class="block_categry">ไลฟ์สไตล์</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/Standard.svg" alt="" />
                <div class="group">
                  <div class="block_categry bg-[#FF3D00]">Politics</div>
                  <div class="block_categry">Thailand</div>
                  <div class="block_categry">Business</div>
                  <div class="block_categry">World</div>
                  <div class="block_categry">China</div>
                  <div class="block_categry">Sport</div>
                  <div class="block_categry">Science</div>
                  <div class="block_categry">Tech</div>
                  <div class="block_categry">Environment</div>
                  <div class="block_categry">LGBTQ+</div>
                  <div class="block_categry">On this day</div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img src="/image/VOICE.svg" alt="" />
                <div class="group">
                  <div class="block_categry bg-[#FF3D00]">การเมื่อง</div>
                  <div class="block_categry">เศรษฐกิจ</div>
                  <div class="block_categry">ต่างประเทศ</div>
                  <div class="block_categry">บันเทิง</div>
                  <div class="block_categry">คุณภาพชีวิต</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="quiz" class="flex flex-col p-3 h-screen pt-10" v-show="isShowQuiz">
      <div class="text-center space-y-[5px]" v-if="isShowAnswer">
        <h5
          :class="numOfCorrect === 0 ? 'bg-[#FF3D00]' : 'bg-[#4ADADA]'"
          class="h5 font-bold mx-auto w-fit"
        >
          {{ resultTextHead }}
        </h5>
        <p class="b2" v-if="numOfCorrect !== 0">ในการเรียงลำดับเหตุการณ์ข่าว</p>
        <h5 v-html="resultTextDesc" class="h5 font-bold pb-5"></h5>
      </div>
      <div class="flex flex-col p-5 space-y-2" v-else>
        <h1 class="h5 font-bold text-2xl text-center">
          คุณจำเหตุการณ์ข่าวในช่วง 2 ปีที่ผ่านมาได้แม่นแค่ไหน
        </h1>
        <p class="b2 font-bold text-[#717070] text-center pb-4">
          บอกได้มั้ย พาดหัวข่าวไหนเกิดก่อน
        </p>
        <div class="flex gap-2 mx-auto">
          <img src="/image/Frame.svg" alt="" class="h-[35px]" />
          <p class="b4">
            กดที่การ์ด แล้วลากขึ้น-ลง<br />
            เพื่อเรียงลำดับเหตุการณ์ก่อน-หลัง
          </p>
        </div>
      </div>
      <draggable
        v-model="myArray"
        :component-data="{ name: 'fade' }"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element, index }">
          <div
            class="t5 cream cursor-grab space-y-[15px] relative bg-black w-[256px] p-3 mx-auto text-pretty mb-4 hover:bg-[#FF006B] hover:text-[#EBE8DE]"
          >
            <p v-if="isShowAnswer" class="b4">
              {{ formatDate(element.date) }}
            </p>
            <p class="font-semibold">{{ element.name }}</p>
            <div
              :class="
                isShowAnswer
                  ? element.id === answer[index]
                    ? 'bg-[#4ADADA]'
                    : 'bg-[#FF3D00]'
                  : 'bg-[#FFF8B5]'
              "
              class="absolute -top-6 -left-2 text-xs text-black border rounded-full w-5 h-5 text-center border-black"
            >
              {{ element.id }}
            </div>
          </div>
        </template>
      </draggable>
      <div v-if="isShowAnswer">
        <button
          @click="restartQuiz"
          class="flex gap-2 text-[#FF006B] text-sm border border-b-[#FF006B] w-fit mx-auto"
        >
          <img src="/image/Reset.svg" alt="" />
          เล่นอีกรอบ
        </button>
        <button class="flex flex-col items-center mx-auto my-[20px]">
          <p class="text-[16px] font-bold">เริ่มอ่าน</p>
          <img src="/image/ArrowDown.svg" alt="" class="w-[20px]" />
        </button>
      </div>
      <div v-else class="flex flex-col">
        <button
          @click="checkAnswer"
          class="b3 bg-[#FFF8B5] border border-black text-sm px-[20px] py-[10px] w-[200px] h-[40px] mx-auto"
        >
          ส่งคำตอบ
        </button>
        <button
          @click="showContent"
          class="b3 text-[#FF006B] text-sm border border-b-[#FF006B] w-fit mx-auto mt-[20px]"
        >
          ข้ามไปอ่านเนื้อหา
        </button>
      </div>
    </div>
    <div id="intro" class="text-center" v-show="isShowContent">
      <img src="/image/Head.svg" alt="" class="w-full" />
      <div class="b3 p-2 text-pretty">
        <p>
          เนื้อหาข่าวจาก
          <span class="font-bold">สื่อกระแสหลัก</span
          >ยังคงเป็นแหล่งข้อมูลสำคัญที่ทำให้คนไทยรับรู้เรื่องราวปัญหาบ้านเมือง
        </p>
        <p class="pt-4">งานศึกษา Reuters Institute Digital News Report 2023</p>
        <p>
          ชี้ให้เห็นว่าคนไทยเสพข่าวสารจาก<span class="text-[#5773DC] font-bold"
            >สื่อข่าวออนไลน์</span
          >
          มากเป็นอันดับแรก (รวมถึงข่าวสารจาก Social Media) โดย 88%
          ของผู้ตอบแบบสอบถามทั้งหมดให้ความเชื่อมั่นและบริโภคข่าวจากสื่อข่าวออนไลน
        </p>
        <p class="pt-4">
          ในขณะที่ช่องทาง<span class="font-bold">สื่อโทรทัศน์</span
          >ถูกอ้างอิงเป็นแหล่งที่มาของข่าวแค่ 50% ของจำนวนผู้ตอบแบบสอบถาม
        </p>
        <img src="/image/Media.svg" alt="" class="h-[110px] my-4 mx-auto" />
        <p>
          สื่อข่าวออนไลน์จึงเป็นแพลตฟอร์มยอดฮิตที่คนไทยใช้เข้าถึงข้อมูลข่าวสาร
        </p>
        <p>
          โดยในเนื้อหาจะมี<span class="font-bold">พาดหัวข่าว</span
          >เป็นบทนำในการเล่าเรื่องราวให้ผู้อ่านข่าวรับทราบ
        </p>
        <p class="pt-4">
          เมื่อชีวิตติดคอนเทนต์ เราขอชวนคุณมาสำรวจ คอนเทนต์
          <span class="font-bold">‘พาดหัวข่าว’</span>
          บนเว็บไซต์ข่าวออนไลน์ไทย เพื่อหาคำตอบว่า
        </p>

        <p>หากพร้อมแล้ว คลิกเพื่อสำรวจเนื้อหา ‘พาดหัวข่าว’ ที่คุณสนใจ</p>
      </div>
      <h3 class="b2 text-[16px] font-bold pt-5">
        2 ปีมานี้ ‘พาดหัวข่าว’ <br />เล่าอะไรให้คนไทยฟังบ้าง?
      </h3>
      <div class="relative border-[2px] border-[#C5C4C4] m-3 p-4 space-y-3">
        <p class="b3 font-bold text-[#717070]">ที่มาและข้อจำกัดของข้อมูล</p>
        <p class="b4">
          ข้อมูลที่ใช้พัฒนางานชิ้นนี้ไม่ได้ครอบคลุมข่าวทั้งหมดในประเทศไทย
          แต่เลือกมา 5 สำนักข่าว จากทั้งหมด xx
          สำนักข่าวที่ถูกจัดอันดับด้วยความน่าเชื่อถือของ Reuters Institute for
          the Study of Journalism ในปี 2023 ประกอบด้วย
        </p>
        <div class="grid grid-cols-2">
          <div>
            <ul class="b4 font-bold">
              <li>ไทยรัฐ ออนไลน์</li>
              <li>The Standard</li>
              <li>Thai PBS</li>
              <li>Voice TV</li>
              <li>WorkpointTODAY</li>
            </ul>
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
          class="absolute -top-6 left-1/2 right-1/2"
        />
      </div>

      <p class="b3 font-bold">
        หากพร้อมแล้ว คลิกเพื่อสำรวจเนื้อหา <br />‘พาดหัวข่าว’ ที่คุณสนใจ
      </p>
      <NuxtLink to="/">
        <button class="w-full max-w-screen-sm">
          <div
            class="flex flex-col m-[12px] border-[2px] border-black hover:border-[#FF006B] bg-[#FFF8B5] p-[20px] gap-[5px]"
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
            <p class="text-[#FF006B] b3 flex gap-1 items-center justify-center">
              อ่านต่อ
              <img src="/image/ArrowRight.svg" alt="" />
            </p>
          </div></button
      ></NuxtLink>
      <NuxtLink to="/">
        <button class="">
          <div
            class="flex flex-col m-[12px] border-[2px] border-black hover:border-[#FF006B] bg-[#FFF8B5] p-[20px] gap-[5px]"
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
            <p class="text-[#FF006B] b3 flex gap-1 items-center justify-center">
              อ่านต่อ
              <img src="/image/ArrowRight.svg" alt="" />
            </p>
          </div></button
      ></NuxtLink>
      <!-- <button
        @click="scrollToReference"
        class="text-[#FF006B] text-sm border border-b-[#FF006B] w-fit mx-auto mt-[20px]"
      >
        อ่านที่มาและข้อจำกัดของข้อมูล
      </button> -->
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
      <p class="b3 p-8 py-10">
        หากมีข้อสงสัยหรือคำแนะนำเพิ่มเติมใดๆ เกี่ยวกับงานนี้ ทักมาหาพวกเราได้ที่
        <a href="" class="text-[#FF006B] font-bold">m.me/punchupworld</a>
      </p>
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
.block_categry {
  border-collapse: collapse;
  padding-left: 2px;
  padding-right: 2px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

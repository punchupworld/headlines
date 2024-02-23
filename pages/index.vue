<script setup>
import draggable from "vuedraggable";
import { Vue3Lottie } from "vue3-lottie";
import lottie_intro from "public/lottie/lottie-0.json";
import { vOnClickOutside } from "@vueuse/components";
const isShowAnswer = ref(false);
const resultTextHead = ref("");
const resultTextDesc = ref();
const numOfCorrect = ref(0);
const isShowContent = ref(false);
const isShowQuiz = ref(true);
const isShowRefPopup = ref(false);
const quizData = ref([]);
const reference = ref(null);
const quizSet = ref(1);
const quiz = ref([]);
const intro = ref(null);

const scrollToSelection = () => {
  intro.value.scrollIntoView({ behavior: "smooth" });
};

const showRefPopup = () => {
  isShowRefPopup.value = !isShowRefPopup.value;
};
const showContent = () => {
  isShowContent.value = true;
  isShowQuiz.value = false;
};

const answer = computed(() => {
  return [...quiz.value].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
});

const beforeAnswer = ref([]);

const checkAnswer = () => {
  beforeAnswer.value = [...quiz.value];
  const addFieldToObject = (obj, fieldName, fieldValue) => {
    obj[fieldName] = fieldValue;
  };
  quiz.value.forEach((item, index) => {
    addFieldToObject(item, "index", index + 1);
  });
  numOfCorrect.value = quiz.value.filter((item, index) => {
    return item.name === answer.value[index].name;
  }).length;
  if (numOfCorrect.value === 3) {
    resultTextHead.value =
      "คุณมีความแม่นยำถึง " +
      (numOfCorrect.value * 100) / answer.value.length +
      "%";
    resultTextDesc.value = `คุณคือนักอ่านข่าวตัวยง ! <br/> และอาจชอบงานชิ้นนี้ของเรา`;
  } else if (numOfCorrect.value === 0) {
    resultTextHead.value = "คุณเรียงลำดับข่าวผิดหมดเลย";
    resultTextDesc.value = `จำเป็นต้องอ่านงานเราอย่างยิ่ง !`;
  } else {
    resultTextHead.value =
      "คุณมีความแม่นยำแค่ " +
      Math.floor((numOfCorrect.value * 100) / answer.value.length) +
      "%";
    resultTextDesc.value = `จำเป็นต้องอ่านงานเราอย่างยิ่ง !`;
  }

  quiz.value = [...quiz.value].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  isShowAnswer.value = true;
  isShowContent.value = true;
};

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
  ];
  const dateObject = new Date(inputDate);
  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear() % 100;
  return `${day} ${months[monthIndex]} ${year}`;
};
const setQuiz = async () => {
  if (quizSet.value !== 10) {
    quiz.value = quizData.value.filter(
      (item) => parseInt(item.id) === parseInt(quizSet.value)
    );
    quizSet.value++;
  } else {
    quizSet.value = 1;
    quiz.value = quizData.value.filter(
      (item) => parseInt(item.id) === parseInt(quizSet.value)
    );
  }
  quiz.value = quiz.value.sort(() => Math.random() - 0.5);
};
const restartQuiz = async () => {
  isShowAnswer.value = false;
  isShowContent.value = false;
  await setQuiz();
};

const fetchData = async () => {
  try {
    const response = await fetch("/data/quiz.csv");
    const csvText = await response.text();
    const rows = csvText.split("\n").map((line) => {
      const [id, name, link, date] = line.split(",");
      return { id, name, link, date };
    });
    quizData.value = rows;
    setQuiz();
  } catch (error) {
    console.error("Error fetching CSV data:", error);
  }
};

const bgLoopIndex = ref(0);
const bgColor = [
  "bg-vermillion",
  "bg-lightblue",
  "bg-orange",
  "bg-rose",
  "bg-pink",
  "bg-brown",
  "bg-purple",
  "bg-blue",
  "bg-green",
];
const startLoop = () => {
  setInterval(() => {
    bgLoopIndex.value = (bgLoopIndex.value + 1) % bgColor.length;
  }, 1000);
};

const blockCategryStyle =
  "border-x border-black border-t-[1px] p-[10px] text-center  flex items-center justify-center";

const website = useWebsiteStore();

onMounted(() => {
  fetchData();
  startLoop();
  quizSet.value = 1;

  if (website.answer) {
    isShowQuiz.value = false;
    isShowContent.value = true;
  }
});

const closeModal = () => {
  isShowRefPopup.value = false;
};
</script>

<template>
  <div
    class="max-w-screen-sm md:max-w-full !bg-[#EBE8DE] flex flex-col justify-center"
  >
    <div
      id="refPopup"
      class="max-w-screen-sm md:max-w-full fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-10 p-3 text-balance"
      v-show="isShowRefPopup"
    >
      <div
        v-on-click-outside="closeModal"
        id="popUpScroll"
        class="relative bg-white w-[90vw] max-w-[900px] h-[80vh] p-1"
      >
        <img
          @click="showRefPopup"
          src="/image/CanclePink.svg"
          alt="CanclePink"
          class="absolute -top-2 -right-2 cursor-pointer"
        />
        <div
          id="ref"
          class="p-[20px] lg:p-[40px] text-center overflow-y-auto h-full"
        >
          <div class="pb-5">
            <h1 class="h5 font-bold pb-[20px]" ref="reference">
              ที่มาและข้อจำกัดของข้อมูล
            </h1>
            <p class="b3">
              ข้อมูลที่ใช้พัฒนางานชิ้นนี้
              ทีมงานได้เก็บรวบรวมจากเว็บไซต์สำนักข่าวในประเทศไทยที่น่าเชื่อถือและมีผู้ใช้งานจำนวนมาก
              จากการจัดอันดับของ
              <span class="font-bold"
                >Reuters Institute for the Study of Journalism</span
              >
              ในปี 2023 และมีการจัดโครงสร้างเว็บไซต์ที่เป็นระบบ
              ทำให้สามารถเก็บรวบรวมข้อมูลได้ ข้อมูลในงานชิ้นนี้
              จึงไม่ได้ครอบคลุมข่าวทั้งหมดที่มีในประเทศไทย แต่มาจาก 5
              เว็บไซต์ข่าวออนไลน์ที่สำคัญ
            </p>
          </div>

          <h2 class="b2 font-bold py-5 border border-t-[#C5C4C4] border-white">
            สัดส่วนข่าวจากแต่ละสำนัก
          </h2>
          <p class="b3 pb-5 lg:px-[100px]">
            เนื่องจากแต่ละสำนักข่าวมีจำนวนข่าวที่ไม่เท่ากัน
            จึงทำให้เทรนด์ที่พบในงานนี้ได้รับอิทธิพลจากสำนักข่าวที่มีจำนวนข่าวเยอะเป็นพิเศษ
          </p>
          <div class="flex flex-col items-center">
            <img
              src="/image/intro/news_chart_mobile.png"
              alt="news_chart_mobile"
              class="block lg:hidden w-[248px]"
            />
            <img
              src="/image/intro/news_chart_desktop.png"
              alt="news_chart_desktop"
              class="hidden lg:block w-[450px]"
            />
            <div class="flex gap-[5px] py-5 content-center">
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
                <p>21.1 %</p>
                <p>12.3 %</p>
                <p>7.7 %</p>
                <p>3.0 %</p>
              </div>
            </div>
          </div>
          <h2 class="b2 font-bold border border-t-[#C5C4C4] border-white py-5">
            หมวดข่าวจากแต่ละสำนัก
          </h2>
          <p class="b3 leading-[19.6px]">
            สำนักข่าวแต่ละแห่งได้แบ่งการนำเสนอข่าวไว้เป็นหมวดหมู่ที่แตกต่างกัน
            ทีมงานจึงทำการคัดเลือก ตัดทอน และนำมาจำแนกหมวดหมู่ใหม่เป็น 9 ประเภท
            เพื่อการนำเสนอข้อมูลอย่างมีระบบ ทั้งนี้
            อาจมีข่าวบางหมวดหมู่ที่ไม่ได้รวมอยู่ในการวิเคราะห์ข้อมูลครั้งนี้
          </p>
          <div class="flex justify-center gap-[5px] py-[20px]">
            <div
              class="flex flex-col items-center font-bold border border-r-black border-white pr-[5px] b4"
            >
              <h3 class="h-[50px] b3 flex items-center">หมวดร่วม</h3>
              <div class="group">
                <div :class="blockCategryStyle" class="bg-vermillion">
                  การเมือง
                </div>
                <div :class="blockCategryStyle" class="bg-lightblue">
                  สังคมไทย
                </div>
                <div :class="blockCategryStyle" class="bg-orange">
                  เศรษฐกิจ/การเงิน
                </div>
                <div :class="blockCategryStyle" class="bg-rose">ต่างประเทศ</div>
                <div :class="blockCategryStyle" class="bg-pink">บันเทิง</div>
                <div :class="blockCategryStyle" class="bg-brown">อาชญกรรม</div>
                <div :class="blockCategryStyle" class="bg-purple">กีฬา</div>
                <div :class="blockCategryStyle" class="bg-blue">
                  วิทยาศาสตร์/เทคโนโลยี
                </div>
                <div :class="blockCategryStyle" class="border-b-[1px] bg-green">
                  สิ่งแวดล้อม
                </div>
                <div
                  :class="blockCategryStyle"
                  class="not-use border-b-[1px] !border-[#C5C4C4]"
                >
                  หมวดอื่นๆที่ไม่ได้ใช้
                </div>
              </div>
            </div>
            <div
              class="relative flex gap-2 overflow-x-auto overflow-y-hidden scroll-smooth scroll-content b4"
            >
              <div class="flex flex-col items-center">
                <img
                  src="/image/intro/news_logo/Thairath.png"
                  alt="Thairath"
                  class="w-[50px]"
                />
                <div class="group">
                  <div :class="blockCategryStyle" class="bg-vermillion">
                    การเมือง
                  </div>
                  <div :class="blockCategryStyle" class="bg-lightblue">
                    ในกระแส
                  </div>
                  <div :class="blockCategryStyle" class="bg-lightblue">
                    ทั่วไทย
                  </div>
                  <div :class="blockCategryStyle" class="bg-orange">money</div>
                  <div :class="blockCategryStyle" class="bg-rose">
                    ต่างประเทศ
                  </div>
                  <div :class="blockCategryStyle" class="bg-pink">บันเทิง</div>
                  <div :class="blockCategryStyle" class="bg-brown">
                    อาชญกรรม
                  </div>
                  <div :class="blockCategryStyle" class="bg-blue">
                    เทคโนโลยี
                  </div>
                  <div
                    :class="blockCategryStyle"
                    class="border-b-[1px] bg-green"
                  >
                    ความยั่งยืน
                  </div>
                  <div :class="blockCategryStyle" class="not-use">ยานยนต์</div>
                  <div
                    :class="blockCategryStyle"
                    class="not-use border-b-[1px] !border-[#C5C4C4]"
                  >
                    พระราชสำนัก
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img
                  src="/image/intro/news_logo/TODAY.png"
                  alt="TODAY"
                  class="w-[50px]"
                />
                <div class="group">
                  <div :class="blockCategryStyle" class="bg-vermillion">
                    การเมือง
                  </div>
                  <div :class="blockCategryStyle" class="bg-orange">
                    เศรษฐกิจ
                  </div>
                  <div :class="blockCategryStyle" class="bg-orange">
                    การเงิน
                  </div>
                  <div :class="blockCategryStyle" class="bg-purple">กีฬา</div>
                  <div :class="blockCategryStyle" class="bg-blue">Tech</div>
                  <div
                    :class="blockCategryStyle"
                    class="border-b-[1px] bg-green"
                  >
                    สิ่งแวดล้อม
                  </div>
                  <div
                    :class="blockCategryStyle"
                    class="not-use border-b-[1px] !border-[#C5C4C4]"
                  >
                    สิทธิมนุษยชน
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img
                  src="/image/intro/news_logo/ThaiPBS.png"
                  alt="ThaiPBS"
                  class="w-[50px]"
                />
                <div class="group">
                  <div :class="blockCategryStyle" class="bg-vermillion">
                    การเมือง
                  </div>
                  <div :class="blockCategryStyle" class="bg-lightblue">
                    สังคม
                  </div>
                  <div :class="blockCategryStyle" class="bg-lightblue">
                    ภูมิภาค
                  </div>
                  <div :class="blockCategryStyle" class="bg-orange">
                    เศรษฐกิจ
                  </div>
                  <div :class="blockCategryStyle" class="bg-rose">
                    ต่างประเทศ
                  </div>
                  <div :class="blockCategryStyle" class="bg-pink">
                    ศิลปะ-บันเทิง
                  </div>
                  <div :class="blockCategryStyle" class="bg-brown">
                    อาชญกรรม
                  </div>
                  <div :class="blockCategryStyle" class="bg-purple">กีฬา</div>
                  <div :class="blockCategryStyle" class="bg-blue">
                    วิทยาศาสตร์/เทคโนโลยี
                  </div>
                  <div :class="blockCategryStyle" class="bg-green">
                    สิ่งแวดล้อม
                  </div>
                  <div
                    :class="blockCategryStyle"
                    class="border-b-[1px] bg-green"
                  >
                    ภัยพิบัติ
                  </div>
                  <div :class="blockCategryStyle" class="not-use">
                    พระราชสำนัก
                  </div>
                  <div
                    :class="blockCategryStyle"
                    class="not-use border-b-[1px] !border-[#C5C4C4]"
                  >
                    ไลฟ์สไตล์
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img
                  src="/image/intro/news_logo/THESTANDARD.png"
                  alt="THESTANDARD"
                  class="w-[50px]"
                />
                <div class="group">
                  <div :class="blockCategryStyle" class="bg-vermillion">
                    Politics
                  </div>
                  <div :class="blockCategryStyle" class="bg-lightblue">
                    Thailand
                  </div>
                  <div :class="blockCategryStyle" class="bg-orange">
                    Business
                  </div>
                  <div :class="blockCategryStyle" class="bg-rose">World</div>
                  <div :class="blockCategryStyle" class="bg-rose">China</div>
                  <div :class="blockCategryStyle" class="bg-purple">Sport</div>
                  <div :class="blockCategryStyle" class="bg-blue">Science</div>
                  <div :class="blockCategryStyle" class="bg-blue">Tech</div>
                  <div
                    :class="blockCategryStyle"
                    class="border-b-[1px] bg-green"
                  >
                    Environment
                  </div>
                  <div :class="blockCategryStyle" class="not-use">LGBTQ+</div>
                  <div
                    :class="blockCategryStyle"
                    class="not-use border-b-[1px] !border-[#C5C4C4]"
                  >
                    On this day
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-center">
                <img
                  src="/image/intro/news_logo/VoiceTV.png"
                  alt="VoiceTV"
                  class="w-[50px]"
                />
                <div class="group">
                  <div :class="blockCategryStyle" class="bg-vermillion">
                    การเมือง
                  </div>
                  <div :class="blockCategryStyle" class="bg-orange">
                    เศรษฐกิจ
                  </div>
                  <div :class="blockCategryStyle" class="bg-rose">
                    ต่างประเทศ
                  </div>
                  <div
                    :class="blockCategryStyle"
                    class="border-b-[1px] bg-pink"
                  >
                    บันเทิง
                  </div>
                  <div
                    :class="blockCategryStyle"
                    class="not-use border-b-[1px] !border-[#C5C4C4]"
                  >
                    คุณภาพชีวิต
                  </div>
                </div>
              </div>
              <div
                class="absolute bottom-5 lg:left-1/3 left-10 flex gap-[2px] justify-center items-center p-[10px] text-[#717070]"
              >
                <img src="/image/intro/SlideIcon.svg" alt="SlideIcon" />
                <p>เลื่อน</p>
              </div>
            </div>
          </div>
          <div class="border-[#C5C4C4] border-t pt-[20px] mt-[20px]">
            <h2 class="b2 font-bold pb-[5px]">
              วิธีที่ใช้ดึงข้อมูลจากเว็บไซต์ข่าว
            </h2>
            <p class="b3">
              ข้อมูลที่ใช้ในงานมาจากการดึงข้อมูล (data scraping)
              บนเว็บไซต์สำนักข่าวด้วยเครื่องมือ
              <a
                href="https://github.com/SeleniumHQ/selenium"
                target="_blank"
                class="underline"
                >python library selenium</a
              >
              ผ่าน Google Colab ทั้งนี้
              เว็บไซต์สำนักข่าวที่มีปริมาณข่าวค่อนข้างมากอย่างไทยรัฐออนไลน์
              มีการใช้ API ของเว็บไซต์มาช่วยดึงข้อมูลด้วย
              โดยข้อมูลที่ถูกดึงมาใช้ประกอบด้วย พาดหัวข่าว วันที่ลงข่าว
              ประเภทข่าว และลิงก์ URL ของข่าว ข้อมูลดังกล่าวถูกรวมและสร้างเป็น
              Pandas DataFrame เพื่อ export เป็นไฟล์นามสกุล CSV ตามลำดับ
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      id="quiz"
      class="!bg-[#EBE8DE] flex flex-col py-[30px] max-w-[850px] w-[90vw] items-center justify-center mx-auto h-screen"
      v-show="isShowQuiz"
    >
      <div class="text-center space-y-[5px] pb-[30px]" v-if="isShowAnswer">
        <h5
          :class="numOfCorrect === 0 ? 'bg-[#FF3D00] cream' : 'bg-[#4ADADA]'"
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
          <h1 class="h5 font-bold text-2xl text-center px-[45px]">
            คุณจำข่าวในช่วง 2 ปี ได้ดีแค่ไหน
          </h1>
          <p class="b2 font-bold text-[#717070] text-center">
            บอกได้มั้ย ข่าวไหนเกิดก่อน
          </p>
        </div>

        <div class="flex gap-[2px] mx-auto px-7 items-center">
          <img src="/image/intro/Frame.svg" alt="Frame" class="w-[33px]" />
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
        :disabled="isShowAnswer"
        item-key="id"
      >
        <template #item="{ element, index }">
          <div
            :class="isShowAnswer ? 'pointer-events-none' : ''"
            class="t5 text-[#EBE8DE] cursor-grab space-y-[15px] relative bg-black w-[256px] md:w-[650px] lg:w-[850px] p-[10px] mx-auto text-pretty mb-4 hover:bg-[#FF006B] hover:text-[#EBE8DE]"
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
                  ? beforeAnswer[index].index === answer[index].index
                    ? 'bg-[#4ADADA]'
                    : 'bg-[#FF3D00]'
                  : 'bg-[#FFF8B5]'
              "
              class="absolute -top-6 -left-2 b4 md:-left-4 md:-top-7 text-black border rounded-full w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-center border-black flex items-center justify-center"
            >
              {{ isShowAnswer ? element.index : index + 1 }}
            </div>
          </div>
        </template>
      </draggable>
      <div v-if="isShowAnswer" class="flex flex-col gap-[20px] pb-[40px]">
        <button
          @click="restartQuiz"
          class="flex gap-2 text-[#FF006B] text-sm border border-b-[#FF006B] w-fit mx-auto b3"
        >
          <img src="/image/Reset.svg" alt="Reset" />
          เล่นอีกรอบ</button
        ><button
          class="flex flex-col items-center mx-auto"
          @click="scrollToSelection"
        >
          <p class="b2 font-bold">เริ่มอ่าน</p>
          <img src="/image/intro/ArrowDown.svg" alt="" class="w-[20px]" />
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
    <div
      id="intro"
      class="text-center !bg-[#EBE8DE]"
      v-if="isShowContent"
      ref="intro"
    >
      <div id="cover">
        <div class="hidden xl:block h-[75vh] !bg-[#EBE8DE]">
          <div class="grid grid-cols-2 p-[20px] !bg-[#EBE8DE]">
            <div
              class="t1 font-black text-white bg-black p-[40px] flex items-center justify-center"
            >
              ‘พาดหัวข่าว’ เล่าอะไรให้คนไทยฟัง?
            </div>
            <div>
              <div class="grid grid-cols-2">
                <div>
                  <img
                    src="/image/intro/DotBg.svg"
                    alt="DotBg"
                    class="h-full w-full"
                  />
                </div>
                <div
                  class="grid grid-rows-2 border-black border-y-[2px] border-r-[2px]"
                >
                  <div
                    class="w-full h-full border-b-[2px] border-black"
                    :class="bgColor[bgLoopIndex]"
                  ></div>
                  <div
                    class="h5 bg-[#FFF8B5] font-bold py-[40px] px-[20px] flex items-center justify-center"
                  >
                    ย้อนดูเทรนด์ข่าวออนไลน์ไทย ช่วงปี
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-9 bg-white t3 font-black">
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  2
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  0
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  2
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  2
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  -
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  2
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  0
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  2
                </div>
                <div
                  class="p-[10px] border-black border-b-[2px] border-r-[2px]"
                >
                  3
                </div>
              </div>
            </div>
          </div>
          <div class="!bg-[#EBE8DE]">
            <div
              class="px-[16px] py-[40px] space-y-[20px] lg:max-w-4xl lg:mx-auto lg:py-[60px]"
            >
              <div class="b3 space-y-[10px] md:space-y-[20px] text-balance">
                <div
                  class="flex flex-col items-center justify-center gap-[5px]"
                >
                  <p class="bg-vermillion w-fit text-white px-[10px]">
                    BREAKING NEWS:
                  </p>
                  <p class="b1 font-bold md:pt-[10px]">
                    เมื่อสื่อข่าวออนไลน์กลายเป็นสื่อกระแสหลัก
                  </p>
                </div>

                <p>
                  รายงานข่าวของ Reuters Institute Digital News Report 2023
                  ชี้คนไทยเสพข่าวจากสื่อข่าวออนไลน์มากเป็นอันดับหนึ่ง
                  (รวมถึงข่าวใน Social Media) ผลลัพธ์จากแบบสอบถามในงานศึกษาพบว่า
                </p>
                <p class="text-[#5773DC] font-bold">
                  88%
                  ของผู้ตอบแบบสอบถามให้ความเชื่อมั่นและบริโภคข่าวจากสื่อข่าวออนไลน์
                </p>
                <p>ในขณะที่ 50% ของผู้ตอบแบบสอบถาม บริโภคข่าวจากสื่อโทรทัศน์</p>

                <ClientOnly>
                  <Vue3Lottie
                    :animationData="lottie_intro"
                    class="max-w-[450px]"
                  />
                </ClientOnly>
                <p>
                  ช่องทางยอดฮิตอย่าง สื่อข่าวออนไลน์ ต้องมี ‘พาดหัวข่าว’
                  เป็นบทนำในการเล่าเรื่อง ที่ล้วนต้องสั้นกระชับ
                  และเกริ่นใจความสำคัญของคอนเทนต์ข่าวได้แทบครบถ้วน
                </p>
                <p>
                  เมื่อ
                  <span class="text-[#5773DC]">#ชีวิตติดคอนเทนต์</span>
                  เราขอชวนคุณมาสำรวจ คอนเทนต์ ‘พาดหัวข่าว’
                  บนเว็บไซต์ข่าวออนไลน์ไทย เพื่อหาคำตอบว่า
                </p>
                <h3 class="b2 font-bold md:pb-[20px]">
                  2 ปีมานี้ ‘พาดหัวข่าว’ เล่าอะไรให้คนไทยฟังบ้าง?
                </h3>
              </div>
              <div
                class="relative border-[2px] border-[#C5C4C4] px-[10px] py-[15px] space-y-[10px]"
              >
                <p class="b3 font-bold text-[#717070]">
                  ที่มาและข้อจำกัดของข้อมูล
                </p>
                <p class="b4">
                  ข้อมูลที่ใช้พัฒนางานชิ้นนี้ไม่ได้ครอบคลุมข่าวทั้งหมดในประเทศไทย
                  แต่เลือกมา 5 สำนักข่าว จากทั้งหมด 16 สำนักข่าว
                  จากการจัดอันดับเว็บไซต์ข่าวที่ถูกเข้าถึงมากที่สุดในไทยโดย
                  Reuters Institute for the Study of Journalism ในปี 2023
                  ประกอบด้วย
                </p>
                <div
                  class="grid grid-cols-2 px-[40px] w-fit content-center mx-auto"
                >
                  <ol
                    class="b4 font-bold list-decimal text-start flex flex-col items-start"
                  >
                    <li>ไทยรัฐ ออนไลน์</li>
                    <li>The Standard</li>
                    <li>Thai PBS</li>
                    <li>Voice TV</li>
                    <li>WorkpointTODAY</li>
                  </ol>
                  <div class="b4 flex flex-col items-end">
                    <p>55.8 %</p>
                    <p>21.1 %</p>
                    <p>12.3 %</p>
                    <p>7.7 %</p>
                    <p>3.0 %</p>
                  </div>
                </div>
                <button
                  @click="showRefPopup"
                  class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto mt-[20px]"
                >
                  อ่านรายละเอียดเพิ่มเติม
                </button>
                <img
                  src="/image/intro/Warning.svg"
                  alt="Warning"
                  class="absolute -top-6 right-[50%] transform translate-x-[50%]"
                />
              </div>

              <p class="b3 font-bold px-[20px] md:py-[20px]">
                หากพร้อมแล้ว คลิกเพื่อสำรวจเนื้อหา ‘พาดหัวข่าว’ ที่คุณสนใจ
              </p>
              <div class="flex flex-col lg:flex-row gap-[20px]">
                <SectionBtn link="/trends" />
                <SectionBtn link="/lifecycle" />
              </div>
              <Share :hasMsgerLink="true" />
            </div>
          </div>
        </div>
        <img
          src="/image/intro/Head.svg"
          alt="Head"
          class="w-full xl:hidden block"
        />
      </div>

      <div
        class="xl:hidden block px-[16px] py-[40px] space-y-[20px] lg:max-w-4xl lg:mx-auto lg:mt-[40px]"
      >
        <div class="b3 space-y-[10px] md:space-y-[20px] text-balance">
          <div class="flex flex-col items-center justify-center gap-[5px]">
            <p class="bg-vermillion w-fit text-white px-[10px]">
              BREAKING NEWS:
            </p>
            <p class="b1 font-bold md:pt-[10px]">
              เมื่อสื่อข่าวออนไลน์กลายเป็นสื่อกระแสหลัก
            </p>
          </div>

          <p>
            รายงานข่าวของ Reuters Institute Digital News Report 2023
            ชี้คนไทยเสพข่าวจากสื่อข่าวออนไลน์มากเป็นอันดับหนึ่ง (รวมถึงข่าวใน
            Social Media) ผลลัพธ์จากแบบสอบถามในงานศึกษาพบว่า
          </p>
          <p class="text-[#5773DC] font-bold">
            88%
            ของผู้ตอบแบบสอบถามให้ความเชื่อมั่นและบริโภคข่าวจากสื่อข่าวออนไลน์
          </p>
          <p>ในขณะที่ 50% ของผู้ตอบแบบสอบถาม บริโภคข่าวจากสื่อโทรทัศน์</p>

          <ClientOnly>
            <Vue3Lottie :animationData="lottie_intro" class="max-w-[450px]" />
          </ClientOnly>
          <p>
            ช่องทางยอดฮิตอย่าง สื่อข่าวออนไลน์ ต้องมี ‘พาดหัวข่าว’
            เป็นบทนำในการเล่าเรื่อง ที่ล้วนต้องสั้นกระชับ
            และเกริ่นใจความสำคัญของคอนเทนต์ข่าวได้แทบครบถ้วน
          </p>
          <p>
            เมื่อ
            <span class="text-[#5773DC]">#ชีวิตติดคอนเทนต์</span>
            เราขอชวนคุณมาสำรวจ คอนเทนต์ ‘พาดหัวข่าว’ บนเว็บไซต์ข่าวออนไลน์ไทย
            เพื่อหาคำตอบว่า
          </p>
          <h3 class="b2 font-bold md:pb-[20px]">
            2 ปีมานี้ ‘พาดหัวข่าว’ เล่าอะไรให้คนไทยฟังบ้าง?
          </h3>
        </div>
        <div
          class="relative border-[2px] border-[#C5C4C4] px-[10px] py-[15px] space-y-[10px]"
        >
          <p class="b3 font-bold text-[#717070]">ที่มาและข้อจำกัดของข้อมูล</p>
          <p class="b4">
            ข้อมูลที่ใช้พัฒนางานชิ้นนี้ไม่ได้ครอบคลุมข่าวทั้งหมดในประเทศไทย
            แต่เลือกมา 5 สำนักข่าว จากทั้งหมด 16 สำนักข่าว
            จากการจัดอันดับเว็บไซต์ข่าวที่ถูกเข้าถึงมากที่สุดในไทยโดย Reuters
            Institute for the Study of Journalism ในปี 2023 ประกอบด้วย
          </p>
          <div class="grid grid-cols-2 px-[40px] w-fit content-center mx-auto">
            <ol
              class="b4 font-bold list-decimal text-start flex flex-col items-start"
            >
              <li>ไทยรัฐ ออนไลน์</li>
              <li>The Standard</li>
              <li>Thai PBS</li>
              <li>Voice TV</li>
              <li>WorkpointTODAY</li>
            </ol>
            <div class="b4 flex flex-col items-end">
              <p>55.8 %</p>
              <p>21.1 %</p>
              <p>12.3 %</p>
              <p>7.7 %</p>
              <p>3.0 %</p>
            </div>
          </div>
          <button
            @click="showRefPopup"
            class="text-[#FF006B] b4 border border-b-[#FF006B] w-fit mx-auto mt-[20px]"
          >
            อ่านรายละเอียดเพิ่มเติม
          </button>
          <img
            src="/image/intro/Warning.svg"
            alt="Warning"
            class="absolute -top-6 right-[50%] transform translate-x-[50%]"
          />
        </div>

        <p class="b3 font-bold px-[20px] md:py-[20px]">
          หากพร้อมแล้ว คลิกเพื่อสำรวจเนื้อหา ‘พาดหัวข่าว’ ที่คุณสนใจ
        </p>
        <div class="flex flex-col lg:flex-row gap-[20px]">
          <SectionBtn link="/trends" />
          <SectionBtn link="/lifecycle" />
        </div>
        <Share :hasMsgerLink="true" />
      </div>
    </div>
  </div>
  <CookieBanner />
</template>

<style scoped>
.group {
  width: 150px;
}

.not-use {
  border-top: 1px solid #c5c4c4 !important;
  border-left: 1px solid #c5c4c4 !important;
  border-right: 1px solid #c5c4c4 !important;
  color: #939393 !important;
}
</style>

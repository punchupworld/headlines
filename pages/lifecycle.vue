<script setup>
import scrollama from "scrollama";
import { Vue3Lottie } from "vue3-lottie";
import lottie_part2 from "public/lottie/lottie-2.json";

const isShowRefPopup = ref(false);
const isSelectNews = ref(false);
const typeOfNews = ref("tangmo");
const step = ref(0);

const scroller = scrollama();

function selectNews(news) {
  typeOfNews.value = news;
  isSelectNews.value = true;

  nextTick(() => {
    scroller
      .setup({
        step: "#main-box .step-list .step",
        offset: 0.5,
      })
      .onStepEnter((response) => {
        step.value = response.index;
        // { element, index, direction }
        if (response.index > 0 && response.index < 4) {
          nextTick(() => {
            document.getElementById("tangmo-news-list").scrollLeft = 275.377;
          });
        }
      })
      .onStepExit((response) => {
        // { element, index, direction }
      });

    document.getElementById("story").scrollIntoView();
  });
}
</script>

<template>
  <div class="bg-[#EBE8DE] min-h-screen">
    <div
      class="max-w-[850px] mx-auto text-center px-3 relative min-h-screen py-[40px] flex justify-center items-center"
    >
      <div>
        <h1 class="t2 pb-5">..‘พาดหัวข่าว’ มาราธอน..</h1>
        <h4 class="h4 font-bold pb-5">
          เห็นตั้งแต่กุมภาฯ เดือนกันยาฯ ก็ยังไม่หลุดเทรนด์
        </h4>
        <p class="b2 pb-5">
          รวมข่าวที่ได้แอร์ไทม์นาน ข่าวไหนบ้างที่ครองพื้นที่สื่อหลายเดือน
        </p>

        <p
          @click="isShowRefPopup = true"
          class="text-[#FF006B] b4 w-fit mx-auto underline cursor-pointer"
        >
          อ่านที่มาและข้อจำกัดของข้อมูล
        </p>

        <div
          id="refPopup"
          class="left-0 fixed top-0 bg-black/30 h-full w-full items-center justify-center flex z-10 p-3"
          v-show="isShowRefPopup"
        >
          <div
            id="popUpScroll"
            class="relative bg-white max-w-[900px] h-[81vh] w-full text-left p-1"
          >
            <img
              @click="isShowRefPopup = false"
              src="/image/CanclePink.svg"
              alt=""
              class="absolute -top-2 -right-2 cursor-pointer"
            />
            <div class="overflow-y-scroll p-5 sm:p-10 h-[80vh]">
              <p class="b1 font-bold pb-3 sm:pb-5">ที่มาและข้อจำกัดของข้อมูล</p>
              <p class="b1 font-bold">ที่มา</p>
              <ul class="list-disc b3">
                <li>
                  การหาประเด็นข่าวดัง ใช้ข้อมูลจาก
                  <a
                    href="https://trends.google.co.th/trends/yis/2022/TH/?hl=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Google’s search trend</a
                  >
                  ,
                  <a
                    href="https://getdaytrends.com/thailand/top/tweeted/year/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Twitter trends</a
                  >
                  และ
                  <a
                    href="https://wisesight.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Wisesight</a
                  >’s social trends ประกอบกัน
                </li>
                <li>
                  <b>ประเด็นข่าวที่ถูกคัดออก</b> คือ
                  ประเด็นที่มีกำหนดเวลาเริ่มต้นและสิ้นสุดค่อนข้างชัดเจน เช่น
                  เลือกตั้ง 2566, เลือกตั้ง กทม., ฟุตบอลโลก 2022, ซีเกมส์ 2021,
                  มิสแกรนด์ไทยแลนด์
                  เพราะความยาวนานของข่าวเหล่านี้เป็นไปตามหมุดหมายเหตุการณ์ที่ผู้จัดงานกำหนดไว้แล้ว
                  มากกว่าจะขึ้นอยู่กับการตัดสินใจของสื่
                </li>
                <li>
                  <b> การรวบรวมพาดหัวข่าวทั้งหมดที่เกี่ยวข้องกับแต่ละประเด็น</b>
                  รวบรวมโดยใช้คีย์เวิร์ด เช่น ทุกพาดหัวข่าวที่มีคำว่า “แตงโม”
                  จะถูกเก็บรวบรวม ภายใต้ประเด็น คดีแตงโม-นิดา
                </li>
                <li>
                  <b>การคัดกรองพาดหัวข่าวที่ไม่เกี่ยวข้อง</b
                  >คัดกรองข่าวด้วยการผสมคีย์เวิร์ดหลักและรองเพื่อหาข่าวที่เกี่ยวข้อง
                  เช่น ข่าวแตงโม-นิดา จะต้องมีคีย์เวิร์ดหลักคือ “แตงโม” หรือ
                  “นิดา” เท่านั้น และจะมีคีย์เวิร์ดรองเป็น “ตกเรือ” หรือ “จมน้ำ”
                  ด้วยก็ได้ ประกอบกับการใช้วิจารณญาณของผู้จัดทำ
                  โดยพยายามคัดข่าวที่ไม่เกี่ยวข้องอย่างชัดเจนออกไป เช่น
                  ข่าวเกี่ยวกับผลไม้แตงโม
                  จะไม่ถูกนำมานับรวมกับประเด็นคดีแตงโม-นิดา
                </li>
                <li>
                  <b>การเลือก 10 ข่าวที่ได้พื้นที่สื่อนานที่สุด</b>
                  ใช้เกณฑ์จำนวนวันที่มีข่าวเกี่ยวกับประเด็นนั้นอย่างน้อย 1 ข่าว
                  (ไม่นับวันที่ไม่มีข่าว)
                </li>
              </ul>

              <p class="b1 font-bold py-3 sm:py-5">ข้อจำกัด</p>
              <ul class="list-disc b3">
                <li>
                  การหาประเด็นข่าวดังโดยใช้ Trends ฝั่งผู้เสพสื่อ
                  อาจไม่ครอบคลุมทุกประเด็นข่าวที่ถูกนำเสนอยาวนานในฝั่งผู้ผลิตสื่อ
                  เช่น สำนักข่าว A อาจนำเสนอข่าวเกี่ยวกับ B บ่อยมาก
                  แต่ไม่เป็นกระแสในโลกออนไลน์
                  ก็อาจจะไม่ติดเทรนด์และไม่ถูกนำมาแสดงในงานชิ้นนี้
                </li>
                <li>
                  การรวบรวมข่าวทั้งหมดเกี่ยวกับแต่ละประเด็นโดยใช้คีย์เวิร์ด
                  อาจไม่ครอบคลุมทุกข่าวในกรณีที่ผู้จัดทำระบุคีย์เวิร์ดไม่ครบ
                  เช่น ประเด็นคดีแตงโม-นิดา ซึ่งใช้คีย์เวิร์ด “แตงโม”
                  อาจทำให้ตกหล่นข่าวที่เกี่ยวข้องกับคดีนี้ แต่ไม่มีคำว่า “แตงโม”
                  ในพาดหัวข่าว
                </li>
              </ul>

              <p class="b3 pt-5">
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

        <ClientOnly>
          <Vue3Lottie
            :animationData="lottie_part2"
            class="max-w-[450px] py-5"
          />
        </ClientOnly>
        <p class="b3 pt-5">
          เมื่อพูดถึงข่าวที่สื่อนำเสนอยาวนานไม่จบไม่สิ้น ในช่วง 2 ปีที่ผ่านมา
          คุณนึกถึงข่าวอะไรเป็นอันดับแรก
        </p>

        <div
          @click="selectNews('pol')"
          class="t5 cream cursor-pointer mt-5 bg-black p-[10px] mx-auto text-pretty hover:bg-[#FF006B] hover:text-[#EBE8DE]"
        >
          ลุงพล-น้องชมพู่-ป้าแต๋น
        </div>
        <div
          @click="selectNews('tangmo')"
          class="t5 cream cursor-pointer mt-5 bg-black p-[10px] mx-auto text-pretty hover:bg-[#FF006B] hover:text-[#EBE8DE]"
        >
          แตงโมตกเรือ
        </div>
      </div>
    </div>

    <div class="text-center pb-[40px]" v-if="isSelectNews" id="story">
      <div class="relative">
        <div
          id="tangmo-news-list"
          class="sticky top-0 h-screen flex overflow-x-auto chart-wrapper flex-col scroll-smooth pt-[20vh]"
          v-if="step > 0 && isSelectNews"
        >
          <TangmoNews :current_step="step" />
          <div>
            <img
              src="/image/lifecycle/date.svg"
              alt=""
              class="max-w-fit"
              id="tangmo-news-date"
            />
          </div>
        </div>
        <div
          id="main-box"
          class="flex flex-col lg:flex-row max-w-[900px] mx-auto"
        >
          <div
            class="content sticky top-0 h-screen flex items-center justify-center w-full lg:w-2/4"
          >
            <div class="max-w-full md:max-w-[500px] px-3">
              <template v-if="step == 0">
                <img
                  src="/image/lifecycle/tangmo.svg"
                  alt=""
                  class="w-full"
                  v-if="typeOfNews == 'tangmo'"
                />
                <img
                  class="w-full"
                  src="/image/lifecycle/tangmo_pol.svg"
                  alt=""
                  v-else
                />
              </template>
              <template v-if="step < 7 && step > 0">
                <RandomNews
                  :current_step="step"
                  :isInStorytelling="true"
                  :hasSelectDate="false"
                  news="คดีแตงโม-นิดา"
                />
              </template>
            </div>
          </div>
          <div
            class="step-list mt-[-100vh] lg:mt-0 z-10 relative w-full lg:w-2/4 pointer-events-none"
          >
            <div class="step" data-step="1">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <template v-if="typeOfNews == 'tangmo'">
                  <p class="b1 font-bold">ใช่เลย!</p>
                  <p class="b3 font-bold">“คดีแตงโม-นิดา”</p>
                  <p class="b3">
                    เป็นข่าวที่ได้พื้นที่สื่อนานมากในช่วงปี 2022-2023
                  </p>
                </template>
                <template v-else>
                  <p class="b1 font-bold">ก็ใช่นะ..</p>
                  <p class="b3">
                    ข่าว <b>“ลุงพล-น้องชมพู่-ป้าแต๋น”</b> ได้พื้นที่สื่อในช่วงปี
                    2022-2023 นานพอสมควร แต่กระแสของข่าวนี้ เกิดขึ้นใน<a
                      href="https://www.thaipbs.or.th/news/content/333262"
                      target="_blank"
                      rel="noopener noreferrer"
                      >ปี 2020-2021</a
                    >
                    มากกว่า ทำให้หากนับเฉพาะช่วง 2 ปีที่ผ่านมา
                    ยังสู้ความยาวนานของข่าว <b>“คดีแตงโม-นิดา”</b> ไม่ได้
                  </p>
                </template>
              </div>
            </div>
            <div class="step" data-step="2">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  <b>“คดีแตงโม-นิดา”</b> พลัดตกเรือเริ่มต้นในเช้ามืดของวันที่ 25
                  ก.พ. 2022!
                </p>
              </div>
            </div>
            <div class="step" data-step="3">
              <div class="bg-white p-3 sm:p-5 h-fit b3">
                <p class="">
                  มีจำนวนข่าววันแรกทั้งวันรวมกัน
                  <b> 85 ข่าว</b> โดยเป็นข่าวในหมวด
                  <b>
                    <div class="w-[8px] h-[8px] bg-brown inline-block"></div>
                    อาชญากรรม
                    <div class="w-[8px] h-[8px] bg-pink inline-block"></div>
                    บันเทิง</b
                  >
                  และ
                  <b
                    ><div
                      class="w-[8px] h-[8px] bg-lightblue inline-block"
                    ></div>
                    สังคมไทย</b
                  >
                </p>
              </div>
            </div>
            <div class="step" data-step="4">
              <div class="bg-white p-3 sm:p-5 h-fit b3">
                ก่อนจะแผ่ขยายไปสู่หมวด
                <div class="w-[8px] h-[8px] bg-vermillion inline-block"></div>
                <b class="px-1">การเมือง</b>ในวันต่อมา
                เมื่อมีนักการเมืองเข้ามาเกี่ยวข้อง
              </div>
            </div>
            <div class="step" data-step="5">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  <b> 100 วันผ่านไป</b> เทรนด์ข่าว "คดีแตงโม-นิดา" ค่อยๆ ลดลง
                  แต่ยังไม่มีทีท่าจะหายไปจากหน้าสื่อ เพราะมีเหตุการณ์ใหม่ๆ
                  คอยหล่อเลี้ยงกระแส
                </p>
              </div>
            </div>
            <div class="step" data-step="6">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  ข่าวการไว้อาลัย
                  ควบคู่ไปกับการเปิดโปงพยานหลักฐานเพิ่มเติมจากตำรวจ
                  และคนใกล้ชิดยังคงดำเนิน<b>ต่อเนื่องไปอีกราว 2 เดือน</b>
                </p>
              </div>
            </div>
            <div class="step" data-step="7">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  แม้หลังจากเดือนกรกฎาคม 2022 จำนวนข่าว “คดีแตงโม-นิดา”
                  จะเบาบางลงมาก
                  <b
                    >แต่แทบทุกเดือนก็ยังมีข่าวเกี่ยวกับเรื่องนี้ให้เห็นอยู่เป็นระยะ</b
                  >
                </p>
              </div>
            </div>
            <div class="step" data-step="8">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  <b>ยกเว้นเดือนกรกฎาคม 2023</b>
                  เดือนเดียวนับตั้งแต่เกิดเหตุการณ์ที่ไม่มีข่าว “คดีแตงโม-นิดา”
                  ปรากฏในสื่อออนไลน์กระแสหลัก*เลย
                </p>
                <p class="b5 text-[#717070]">
                  *ประกอบด้วย 5 สำนักข่าว คือ ไทยรัฐ ออนไลน์, The Standard, Thai
                  PBS, Voice TV, WorkpointTODAY
                </p>
              </div>
            </div>
            <div class="step" data-step="9">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  โดยสรุปแล้ว
                  <b
                    >ใน 2 ปีซึ่งมี 730 วัน คนไทยได้เห็นข่าว “คดีแตงโม-นิดา”
                    ไปแล้ว 202 วัน* หรือราว 28%</b
                  >
                  และไม่แน่ว่า
                  ข่าวนี้อาจจะยังสิงสถิตในหน้าสื่อให้เราเห็นต่อในปีถัดไป
                </p>
                <p class="b5 text-[#717070]">
                  *นับเฉพาะวันที่มีข่าวอย่างน้อย 1 ข่าว
                </p>
              </div>
            </div>
            <div class="step" data-step="10">
              <div class="bg-white p-3 sm:p-5 h-fit">
                <p class="b3">
                  นอกจาก “คดีแตงโม-นิดา” แล้ว
                  <b
                    >ไปสำรวจกันว่ามีข่าวอะไรอีกบ้าง ที่ได้พื้นที่สื่อนานในปี
                    2022-2023</b
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExploreNews />

      <div class="max-w-[850px] mx-auto text-center px-4">
        <p
          @click="isShowRefPopup = true"
          class="text-[#FF006B] b4 w-fit mx-auto underline cursor-pointer pb-10"
        >
          อ่านที่มาและข้อจำกัดของข้อมูล
        </p>

        <hr class="border-[#C5C4C4] my-5" />

        <p class="b3 font-bold pb-5">สำรวจประเด็นที่เหลือ</p>

        <SectionBtn link="/trends" />

        <NuxtLink to="/">
          <p
            class="text-[#FF006B] b4 w-fit mx-auto underline cursor-pointer py-5"
          >
            กลับไปหน้าแรก
          </p>
        </NuxtLink>

        <Share :hasMsgerLink="false" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
}
.step {
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @include mobile {
    max-width: 250px;
  }
}

.chart-wrapper::-webkit-scrollbar {
  display: none;
}
</style>

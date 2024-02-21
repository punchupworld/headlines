<script setup>
import StoryCard from "/components/StoryCard.vue"
</script>

<template>
  <StoryCard id="card1" class="z-20">
    <p class="b3">
      ในช่วง 2 ปีที่ผ่านมา<br />
      สื่อออนไลน์กระแสหลัก*ผลิตข่าวให้คนไทยเห็นทั้งหมด
    </p>
    <p class="b1 font-bold">187,582 พาดหัวข่าว</p>
    <p class="b5 text-[#717070]">
      *ประกอบด้วย 5 สำนักข่าว คือ ไทยรัฐ ออนไลน์, The Standard, Thai PBS, Voice
      TV, WorkpointTODAY
    </p>
  </StoryCard>
  <StoryCard id="card2">
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
      <span class="font-bold">ส่วนเดือนที่มีข่าวน้อยที่สุดคือ ธ.ค. 2023</span>
      (6,469 พาดหัวข่าว)
    </p>
    <p></p>
  </StoryCard>
  <StoryCard id="card3">
    <div class="b3 leading-[1000px]">
      เมื่อเจาะดูเป็นรายหมวดพบว่า คนไทยมีโอกาสเห็นพาดหัวข่าว
      <div class="flex flex-wrap justify-center gap-[2px]">
        <p class="bg-vermillion font-bold w-fit">การเมือง</p>
        และ
        <p class="bg-lightblue font-bold w-fit">สังคมไทย</p>
        <p>มากที่สุด ในขณะที่</p>
        <p class="bg-green font-bold w-fit">สิ่งแวดล้อม</p>
      </div>

      เป็นข่าวที่ถูกนำเสนอน้อยที่สุด
    </div>
    <p class="b4 text-[#939393] mt-[10px]">สัดส่วนข่าวแต่ละหมวด รวม 2 ปี</p>
    <div class="b4 flex h-[60px] my-[10px] w-full">
      <div
        class="bg-vermillion w-[28%] flex items-center justify-center font-semibld"
        style="
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
        ">
        28.2%
      </div>
      <div
        class="bg-lightblue w-[26%] flex items-center justify-center font-semibld"
        style="
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
        ">
        26%
      </div>
      <div class="bg-orange opacity-20 w-[13%]"></div>
      <div class="bg-rose opacity-20 w-1/12"></div>
      <div class="bg-pink opacity-20 w-1/12"></div>
      <div class="bg-brown opacity-20 w-1/12"></div>
      <div class="bg-purple opacity-20 w-[4%]"></div>
      <div class="bg-blue opacity-20 w-[3%]"></div>
      <div
        class="bg-green w-[2%] flex items-center justify-center font-semibld"
        style="
          text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
            1px 1px 0 #fff;
        ">
        1.7%
      </div>
    </div>
    <p class="b3 font-bold">
      ไปดูกันว่าข่าวในแต่ละหมวดมีประเด็นอะไรที่น่าสนใจบ้าง..
    </p>
  </StoryCard>
  <StoryCard id="card4">
    <div>
      <div class="border-b-[1px] border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวการเมือง</p>
        <p class="b4 text-[#717070]">รวม 52,971 ข่าว (28.2% ของข่าวทั้งหมด)</p>
      </div>
      <div class="b3 pt-[10px]">
        <p>
          เป็นที่น่าสังเกตว่าจำนวนข่าวในหมวดนี้จะแปรผันตรงกับวาระทางการเมืองที่ร้อนแรง
          โดยเดือนที่มีข่าวสูงสุดของปี 2022 และ 2023
          ล้วนตรงกับวาระสำคัญทางการเมือง ได้แก่
        </p>
      </div>
      <div class="border-b-[1px] border-[#C5C4C4] pb-[10px]">
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
      <div class="b3 pt-[10px]">
        <p class="font-bold">5 คีย์เวิร์ดพบบ่อย</p>
        <p>ในพาดหัวข่าวการเมือง ได้แก่</p>
        <div
          class="b4 flex flex-wrap items-center justify-center gap-[4px] mt-[10px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">นายกฯ</span>(7,884)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">เลือกตั้ง2566</span>(6,521)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ประยุทธ์</span>(3,539)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">รัฐบาล</span>(4,681)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">เพื่อไทย</span>(4,617)
          </div>
        </div>
      </div>
    </div>
  </StoryCard>
  <StoryCard id="card5">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวสังคมไทย</p>
        <p class="b4 text-[#717070]">รวม 48,745 ข่าว (26% ของข่าวทั้งหมด)</p>
      </div>
      <div class="b3 py-[10px] border-b border-[#C5C4C4]">
        <p>
          แม้จำนวนพาดหัวข่าวสังคมไทยจะมีแนวโน้มลดลงอย่างต่อเนื่องตั้งแต่ ก.ย.
          2022 แต่ในภาพรวม 2 ปี ยังถือว่ามีสัดส่วนมากเป็นอันดับ 2
          รองจากข่าวการเมือง ด้วยประเด็นข่าวที่กว้างและครอบคลุมหลายเรื่องในสังคม
          หลายคำที่เจอในพาดหัวข่าวบ่อยๆ จึงเป็นคำที่สามารถพบในข่าวหมวดอื่นๆ
          ได้เช่นกัน จำแนกเป็นประเภทต่างๆ ได้ ดังนี้
        </p>
      </div>
      <div>
        <p class="b3 font-bold pt-[10px] pb-[5px]">เหตุการณ์สำคัญ</p>
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">สงกรานต์</span>(478)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> เรือหลวงสุโขทัย</span>(150)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> ลอยกระทง</span>(148)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> APEC</span>(105)
          </div>

          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">กราดยิงหนองบัวลำภู</span>(59)
          </div>
        </div>
      </div>
      <div class="py-[10px] border-b border-[#C5C4C4]">
        <p class="b3 font-bold pb-[5px]">ภัยธรรมชาติ</p>
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> น้ำท่วม</span>(1,153)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ฝุ่น PM2.5</span>(505)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ไต้ฝุ่นโนรู</span>(108)
          </div>
        </div>
      </div>
      <div class="border-b border-[#C5C4C4] py-[10px]">
        <p class="b3 font-bold">โรค</p>
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> โควิด-19</span>(2,703)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">โอมิครอน</span>(301)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ฝีดาษลิง</span>(254)
          </div>
        </div>
      </div>
      <div class="border-b border-[#C5C4C4] py-[10px]">
        <p class="b3 font-bold pb-[5px ]">บุคคล</p>
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ชัชชาติ</span>(912)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> พิธา</span>(177)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> ทักษิณ</span>(146)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> แตงโมนิดา</span>(104)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> กำนันนก</span>(54)
          </div>
        </div>
      </div>
      <div class="pt-[10px]">
        <p class="b3 py-[5px]">
          นอกจากนี้ยังมีคำที่บ่งชี้เพศสภาพซึ่งปรากฏในพาดหัวข่าวอยู่บ่อยๆ อย่าง
        </p>
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">สาว</span>(2,283)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">หนุ่ม</span>(1,736)
          </div>
        </div>
      </div>
    </div>
  </StoryCard>
  <StoryCard id="card6">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวเศรษฐกิจ/การเงิน</p>
        <p class="b4 text-[#717070]">รวม 24,586 ข่าว (13.1% ของข่าวทั้งหมด)</p>
      </div>
      <div class="b3 pt-[10px]">
        <p>
          ในขณะที่ข่าวหมวดอื่นมีการเปลี่ยนแปลงสัดส่วนของจำนวนข่าวระหว่าง 2 ปี
          บ้างลดลง บ้างเพิ่มขึ้น แต่ข่าวเศรษฐกิจ/การเงิน
          <span class="font-bold"
            >เป็นหมวดเดียวที่มีสัดส่วนข่าวเท่าเดิมเป๊ะ</span
          >
        </p>
      </div>
      <div class="py-[10px] border-b border-[#C5C4C4]">
        <p class="b4 text-[#717070]">
          สัดส่วนข่าวแต่ละหมวดต่อจำนวนข่าวทั้งหมดในแต่ละปี
        </p>
        <img src="/image/trends/economyChart.svg" alt="" class="mx-auto"/>
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
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">หุ้น</span>(4,024)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> จีน</span>(1,555)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ดอกเบี้ย</span>(1,296)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">กำไร</span>(1,067)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">สหรัฐ</span>(976)
          </div>
        </div>
      </div>
    </div>
  </StoryCard>
  <StoryCard id="card7">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวต่างประเทศ</p>
        <p class="b4 text-[#717070]">รวม 20,236 ข่าว (10.8% ของข่าวทั้งหมด)</p>
      </div>
      <div class="b3 pt-[10px]">
        <p>
          เทรนด์ข่าวต่างประเทศมี
          <span class="font-bold">6 ช่วงเวลา</span>
          ที่จำนวนข่าวสูงกว่าเดือนอื่นๆ เมื่อส่องดูคีย์เวิร์ดในพาดหัวข่าว 6
          เดือนนี้ พบว่ามีเหตุการณ์ระดับโลก หรือบุคคลสำคัญของชาติอื่นๆ
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
  </StoryCard>
  <StoryCard id="card8">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวบันเทิง</p>
        <p class="b4 text-[#717070]">รวม 14,253 ข่าว (7.6% ของข่าวทั้งหมด)</p>
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
          แต่แล้วไงใครแคร์ เช็กกันสักนิดว่าสื่อข่าวออนไลน์ไทยเขียนข่าวอะไรในหมวดข่าวบันเทิง
        </p>
        <p>แม้คีย์เวิร์ดที่โผล่มาให้เห็นบ่อยๆจะเป็นชื่อคนในวงการ เช่น</p>
      </div>
      <div>
        <div class="b4 flex flex-wrap items-center justify-center gap-[5px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">แตงโม-นิดา</span>(199)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">อิงฟ้า</span>(180)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ดิว-อริสรา</span>(97)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">แอนโทเนีย โพซิ้ว</span>(35)
          </div>
        </div>
      </div>
      <div class="pt-[10px]">
        <p class="b3 text-wrap">
          แต่คำกริยาและคำคุณศัพท์ในพาดหัวข่าวนี่แหละ สะท้อนความสนใจของผู้เขียนข่าว ซึ่งหยิบเขียนให้ผู้อ่านข่าวรู้ได้ว่า คนบันเทิงอาจจะชอบ
        </p>
        <div
          class="b4 flex flex-wrap items-center justify-center gap-[5px] py-[10px]">
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">รัก</span>(1,347)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">โพสต์</span>(978)
          </div>

          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">แซ่บ</span>(646)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">โชว์</span>(517)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">สวย</span>(512)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">อวด</span>(440)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">เลิก</span>(437)
          </div>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ดราม่า</span>(423)
          </div>
        </div>
        <div class="flex flex-col items-center">
          <p class="b3 pb-[10px]">หรือแม้แต่</p>
          <div
            class="b4 bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">ติดโควิด</span>(148)
          </div>
        </div>
      </div>
    </div>
  </StoryCard>
  <StoryCard id="card9">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวอาชญากรรม</p>
        <p class="b4 text-[#717070]">รวม 13,651 ข่าว (7.3% ของข่าวทั้งหมด)</p>
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
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            ตำรวจ (217)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            กำนันนก (145)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            คดี (110)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            บิ๊กโจ๊ก (98)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            ยิง (93)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            จับ (89)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            บ้าน (83)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            ฆ่า (65)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            ปืน (56)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            ผกก. (55)
          </div>
        </div>
        <div class="b4 flex flex-col items-start gap-[5px]">
          <div>
            <p class="b3 font-bold">ก.ค. 2022</p>
            <p class="b4 text-start">(415 ข่าว)</p>
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            ตำรวจ (127)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            จับ (112)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            ดับ/ตาย (87)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            ยิง (59)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            คดี (57)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            รถ (52)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit">
            ฆ่า (51)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            หนี (47)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
            หนุ่ม (46)
          </div>
          <div
            class="bg-black flex items-center gap-2 px-2 text-[#FFF8B5] w-fit opacity-50">
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
  </StoryCard>
  <StoryCard id="card10">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวกีฬา</p>
        <p class="b4 text-[#717070]">รวม 5,538 ข่าว (3% ของข่าวทั้งหมด)</p>
      </div>
      <div class="b3 py-[10px]">
        <p>
          เทรนด์ข่าวมีขึ้นและลง แต่หากลองสำรวจเทรนด์ของเดือนที่โดดเด่น
          หรือมีจำนวนข่าวสูงกว่าเดือนใกล้เคียง คนไทยคนแรกอย่างเราจะรู้ว่า
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
  </StoryCard>
  <StoryCard id="card11">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าววิทยาศาสตร์/เทคโนโลยี</p>
        <p class="b4 text-[#717070]">รวม 4,408 ข่าว (2.3% ของข่าวทั้งหมด)</p>
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
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold"> อีลอน มัสก์ </span>(288)
          </div>
          <p class="b3 font-bold">แพลตฟอร์ม</p>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">Twitter/X</span>(459)
          </div>
          <p class="b3 font-bold">สมาร์ตโฟน</p>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">iPhone15</span> (63)
          </div>
          <p class="b3 font-bold">ประเทศ</p>
          <div
            class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
            <span class="font-bold">รัสเซีย</span>(75)
          </div>
        </div>
        <div class="b4 flex flex-col items-start gap-[5px]"></div>
      </div>
    </div>
  </StoryCard>
  <StoryCard id="card12">
    <div>
      <div class="border-b border-[#C5C4C4] pb-[10px]">
        <p class="b1 font-bold">ข่าวสิ่งแวดล้อม</p>
        <p class="b4 text-[#717070]">รวม 3,194 ข่าว (1.7% ของข่าวทั้งหมด)</p>
      </div>
      <div class="b3 py-[10px] space-y-[10px]">
        <p>
          แนวโน้มจำนวนข่าวสิ่งแวดล้อมที่เพิ่มขึ้น
          อาจสะท้อนการเพิ่มขึ้นของข่าวร้ายมากกว่าข่าวดี
          เพราะคุณจะพบคำเกี่ยวกับภัยธรรมชาติ
          หรืออุบัติภัยที่มนุษย์ก่อในข่าวหมวดนี้อยู่บ่อยๆ เช่น
        </p>
      </div>
      <div
        class="b4 flex flex-wrap items-center justify-center gap-[5px] pt-[10px]">
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">น้ำท่วม</span>(256)
        </div>
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">ฝนตกหนัก</span>(196)
        </div>
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">ฝุ่น PM2.5</span>(94)
        </div>
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">น้ำป่า</span>(66)
        </div>
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">ฝนถล่ม</span>(34)
        </div>
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">คราบน้ำมัน</span>(34)
        </div>
        <div
          class="bg-black flex items-center gap-[2px] px-2 text-[#FFF8B5] w-fit">
          <span class="font-bold">มลพิษ</span>(33)
        </div>

        <div class="b4 flex flex-col items-start gap-[5px]"></div>
      </div>
      <div class="b3 pt-[10px] space-y-[10px]">
        <p>
          อย่างเดือน
          <span class="font-bold"> ก.ย. 2022</span>
          ที่มีจำนวนข่าวสูงสุด (254 ข่าว) ก็เป็นเดือนที่เกิดเหตุการณ์
          <span class="font-bold">น้ำท่วม และพายุโนรู</span>
        </p>
      </div>
      <div class="b3 pt-[10px]">
        <p>
          แต่ก็ไม่ได้แปลว่าจะไม่มีข่าวน่าสนใจอื่นๆ เลย
          ตัวอย่างข่าวน่าติดตามที่มีคีย์เวิร์ดโผล่มาใน Top 10 ของบางเดือนก็เช่น
        </p>
        <div class="font-bold">
          <p>ข่าวพลายศักดิ์สุรินทร์</p>
          <p>คดีสินบนกรมอุทยานฯ</p>
          <p>หรือแก้มลิงเกาะพระทอง</p>
        </div>
      </div>
    </div>
  </StoryCard>
</template>

<style scoped></style>
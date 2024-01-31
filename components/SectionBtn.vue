<script setup>
defineProps({
  link: String,
});
</script>

<template>
  <NuxtLink :to="link">
    <button>
      <div
        class="flex flex-col border-[2px] border-black hover:border-[#FF006B] bg-[#FFF8B5] p-[20px] gap-[5px] max-w-[500px]"
      >
        <h1 class="t3 font-black">
          ..‘พาดหัวข่าว’<br />
          {{ link == "/trends" ? "เล่าเรื่อง.." : "มาราธอน.." }}
        </h1>
        <h2 class="h5 font-bold">
          {{
            link == "/trends"
              ? "คนไทยได้เจอข่าวอะไรมากที่สุด ?"
              : "เห็นตั้งแต่กุมภา เดือนกันยาก็ยังไม่หลุดเทรนด์"
          }}
        </h2>
        <p class="b2">
          {{
            link == "/trends"
              ? "สำรวจเทรนด์ข่าวรายเดือน พร้อมคีย์เวิร์ดที่ปรากฏบ่อยในช่วง 2 ปี"
              : "รวมข่าวที่ได้แอร์ไทม์นาน ข่าวไหนบ้างที่ครองพื้นที่สื่อหลายเดือน"
          }}
        </p>
        <p class="text-[#FF006B] b3 flex gap-1 items-center justify-center">
          อ่านต่อ
          <img src="/image/ArrowRight.svg" alt="" />
        </p>
      </div></button
  ></NuxtLink>
</template>

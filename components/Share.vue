<script setup>
defineProps({
  hasMsgerLink: Boolean,
});
</script>

<template>
  <div class="flex flex-col md:flex-row justify-center items-center">
    <p class="b4 mr-2">แชร์</p>
    <div class="flex gap-[5px] justify-center">
      <ShareNetwork
        network="facebook"
        url="https://headlines-3bc.pages.dev/"
        title=""
      >
        <img src="/image/Facebook.svg" alt="" class="h-[30px]" />
      </ShareNetwork>
      <ShareNetwork
        network="facebook"
        url="https://headlines-3bc.pages.dev/"
        title=""
      >
        <img src="/image/X.svg" alt="" />
      </ShareNetwork>
      <ShareNetwork
        network="facebook"
        url="https://headlines-3bc.pages.dev/"
        title=""
      >
        <img src="/image/Line.svg" alt="" />
      </ShareNetwork>
    </div>
  </div>
  <div class="flex flex-col md:flex-row justify-center mt-5 items-center">
    <p class="b4">Produced by</p>

    <a
      href="https://punchup.world/"
      target="_blank"
      class="text-[#FF006B] font-bold mx-2"
    >
      <img src="/image/PunchUpLogo.svg" alt="" class="h-[40px]"
    /></a>
  </div>
  <p class="b3 px-[16px] pb-[40px]" v-if="hasMsgerLink">
    หากมีข้อสงสัยหรือคำแนะนำเพิ่มเติมใดๆ เกี่ยวกับงานนี้ ทักมาหาพวกเราได้ที่
    <a
      href="https://m.me/punchupworld"
      target="_blank"
      class="text-[#FF006B] font-bold"
      >m.me/punchupworld</a
    >
  </p>
</template>

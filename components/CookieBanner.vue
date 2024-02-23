<script setup>
const localstorage_cookie_key = "";
const localstorage_cookie_expire_at_key = "";

const isShow = ref(false);
const isShowSettings = ref(false);
const Performance = ref(false);

onMounted(async () => {
  isShowSettings.value = false;

  const localStorageCookieSetting = localStorage.getItem(
    "localstorage_cookie_key"
  );
  const localStorageCookieExpireAt = localStorage.getItem(
    "localstorage_cookie_expire_at_key"
  );
  if (
    localStorageCookieSetting &&
    localStorageCookieExpireAt &&
    new Date().getTime() < new Date(+localStorageCookieExpireAt).getTime()
  ) {
    if (JSON.parse(localStorageCookieSetting).Performance) {
      addClarity();
    }
  } else {
    localStorage.removeItem(localstorage_cookie_key);
    localStorage.removeItem(localstorage_cookie_expire_at_key);
    isShow.value = true;
  }
});

const accept = (state) => {
  isShow.value = false;
  isShowSettings.value = false;

  const expiredAtMs = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
  const performanceAccept = state ? true : Performance.value;

  localStorage.setItem(
    "localstorage_cookie_key",
    JSON.stringify({
      Performance: performanceAccept,
    })
  );

  localStorage.setItem("localstorage_cookie_expire_at_key", `${expiredAtMs}`);

  if (performanceAccept) {
    addClarity();
  }
};

const addClarity = () => {
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "l67iu6kvyh");
};

const handlePopupSettings = (state) => {
  //   console.log(isShow.value, state);
  isShowSettings.value = state;
};
</script>

<template>
  <div
    class="wv_cookie-consent wv_cookie-consent--banner"
    v-if="isShow && !isShowSettings"
  >
    <div class="wv_cookie-consent__container flex flex-col md:flex-row p-8">
      <!-- <div class="wv_cookie-consent__lang wv-b7 flex items-start">
        <button type="button" class="b6 px-2">ไทย</button
        ><button type="button" class="b6 px-2">EN</button>
      </div> -->
      <div class="wv_cookie-consent__body b4 md:ml-4">
        เว็บไซต์นี้ใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้งานเว็บไซต์
        โดยเราจะใช้คุกกี้เมื่อท่านเข้ามาหน้าเว็บไซต์
        คุณสามารถอ่านรายละเอียดเพิ่มเติมได้ที่
        <a
          target="_blank"
          class="text-[#a5ebd7]"
          href="https://punchup.world/cookiespolicy_1-3/"
          >นโยบายคุกกี้</a
        >
      </div>
      <div class="wv_cookie-consent__actions flex mt-5 md:mt-0">
        <button
          type="button"
          class="b4 md:ml-4"
          @click="handlePopupSettings(true)"
        >
          การตั้งค่าคุกกี้</button
        ><button type="button" class="b4 ml-4" @click="accept(true)">
          ยอมรับทั้งหมด
        </button>
      </div>
    </div>
  </div>

  <div class="wv_cookie-consent wv_cookie-consent--popup" v-if="isShowSettings">
    <button
      type="button"
      class="wv_cookie-consent__close"
      @click="handlePopupSettings(false)"
    >
      <svg width="13" height="13" viewBox="0 0 13 13">
        <rect
          x="13"
          y="1.41431"
          width="15"
          height="2"
          transform="rotate(135 13 1.41431)"
          fill="white"
        ></rect>
        <rect
          x="2.39355"
          y="0.0314941"
          width="15"
          height="2"
          transform="rotate(45 2.39355 0.0314941)"
          fill="white"
        ></rect>
      </svg>
    </button>
    <div class="wv_cookie-consent__container wv-ibmplex p-8">
      <!-- <div class="wv_cookie-consent__lang wv-b7">
        <button type="button" class="wv-kondolar">ไทย</button
        ><button type="button" class="wv-kondolar inactive">EN</button>
      </div> -->
      <div class="wv_cookie-consent__options wv-bold">
        <h2 class="b3 font-bold">การตั้งค่าคุกกี้</h2>
        <label
          ><input type="checkbox" disabled="" checked="" /><span
            >Strictly Necessary Cookies</span
          ></label
        ><label
          ><input type="checkbox" v-model="Performance" /><span
            >Performance Cookies</span
          ></label
        >
      </div>
      <div class="wv_cookie-consent__body b4 py-4">
        คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์และไม่สามารถปิดได้จากหน้าเว็บไซต์
        อย่างไรก็ตาม
        ท่านสามารถบล็อคการใช้งานคุกกี้ได้จากบราวเซอร์ของท่านซึ่งอาจจะส่งผลกระทบกับการใช้งานเว็บไซต์ได้
        คุณสามารถอ่านรายละเอียดเพิ่มเติมได้ที่
        <a
          target="_blank"
          class="text-[#a5ebd7]"
          href="https://punchup.world/cookiespolicy_1-3/"
          >นโยบายคุกกี้</a
        >
      </div>
      <div class="wv_cookie-consent__actions flex mt-5 md:mt-0">
        <button type="button" class="b4" @click="accept()">
          บันทึกการตั้งค่า</button
        ><button type="button" class="b4 ml-4" @click="accept(true)">
          ยอมรับทั้งหมด
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wv_cookie-consent {
  --tw-bg-opacity: 0.8;
  --tw-text-opacity: 1;
  background-color: rgb(0 0 0 / var(--tw-bg-opacity));
  color: rgb(255 255 255 / var(--tw-text-opacity));
  position: fixed;
  z-index: 50;
}

.wv_cookie-consent--banner {
  bottom: 0;
  left: 0;
  right: 0;

  .wv_cookie-consent__container {
    margin-left: auto;
    margin-right: auto;
    max-width: 1280px;
    width: 100%;
  }
}

.wv_cookie-consent__lang > button:not(:last-child) {
  --tw-border-opacity: 0.5;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
  border-style: solid;
  border-width: 0 1px 0 0;
}

.wv_cookie-consent__actions {
  max-width: 20rem;
  width: 100%;

  button {
    --tw-border-opacity: 1;
    border-color: rgb(255 255 255 / var(--tw-border-opacity));
    border-radius: 2px;
    border-style: solid;
    border-width: 1px;
    flex: 1 1 0%;
    padding: 0.75rem 1rem;
  }

  button:hover {
    --tw-bg-opacity: 0.2;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  }

  button:last-child {
    --tw-bg-opacity: 1;
    --tw-text-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    color: rgb(0 0 0 / var(--tw-text-opacity));
  }

  button:last-child:hover {
    --tw-border-opacity: 1;
    --tw-bg-opacity: 1;
    background-color: rgb(165 235 215 / var(--tw-bg-opacity));
    border-color: rgb(165 235 215 / var(--tw-border-opacity));
  }
}

.wv_cookie-consent--popup {
  left: 50%;
  max-width: 100vw;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;

  @include mobile {
    width: 95%;
  }
}

.wv_cookie-consent__close {
  padding: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.wv_cookie-consent__options {
  label {
    --tw-border-opacity: 0.2;
    border-color: rgb(255 255 255 / var(--tw-border-opacity));
    border-style: solid;
    border-width: 0 0 1px;
    padding-bottom: 1rem;
    padding-top: 1rem;
    align-items: center;
    display: flex;

    span {
      margin-left: 12px;
      font-weight: bold;
    }
  }
}
</style>

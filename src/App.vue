<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import router from "./router";

const offset = ref();

window.addEventListener("scroll", function () {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 298;
  offset.value = scrolled;
  scrolled > 10
    ? document
        .querySelector(".scroltop-primary")
        .classList.add("active-progress")
    : document
        .querySelector(".scroltop-primary")
        .classList.remove("active-progress");
});

const scrollTopBtn = () => {
  window.scrollTo(0, 0);
};

router.beforeEach(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="page-wraper">
    <RouterView />
    <!-- <Switcher /> -->
    <div @click="scrollTopBtn" class="scroltop-progress scroltop-primary">
      <svg width="100%" height="100%" viewBox="-1 -1 102 102">
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          :style="` transition: stroke-dashoffset 10ms linear 0s;
            stroke-dasharray: 307.919px, 307.919px;
            stroke-dashoffset:${offset + 307.919}%;`"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import MainSlider2 from "../elements/MainSlider2.vue";
import Home2BrouserMenu from "../components/Home2BrouserMenu.vue";
import backgroundPic1 from "../assets/images/background/pic1.png";
import Home2Spacial from "../elements/Home2Spacial.vue";
import Home2AreMenu from "../components/Home2AreMenu.vue";
import Home2Testimonial from "../components/Home2Testimonial.vue";
import Home2TeamSwiper from "../components/Home2TeamSwiper.vue";
import Footer2View from "../Layouts/Footer2View.vue";

// image
import bgimg from "../assets/images/background/pic10.png";
import { RouterLink } from "vue-router";
import Header2 from "../Layouts/Header2.vue";

const cards = ref([
  { icon: "flaticon-offer", title: "Discount Voucher" },
  { icon: "flaticon-hamburger", title: "Fresh Healthy Food" },
  { icon: "flaticon-room-service", title: "Fast Serve On Table" },
]);

watchEffect(function () {
  document.body.setAttribute("data-color", "color_2");
  localStorage.setItem("addbgActive", 1);
});
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <MainSlider2 />
    <section class="content-inner bg-white">
      <div class="container">
        <div class="row icon-wrapper2 gx-lg-5">
          <div
            v-for="(item, ind) in cards"
            :key="ind"
            class="col-lg-4 col-md-6 m-b30 wow fadeInUp"
          >
            <div class="icon-bx-wraper style-2">
              <div class="icon-bx radius">
                <span class="icon-cell">
                  <i :class="item.icon"></i>
                </span>
              </div>
              <div class="icon-content">
                <h5 class="dz-title">
                  <RouterLink to="/services">{{ item.title }}</RouterLink>
                </h5>
                <p>lorem ipsum dolor shit amet lorem ipsum</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content-inner-1 overflow-hidden pt-0">
      <div class="container">
        <div class="section-head menu-align">
          <h2 class="title mb-0 wow flipInX">Browse Our Menu</h2>
          <div class="pagination-align wow fadeInUp">
            <div class="menu-button-prev1 btn-prev rounded-xl btn-hover-2">
              <i class="fa-solid fa-arrow-left"></i>
            </div>
            <div class="menu-button-next1 btn-next rounded-xl btn-hover-2">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
      <Home2BrouserMenu next=".menu-button-next1" prev=".menu-button-prev1" />
    </section>
    <section
      class="section-wrapper-5 content-inner overflow-hidden bg-parallax"
      :style="` background-image: url(${backgroundPic1});
        background-attachment: fixed;`"
    >
      <div class="container">
        <div class="section-head text-center">
          <h2 class="title text-white wow flipInX">Today's Special</h2>
        </div>
        <Home2Spacial />
      </div>
    </section>
    <section class="content-inner-1">
      <div class="container">
        <div class="section-head text-center">
          <h2 class="title wow flipInX">Are Menu</h2>
        </div>
        <Home2AreMenu />
      </div>
    </section>
    <section
      class="section-wrapper-4 content-inner overflow-hidden bg-parallax"
      :style="` background-image: url(${bgimg});
        background-attachment: fixed;`"
    >
      <div class="container">
        <div class="section-head text-center">
          <h2 class="title wow flipInX">Meet The</h2>
        </div>
        <Home2TeamSwiper />
      </div>
    </section>
    <section class="content-inner-2 overflow-hidden">
      <div class="container">
        <div class="section-head text-center">
          <h2 class="title wow flipInX">Customer's Comment</h2>
        </div>
        <Home2Testimonial />
      </div>
    </section>
    <Footer2View />
  </div>
</template>

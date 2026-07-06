<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination, Parallax } from "swiper/modules";
import slide2bg1 from "../assets/images/main-slider/slider2/bg1.jpg";
import slide2bg2 from "../assets/images/main-slider/slider2/bg2.jpg";
import slide2bg3 from "../assets/images/main-slider/slider2/bg3.jpg";
import slidePic1 from "../assets/images/main-slider/slider2/pic1.png";
import slidePic2 from "../assets/images/main-slider/slider2/pic2.png";
import slidePic3 from "../assets/images/main-slider/slider2/pic3.png";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const mainCarosel = ref([
  {
    img: slide2bg1,
    smallSlide: slidePic1,
    subTitle: "High Quality Test Station",
    heading: "We believe Good Food Offer Great Smile",
    name: "Paneer Tikka",
    text: "John Doe",
    price: "$10.00",
  },
  {
    img: slide2bg2,
    smallSlide: slidePic2,
    subTitle: "The Best Food Stations",
    heading: "Bringing Joy to Your Plate With Food",
    name: "Dal Makhni",
    text: "Carry Mint",
    price: "$15.00",
  },
  {
    img: slide2bg3,
    smallSlide: slidePic3,
    subTitle: "Exploring the Delicious World",
    heading: "Food that Makes You Happy And Healthy",
    name: "Veg Biryani",
    text: "Kamy Klay",
    price: "$10.00",
  },
]);
</script>

<template>
  <div class="main-bnr-three overflow-hidden top-space">
    <div class="swiper-bnr-pagination left-align">
      <div class="main-button-prev"><i class="icon-arrow-up"></i></div>
      <div class="main-swiper3-pagination"></div>
      <div class="main-button-next"><i class="icon-arrow-down"></i></div>
    </div>
    <Swiper
      class="main-slider-3"
      direction="vertical"
      :speed="1200"
      :modules="[Parallax, Navigation, Pagination, Autoplay]"
      :parallax="true"
      :autoplay="{
        delay: 1200,
      }"
      :navigation="{
        prevEl: '.main-button-prev',
        nextEl: '.main-button-next',
      }"
      :pagination="{
        el: '.main-swiper3-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class=${className}>${index + 1}</span>`;
        },
      }"
    >
      <SwiperSlide
        class="swiper-slide"
        v-for="(item, ind) in mainCarosel"
        :key="ind"
      >
        <div
          class="banner-inner overflow-hidden"
          data-swiper-parallax="-10"
          data-swiper-parallax-duration="0.5"
          :style="` background-image: url(${item.img});
            background-size: cover;`"
        >
          <div class="container">
            <div class="row align-items-center" data-swiper-parallax="-100">
              <div class="col-xl-7 col-lg-7 col-md-8">
                <div class="banner-content">
                  <span class="sub-title text-primary"
                    >{{ item.subTitle }}
                  </span>
                  <h1 class="title text-white">
                    {{ item.heading }}
                  </h1>
                  <p class="bnr-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div class="banner-btn d-flex align-items-center">
                    <RouterLink
                      to="/contact-us"
                      class="btn btn-primary btn-md shadow-primary m-r30 btn-hover-1"
                      ><span>Book a Table</span></RouterLink
                    >
                    <RouterLink
                      to="/partenaires"
                      class="btn btn-outline-primary btn-md shadow-primary btn-hover-1"
                      ><span>View More</span></RouterLink
                    >
                  </div>
                  <div class="food-card">
                    <div class="dz-head">
                      <h5 class="text-white title">{{ item.name }}</h5>
                      <ul class="rating">
                        <li><i class="fa-solid fa-star"></i></li>
                        <li><i class="fa-solid fa-star"></i></li>
                        <li><i class="fa-solid fa-star"></i></li>
                        <li><i class="fa-solid fa-star"></i></li>
                        <li><i class="fa-solid fa-star"></i></li>
                      </ul>
                    </div>
                    <div class="dz-body">
                      <div class="dz-left">
                        <div class="profile-info">
                          <div class="dz-media">
                            <img src="../assets/images/team/pic1.jpg" alt="/" />
                          </div>
                          <div class="dz-content">
                            <h6 class="title text-white">{{ item.text }}</h6>
                            <p>Master Chief</p>
                          </div>
                        </div>
                        <p class="text">Lorem ipsum dolor shit amet...</p>
                      </div>
                      <div class="dz-right">
                        <h5 class="text-primary">{{ item.price }}</h5>
                        <RouterLink
                          to="/panier"
                          class="btn btn-primary btn-cart"
                          ><i class="flaticon-shopping-cart"></i
                        ></RouterLink>
                      </div>
                    </div>
                    <img
                      class="target-line"
                      src="../assets/images/main-slider/slider2/line.png"
                      alt="/"
                    />
                  </div>
                </div>
              </div>
              <div class="col-xl-5 col-lg-5 col-md-4">
                <div class="banner-media">
                  <img
                    :src="item.smallSlide"
                    alt="/"
                    data-swiper-parallax-scale="0.8"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            class="leaf"
            src="../assets/images/main-slider/slider2/pic4.png"
            alt="/"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

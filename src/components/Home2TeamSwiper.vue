<script setup>
import { ref } from "vue";
import teamPic1 from "../assets/images/team/pic1.jpg";
import teamPic2 from "../assets/images/team/pic2.jpg";
import teamPic3 from "../assets/images/team/pic3.jpg";
import teamPic4 from "../assets/images/team/pic4.jpg";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

const carowsel = ref([
  { img: teamPic1, name: "arah Albert", title: "Senior Chef" },
  { img: teamPic2, name: "John Doe", title: "Senior Chef" },
  { img: teamPic3, name: "emy Carline", title: "Junior Chef" },
  { img: teamPic4, name: "Cotlin Care", title: "Senior Chef" },
  { img: teamPic1, name: "arah Albert", title: "Senior Chef" },
  { img: teamPic2, name: "John Doe", title: "Senior Chef" },
  { img: teamPic3, name: "emy Carline", title: "Junior Chef" },
  { img: teamPic4, name: "Cotlin Care", title: "Senior Chef" },
]);
</script>

<template>
  <Swiper
    class="swiper team-swiper swiper-btn-lr swiper-visible swiper-item-4"
    :slides-per-view="4"
    :space-between="30"
    :modules="[Navigation]"
    :speed="1500"
    :navigation="{
      prevEl: '.team-button-prev',
      nextEl: '.team-button-next',
    }"
    :breakpoints="{
      1200: { slidesPerView: 4 },
      991: { slidesPerView: 3 },
      575: { slidesPerView: 2 },
      240: { slidesPerView: 1 },
    }"
  >
    <SwiperSlide
      class="swiper-slide"
      v-for="(item, ind) in carowsel"
      :key="ind"
    >
      <div class="dz-team style-1 m-b30 wow fadeInUp">
        <div class="dz-media">
          <img :src="item.img" alt="/" />
        </div>
        <div class="dz-content">
          <div class="clearfix">
            <h6 class="dz-name">{{ item.name }}</h6>
            <span class="dz-position">{{ item.title }}</span>
          </div>
          <ul class="team-social">
            <li>
              <a class="share-btn" href="javascript:void(0);"
                ><i class="flaticon-share"></i
              ></a>
              <ul class="sub-team-social">
                <li>
                  <a
                    class="fb-btn"
                    href="https://www.facebook.com/"
                    target="_blank"
                    ><i class="fab fa-facebook-f"></i
                  ></a>
                </li>
                <li>
                  <a class="tw-btn" href="https://twitter.com/" target="_blank"
                    ><i class="fab fa-twitter"></i
                  ></a>
                </li>
                <li>
                  <a
                    class="in-btn"
                    href="https://www.instagram.com/"
                    target="_blank"
                    ><i class="fab fa-instagram"></i
                  ></a>
                </li>
                <li>
                  <a
                    class="lin-btn"
                    href="https://www.linkedin.com/"
                    target="_blank"
                    ><i class="fa-brands fa-linkedin-in"></i
                  ></a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </SwiperSlide>
    <div class="pagination">
      <div class="team-button-prev btn-prev rounded-xl btn-hover-2">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div class="team-button-next btn-next rounded-xl btn-hover-2">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  </Swiper>
</template>

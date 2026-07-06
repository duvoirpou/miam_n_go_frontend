<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";

// image
import testimonialLargePic1 from "../assets/images/testimonial/large/pic1.jpg";
import testimonialLargePic2 from "../assets/images/testimonial/large/pic2.jpg";
import testimonialLargePic3 from "../assets/images/testimonial/large/pic3.jpg";
import { Navigation } from "swiper/modules";

const slides = ref([
  { img: testimonialLargePic1, name: "", position: "" },
  { img: testimonialLargePic2, name: "", position: "" },
  { img: testimonialLargePic3, name: "", position: "" },
]);
</script>

<template>
  <Swiper
    class="swiper testimonial-two-swiper swiper-btn-lr swiper-single swiper-visible"
    :speed="1500"
    :modules="[Navigation]"
    :navigation="{
      prevEl: '.btn-prev',
      nextEl: '.btn-next',
    }"
  >
    <SwiperSlide class="swiper-slide" v-for="(item, ind) in slides" :key="ind">
      <div class="testimonial-2">
        <div class="dz-media">
          <img :src="item.img" alt="/" />
        </div>
        <div class="testimonial-detail">
          <div class="testimonial-text wow fadeInUp" data-wow-delay="0.4s">
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.
            </p>
          </div>
          <div class="testimonial-info wow fadeInUp" data-wow-delay="0.6s">
            <h5 class="testimonial-name">{{ item.name }}</h5>
            <span class="testimonial-position">{{ item.position }}</span>
          </div>
          <i class="flaticon-right-quote quote"></i>
        </div>
      </div>
    </SwiperSlide>
    <div class="pagination">
      <div class="testimonial-2-button-prev btn-prev rounded-xl btn-hover-2">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div class="testimonial-2-button-next btn-next rounded-xl btn-hover-2">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  </Swiper>
</template>

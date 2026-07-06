<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import menuSmallPic1 from "../assets/images/menu-small/pic1.png";
import menuSmallPic2 from "../assets/images/menu-small/pic2.png";
import menuSmallPic3 from "../assets/images/menu-small/pic3.png";
import menuSmallPic4 from "../assets/images/menu-small/pic4.png";
import menuSmallPic5 from "../assets/images/menu-small/pic5.png";
import menuSmallPic6 from "../assets/images/menu-small/pic6.png";

const menus = ref([
  { name: "Burger", img: menuSmallPic1, price: "$10.00" },
  { name: "Hot Rice", img: menuSmallPic2, price: "$15.00" },
  { name: "Momos", img: menuSmallPic3, price: "$10.00" },
  { name: "Pasta", img: menuSmallPic4, price: "$25.00" },
  { name: "Panner", img: menuSmallPic5, price: "$20.00" },
  { name: "Soya Rice", img: menuSmallPic6, price: "$90.00" },
  { name: "Burger", img: menuSmallPic1, price: "$10.00" },
  { name: "Hot Rice", img: menuSmallPic2, price: "$15.00" },
]);

defineProps({
  next: String,
  prev: String,
});
</script>

<template>
  <div class="container">
    <Swiper
      class="swiper menu-swiper swiper-visible swiper-item-4"
      :slides-per-view="4"
      :space-between="30"
      :loop="true"
      :modules="[Autoplay, Navigation]"
      :speed="1500"
      :autoplay="{ delay: 1500 }"
      :navigation="{
        nextEl: next,
        prevEl: prev,
      }"
      :breakpoints="{
        1200: { slidesPerView: 4 },
        991: { slidesPerView: 3 },
        575: { slidesPerView: 2 },
        240: { slidesPerView: 1 },
      }"
    >
      <SwiperSlide class="swiper-slide" v-for="(item, ind) in menus" :key="ind">
        <div class="dz-img-box style-4 box-hover wow fadeInUp">
          <div class="menu-detail">
            <div class="dz-media">
              <img :src="item.img" alt="/" />
            </div>
            <div class="dz-content">
              <h6 class="title">
                <RouterLink to="/partenaires">{{ item.name }}</RouterLink>
              </h6>
              <p>Delicious and Spicy</p>
            </div>
          </div>
          <div class="menu-footer">
            <span>Regular Price</span>
            <span class="price">{{ item.price }}</span>
          </div>
          <RouterLink class="detail-btn" to="/partenaires"
            ><i class="fa-solid fa-plus"></i
          ></RouterLink>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import galleryGridPic1 from "../assets/images/gallery/grid3/pic1.jpg";
import galleryGridPic2 from "../assets/images/gallery/grid3/pic2.jpg";
import galleryGridPic3 from "../assets/images/gallery/grid3/pic3.jpg";
import galleryGridPic4 from "../assets/images/gallery/grid3/pic4.jpg";

const spacialmenu = ref([
  {
    img: galleryGridPic1,
    name: "Pizza",
    weight: "756g",
    title: "Pepperoni",
    price: "$15.00",
  },
  {
    img: galleryGridPic2,
    name: "Pancake",
    weight: "756g",
    title: "Pancake stack",
    price: "$18.00",
  },
  {
    img: galleryGridPic3,
    name: "Salad",
    weight: "756g",
    title: "Halumini",
    price: "$10.00",
  },
  {
    img: galleryGridPic4,
    name: "Egg",
    weight: "756g",
    title: "Eggs",
    price: "$12.00",
  },
]);
</script>

<template lang="">
  <div class="row">
    <div
      class="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
      v-for="(item, ind) in spacialmenu"
      :key="ind"
    >
      <div class="dz-img-box style-5">
        <div class="dz-content">
          <div class="weight">
            <span>{{ item.name }}</span>
            <span>{{ item.weight }}</span>
          </div>
          <div class="price">
            <h6>{{ item.title }}</h6>
            <h6 class="text-primary">{{ item.price }}</h6>
          </div>
        </div>
        <div class="dz-media">
          <img :src="item.img" alt="/" />
          <RouterLink class="detail-btn" to="/partenaires"
            ><i class="fa-solid fa-plus"></i
          ></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MainSlider2 from "../elements/MainSlider2.vue";
import Home2BrouserMenu from "../components/Home2BrouserMenu.vue";
import backgroundPic1 from "../assets/images/background/pic1.png";
import Home2Spacial from "../elements/Home2Spacial.vue";
import Home2AreMenu from "../components/Home2AreMenu.vue";
import Home2Testimonial from "../components/Home2Testimonial.vue";
import Footer2View from "../Layouts/Footer2View.vue";

import { RouterLink } from "vue-router";
import Header2 from "../Layouts/Header2.vue";

const cards = ref([
  {
    icon: "flaticon-offer",
    title: "Bons de réduction",
    text: "Profitez de réductions exclusives chez nos partenaires.",
  },
  {
    icon: "flaticon-hamburger",
    title: "Plats frais et sains",
    text: "Des ingrédients de qualité préparés chaque jour par nos partenaires.",
  },
  {
    icon: "flaticon-room-service",
    title: "Livraison rapide",
    text: "Vos plats livrés chauds, en un minimum de temps.",
  },
]);
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
                  <RouterLink to="/partenaires">{{ item.title }}</RouterLink>
                </h5>
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="content-inner-1 overflow-hidden pt-0">
      <div class="container">
        <div class="section-head menu-align">
          <h2 class="title mb-0 wow flipInX">Découvrez notre menu</h2>
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
          <h2 class="title text-white wow flipInX">Spécialités du moment</h2>
        </div>
        <Home2Spacial />
      </div>
    </section>
    <section class="content-inner-1">
      <div class="container">
        <div class="section-head text-center">
          <h2 class="title wow flipInX">Notre menu</h2>
        </div>
        <Home2AreMenu />
      </div>
    </section>
    <section class="content-inner-2 overflow-hidden">
      <div class="container">
        <div class="section-head text-center">
          <h2 class="title wow flipInX">Avis de nos clients</h2>
        </div>
        <Home2Testimonial />
      </div>
    </section>
    <Footer2View />
  </div>
</template>

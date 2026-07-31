<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import { getProducts } from "@/services/products";
import { formatPrice } from "@/utils/currency";
import placeholderImg from "@/assets/images/shop/pic1.jpg";

defineProps({
  next: String,
  prev: String,
});

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    products.value = await getProducts();
  } catch (err) {
    products.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container">
    <div v-if="loading" class="text-center py-4">Chargement…</div>
    <div v-else-if="!products.length" class="text-center py-4">
      Aucun produit disponible pour le moment.
    </div>
    <Swiper
      v-else
      class="swiper menu-swiper swiper-visible swiper-item-4"
      :slides-per-view="4"
      :space-between="30"
      :loop="products.length > 4"
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
      <SwiperSlide
        class="swiper-slide"
        v-for="item in products"
        :key="item.id_products"
      >
        <div class="dz-img-box style-4 box-hover wow fadeInUp">
          <div class="menu-detail">
            <div class="dz-media">
              <img :src="item.image || placeholderImg" alt="/" />
            </div>
            <div class="dz-content">
              <h6 class="title">
                <RouterLink :to="`/produit/${item.slug || item.id_products}`">{{
                  item.label_products
                }}</RouterLink>
              </h6>
              <p>{{ item.partner?.label_partners }}</p>
            </div>
          </div>
          <div class="menu-footer">
            <span>Prix</span>
            <span class="price">{{ formatPrice(item.price) }}</span>
          </div>
          <RouterLink
            class="detail-btn"
            :to="`/produit/${item.slug || item.id_products}`"
            ><i class="fa-solid fa-plus"></i
          ></RouterLink>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

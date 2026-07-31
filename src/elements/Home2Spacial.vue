<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { getProducts } from "@/services/products";
import { formatPrice } from "@/utils/currency";
import placeholderImg from "@/assets/images/shop/pic1.jpg";

const specials = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    specials.value = await getProducts({ isSpecial: true });
  } catch (err) {
    specials.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template lang="">
  <div v-if="loading" class="text-center text-white py-4">Chargement…</div>
  <div v-else-if="!specials.length" class="text-center text-white py-4">
    Aucune spécialité du moment pour l'instant.
  </div>
  <div v-else class="row">
    <div
      class="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
      v-for="item in specials"
      :key="item.id"
    >
      <div class="dz-img-box style-5">
        <div class="dz-content">
          <div class="weight">
            <span>{{ item.partner?.label_partners }}</span>
            <span>{{ item.category?.label_category }}</span>
          </div>
          <div class="price">
            <h6>{{ item.label_products }}</h6>
            <h6 class="text-primary">
              {{ formatPrice(item.price) }}
            </h6>
          </div>
        </div>
        <div class="dz-media">
          <img :src="item.image || placeholderImg" alt="/" />
          <RouterLink
            class="detail-btn"
            :to="`/produit/${item.slug || item.id}`"
            ><i class="fa-solid fa-plus"></i
          ></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

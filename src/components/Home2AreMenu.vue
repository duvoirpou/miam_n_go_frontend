<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { getProducts } from "@/services/products";
import { getCategories } from "@/services/categories";
import { formatPrice } from "@/utils/currency";
import placeholderImg from "@/assets/images/shop/pic1.jpg";

const products = ref([]);
const categories = ref([]);
const activeCategory = ref(null);
const loading = ref(true);

const filteredProducts = computed(() => {
  if (activeCategory.value === null) return products.value;
  return products.value.filter(
    (item) => item.category_id === activeCategory.value
  );
});

onMounted(async () => {
  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
    products.value = productsData;
    categories.value = categoriesData;
  } catch (err) {
    products.value = [];
    categories.value = [];
  } finally {
    loading.value = false;
  }
});

function filterByCategory(id) {
  activeCategory.value = id;
}
</script>

<template>
  <div class="row">
    <div class="col-lg-12 text-center wow fadeInUp">
      <div class="site-filters style-2 clearfix">
        <ul class="filters">
          <li :class="`btn ${activeCategory === null ? 'active' : ''}`">
            <a @click="filterByCategory(null)" href="javascript:void(0);"
              ><span><i class="flaticon-fast-food"></i></span>Tout</a
            >
          </li>
          <li
            v-for="category in categories"
            :key="category.id"
            :class="`btn ${
              activeCategory === category.id ? 'active' : ''
            }`"
          >
            <a
              @click="filterByCategory(category.id)"
              href="javascript:void(0);"
              ><span><i class="flaticon-restaurant"></i></span
              >{{ category.label_category }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div v-if="loading" class="col-lg-12 text-center py-4">Chargement…</div>
    <div v-else-if="!filteredProducts.length" class="col-lg-12 text-center py-4">
      Aucun produit disponible dans cette catégorie.
    </div>
    <div v-else class="clearfix">
      <ul id="masonry" class="row dlab-gallery-listing gallery">
        <li
          class="card-container col-lg-6 col-md-6 m-b5"
          v-for="item in filteredProducts"
          :key="item.id"
        >
          <div class="dz-img-box style-6 wow fadeInUp">
            <div class="dz-media">
              <img :src="item.image || placeholderImg" alt="/" />
            </div>
            <div class="dz-content">
              <div class="dz-head">
                <span class="header-text"
                  ><RouterLink :to="`/produit/${item.slug || item.id}`">{{
                    item.label_products
                  }}</RouterLink></span
                >
                <span class="img-line"></span>
                <span class="header-price"
                  >{{ formatPrice(item.price) }}</span
                >
              </div>
              <p class="dz-body">
                {{ item.partner?.label_partners }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

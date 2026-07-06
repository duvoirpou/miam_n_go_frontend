<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import CommonBanner from "../elements/CommonBanner.vue";
import ProductCard from "../elements/ProductCard.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import { getPartner } from "@/services/partners";
import { getCategories } from "@/services/categories";
import { getProducts } from "@/services/products";

const route = useRoute();

const partner = ref(null);
const categories = ref([]);
const products = ref([]);
const activeCategory = ref(null);
const loading = ref(true);
const error = ref(null);

const filteredProducts = computed(() => {
  if (!activeCategory.value) return products.value;
  return products.value.filter(
    (product) => product.id_category === activeCategory.value
  );
});

async function loadData(partnerId) {
  loading.value = true;
  error.value = null;
  try {
    const [partnerData, categoriesData, productsData] = await Promise.all([
      getPartner(partnerId),
      getCategories(partnerId),
      getProducts({ partnerId }),
    ]);
    partner.value = partnerData;
    categories.value = categoriesData;
    products.value = productsData;
    activeCategory.value = null;
  } catch (err) {
    error.value = "Impossible de charger ce partenaire pour le moment.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => loadData(route.params.id));
watch(
  () => route.params.id,
  (id) => loadData(id)
);
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner
      :img="bgimg"
      :heading="partner?.label_partners || 'Partenaire'"
      title="Menu"
    />
    <section class="content-inner-1">
      <div class="container">
        <div v-if="loading" class="text-center">Chargement…</div>
        <div v-else-if="error" class="text-center text-danger">{{ error }}</div>
        <template v-else>
          <div class="section-head menu-align" v-if="categories.length">
            <div class="site-button-group">
              <button
                :class="`btn btn-outline-secondary btn-hover-2 m-r10 ${
                  activeCategory === null ? 'active' : ''
                }`"
                @click="activeCategory = null"
              >
                Tout
              </button>
              <button
                v-for="category in categories"
                :key="category.id_category"
                :class="`btn btn-outline-secondary btn-hover-2 m-r10 ${
                  activeCategory === category.id_category ? 'active' : ''
                }`"
                @click="activeCategory = category.id_category"
              >
                {{ category.label_category }}
              </button>
            </div>
          </div>
          <div v-if="!filteredProducts.length" class="text-center">
            Aucun produit disponible dans cette catégorie.
          </div>
          <div v-else class="row">
            <div
              class="col-lg-3 col-md-6 col-sm-6 m-b30"
              v-for="product in filteredProducts"
              :key="product.id_products"
            >
              <ProductCard
                :product="{
                  id: product.id_products,
                  label_products: product.label_products,
                  price: product.price,
                  image: product.image,
                  partner_id: partner?.id_partners,
                }"
              />
            </div>
          </div>
        </template>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

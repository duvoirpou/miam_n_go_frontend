<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import placeholderImg from "@/assets/images/shop/pic1.jpg";
import CommonBanner from "../elements/CommonBanner.vue";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { getProduct } from "@/services/products";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const quantity = ref(1);

async function loadProduct(id) {
  loading.value = true;
  error.value = null;
  try {
    product.value = await getProduct(id);
    quantity.value = 1;
  } catch (err) {
    error.value = "Impossible de charger ce produit pour le moment.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => loadProduct(route.params.id));
watch(
  () => route.params.id,
  (id) => loadProduct(id)
);

function productQuantityBtn(action) {
  if (action === "up" && quantity.value < 20) quantity.value += 1;
  if (action === "down" && quantity.value > 1) quantity.value -= 1;
}

function addToCart() {
  try {
    cartStore.addItem(
      {
        id: product.value.id_products,
        label_products: product.value.label_products,
        price: product.value.price,
        partner_id: product.value.id_partners,
      },
      quantity.value
    );
    router.push("/panier");
  } catch (err) {
    alert(err.message);
  }
}
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Détail du produit" title="Produit" />
    <section class="content-inner-1 overflow-hidden">
      <div class="container">
        <div v-if="loading" class="text-center">Chargement…</div>
        <div v-else-if="error" class="text-center text-danger">{{ error }}</div>
        <div v-else-if="product" class="row product-detail">
          <div class="col-lg-4 col-md-5">
            <div class="detail-media m-b30">
              <img :src="product.image || placeholderImg" alt="/" />
            </div>
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="detail-info">
              <div class="dz-head">
                <h2 class="title">{{ product.label_products }}</h2>
              </div>
              <ul class="detail-list">
                <li>
                  Prix
                  <span class="text-primary m-t5"
                    >{{ Number(product.price).toFixed(2) }} €</span
                  >
                </li>
                <li>
                  Quantité
                  <div class="btn-quantity style-1 m-t5">
                    <div class="input-group bootstrap-touchspin">
                      <input
                        type="text"
                        :value="quantity"
                        readonly
                        class="form-control"
                        style="display: block"
                      /><span class="input-group-btn-vertical"
                        ><button
                          @click="productQuantityBtn('up')"
                          class="btn btn-default bootstrap-touchspin-up"
                          type="button"
                        >
                          <i class="ti-plus"></i></button
                        ><button
                          @click="productQuantityBtn('down')"
                          class="btn btn-default bootstrap-touchspin-down"
                          type="button"
                        >
                          <i class="ti-minus"></i></button
                      ></span>
                    </div>
                  </div>
                </li>
              </ul>
              <ul class="modal-btn-group">
                <li>
                  <button
                    @click="addToCart"
                    class="btn btn-primary btn-hover-1"
                  >
                    <span
                      >Ajouter au panier
                      <i class="flaticon-shopping-bag-1 m-l10"></i
                    ></span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

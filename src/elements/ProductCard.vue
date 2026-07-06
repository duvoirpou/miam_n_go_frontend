<script setup>
import { RouterLink } from "vue-router";
import placeholderImg from "@/assets/images/shop/pic1.jpg";
import { useCartStore } from "@/stores/cart";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

function onAddToCart() {
  try {
    cartStore.addItem(props.product, 1);
  } catch (err) {
    alert(err.message);
  }
}
</script>

<template>
  <div class="dz-img-box style-2 box-hover">
    <div class="dz-media">
      <img :src="product.image || placeholderImg" alt="/" />
    </div>
    <div class="dz-content">
      <h4 class="dz-title">
        <RouterLink :to="`/produit/${product.id}`">{{
          product.label_products
        }}</RouterLink>
      </h4>
      <h5 class="dz-price text-primary">{{ Number(product.price).toFixed(2) }} €</h5>
      <button class="btn btn-primary btn-hover-2" @click="onAddToCart">
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

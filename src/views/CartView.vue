<script setup>
import { RouterLink } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "../assets/images/banner/bnr4.jpg";
import placeholderImg from "@/assets/images/shop/pic1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

function cartCounterBtn(action, productId, quantity) {
  if (action === "increment") {
    cartStore.updateQuantity(productId, quantity + 1);
  } else if (action === "decrement") {
    cartStore.updateQuantity(productId, quantity - 1);
  } else if (action === "delete") {
    cartStore.removeItem(productId);
  }
}
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Mon panier" title="Panier" />
    <section class="content-inner-1">
      <div class="container">
        <div v-if="!cartStore.items.length" class="text-center">
          <p>Votre panier est vide.</p>
          <RouterLink to="/partenaires" class="btn btn-primary btn-hover-2"
            >Voir les partenaires</RouterLink
          >
        </div>
        <div v-else class="row justify-content-center">
          <div class="col-lg-6">
            <aside class="side-bar">
              <div class="shop-filter style-1">
                <div class="widget-title">
                  <h5 class="title m-b30">
                    Panier
                    <span class="text-primary"
                      >({{ cartStore.totalItems }})</span
                    >
                  </h5>
                </div>
                <div
                  class="cart-item style-1"
                  v-for="item in cartStore.items"
                  :key="item.product_id"
                >
                  <div class="dz-media">
                    <img :src="placeholderImg" alt="/" />
                  </div>
                  <div class="dz-content">
                    <div class="dz-head">
                      <h6 class="title mb-0">{{ item.label }}</h6>
                      <a
                        href="javascript:void(0);"
                        @click="cartCounterBtn('delete', item.product_id)"
                        ><i class="fa-solid fa-xmark text-danger"></i
                      ></a>
                    </div>
                    <div class="dz-body">
                      <div class="btn-quantity style-1">
                        <div class="input-group bootstrap-touchspin">
                          <input
                            type="text"
                            :value="item.quantity"
                            readonly
                            class="form-control"
                            style="display: block"
                          /><span class="input-group-btn-vertical"
                            ><button
                              class="btn btn-default bootstrap-touchspin-up"
                              type="button"
                              @click="
                                cartCounterBtn(
                                  'increment',
                                  item.product_id,
                                  item.quantity
                                )
                              "
                            >
                              <i class="ti-plus"></i></button
                            ><button
                              class="btn btn-default bootstrap-touchspin-down"
                              type="button"
                              @click="
                                cartCounterBtn(
                                  'decrement',
                                  item.product_id,
                                  item.quantity
                                )
                              "
                            >
                              <i class="ti-minus"></i></button
                          ></span>
                        </div>
                      </div>
                      <h5 class="price text-primary mb-0">
                        {{ (item.unit_price * item.quantity).toFixed(2) }} €
                      </h5>
                    </div>
                  </div>
                </div>
                <div class="order-detail">
                  <h6>Total</h6>
                  <table>
                    <tbody>
                      <tr class="total">
                        <td><h6>Total à payer</h6></td>
                        <td class="price text-primary">
                          {{ cartStore.totalPrice.toFixed(2) }} €
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <RouterLink
                    to="/commande"
                    class="btn btn-primary d-block text-center btn-md w-100 btn-hover-1"
                    ><span
                      >Commander <i class="fa-solid fa-arrow-right"></i></span
                  ></RouterLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

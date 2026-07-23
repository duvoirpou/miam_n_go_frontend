<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr3.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { useCartStore } from "@/stores/cart";
import { createOrder } from "@/services/orders";
import { createPayment } from "@/services/payments";

const router = useRouter();
const cartStore = useCartStore();

const areaDelivery = ref("");
const paymentType = ref("CASH_ON_DELIVERY");
const phonePayment = ref("");
const submitting = ref(false);
const error = ref(null);

async function submitOrder() {
  if (!areaDelivery.value) {
    error.value = "Merci de renseigner votre adresse de livraison.";
    return;
  }
  if (!phonePayment.value) {
    error.value = "Merci de renseigner le numéro utilisé pour le paiement.";
    return;
  }
  submitting.value = true;
  error.value = null;
  try {
    const order = await createOrder({
      products: cartStore.items.map((item) => ({
        id_products: item.product_id,
        quantity: item.quantity,
      })),
    });
    await createPayment({
      id_orders: order.id_orders,
      type: paymentType.value,
      phone_payment: phonePayment.value,
      transaction: `WEB-${order.id_orders}-${Date.now()}`,
      response: "OK",
      status_transaction: "SUCCESS",
    });
    cartStore.clear();
    router.push(`/commande/confirmation/${order.id_orders}`);
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Impossible de valider la commande pour le moment. Merci de réessayer.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Commande" title="Commande" />
    <section class="content-inner">
      <div class="container">
        <div v-if="!cartStore.items.length" class="text-center">
          <p>Votre panier est vide.</p>
        </div>
        <form v-else class="shop-form" @submit.prevent="submitOrder">
          <div class="row">
            <div class="col-lg-6">
              <div class="widget">
                <h4 class="widget-title">Livraison</h4>
                <div class="form-group m-b20">
                  <label>Adresse de livraison</label>
                  <textarea
                    v-model="areaDelivery"
                    class="form-control"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div class="form-group m-b20">
                  <label>Mode de paiement</label>
                  <select v-model="paymentType" class="form-control">
                    <option value="CASH_ON_DELIVERY">
                      Paiement à la livraison
                    </option>
                    <option value="MOBILE_MONEY">Mobile Money</option>
                  </select>
                </div>
                <div class="form-group m-b20">
                  <label>Numéro de téléphone pour le paiement</label>
                  <input
                    v-model="phonePayment"
                    type="tel"
                    class="form-control"
                    required
                  />
                </div>
                <p v-if="error" class="text-danger">{{ error }}</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="widget">
                <h4 class="widget-title">Récapitulatif</h4>
                <table class="w-100">
                  <tbody>
                    <tr v-for="item in cartStore.items" :key="item.product_id">
                      <td>{{ item.label }} × {{ item.quantity }}</td>
                      <td class="price text-primary text-end">
                        {{ (item.unit_price * item.quantity).toFixed(2) }} €
                      </td>
                    </tr>
                    <tr class="total">
                      <td><h6>Total</h6></td>
                      <td class="price text-primary text-end">
                        {{ cartStore.totalPrice.toFixed(2) }} €
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  type="submit"
                  class="btn btn-primary d-block text-center btn-md w-100 btn-hover-1 m-t20"
                  :disabled="submitting"
                >
                  <span>{{
                    submitting ? "Validation…" : "Valider la commande"
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { getOrders } from "@/services/orders";

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    orders.value = await getOrders();
  } catch (err) {
    error.value = "Impossible de charger vos commandes pour le moment.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Mes commandes" title="Commandes" />
    <section class="content-inner-1">
      <div class="container">
        <div v-if="loading" class="text-center">Chargement…</div>
        <div v-else-if="error" class="text-center text-danger">{{ error }}</div>
        <div v-else-if="!orders.length" class="text-center">
          Vous n'avez pas encore passé de commande.
          <RouterLink to="/partenaires">Découvrir nos partenaires</RouterLink>
        </div>
        <table v-else class="table-bordered check-tbl w-100">
          <thead>
            <tr>
              <th>Référence</th>
              <th>Prix</th>
              <th>Statut commande</th>
              <th>Statut livraison</th>
              <th>Statut paiement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id_orders">
              <td>{{ order.reference }}</td>
              <td>{{ Number(order.price).toFixed(2) }} €</td>
              <td>{{ order.status_order }}</td>
              <td>{{ order.status_delivery }}</td>
              <td>{{ order.status_payment }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { getProducts } from "@/services/products";
import { getOrders } from "@/services/orders";
import { getPayments } from "@/services/payments";
import { getDeliveries } from "@/services/deliveries";

const loading = ref(true);
const error = ref(null);
const stats = ref({
  products: 0,
  orders: 0,
  pendingOrders: 0,
  payments: 0,
  paidPayments: 0,
  deliveries: 0,
  pendingDeliveries: 0,
});

onMounted(async () => {
  try {
    const [products, orders, payments, deliveries] = await Promise.all([
      getProducts(),
      getOrders(),
      getPayments(),
      getDeliveries(),
    ]);
    stats.value = {
      products: products.length,
      orders: orders.length,
      pendingOrders: orders.filter((o) => o.status_order === "PENDING")
        .length,
      payments: payments.length,
      paidPayments: payments.filter((p) => p.status === "PAID").length,
      deliveries: deliveries.length,
      pendingDeliveries: deliveries.filter(
        (d) => d.status !== "DELIVERED" && d.status !== "CANCELLED"
      ).length,
    };
  } catch (err) {
    error.value = "Impossible de charger les statistiques.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <AdminLayout>
    <h2 class="mb-4">Tableau de bord</h2>
    <div v-if="loading" class="text-center py-5">Chargement…</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-else class="row g-3">
      <div class="col-md-4 col-lg-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Produits</div>
            <div class="fs-3 fw-bold">{{ stats.products }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Commandes</div>
            <div class="fs-3 fw-bold">{{ stats.orders }}</div>
            <div class="small text-warning">
              {{ stats.pendingOrders }} en attente
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Paiements</div>
            <div class="fs-3 fw-bold">{{ stats.payments }}</div>
            <div class="small text-success">
              {{ stats.paidPayments }} payés
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-lg-3">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="text-muted small">Livraisons</div>
            <div class="fs-3 fw-bold">{{ stats.deliveries }}</div>
            <div class="small text-warning">
              {{ stats.pendingDeliveries }} en cours
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

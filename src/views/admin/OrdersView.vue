<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { getOrders, updateOrder } from "@/services/orders";

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
];

const orders = ref([]);
const loading = ref(true);
const error = ref(null);
const savingId = ref(null);

async function loadOrders() {
  loading.value = true;
  error.value = null;
  try {
    orders.value = await getOrders();
  } catch (err) {
    error.value = "Impossible de charger les commandes.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadOrders);

async function onStatusChange(order, newStatus) {
  savingId.value = order.id_orders;
  error.value = null;
  try {
    const updated = await updateOrder(order.id_orders, {
      status_order: newStatus,
    });
    const index = orders.value.findIndex(
      (o) => o.id_orders === order.id_orders
    );
    if (index !== -1) orders.value[index] = updated;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Impossible de mettre à jour le statut de la commande.";
  } finally {
    savingId.value = null;
  }
}
</script>

<template>
  <AdminLayout>
    <h2 class="mb-4">Commandes</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="loading" class="text-center py-5">Chargement…</div>
    <div v-else class="table-responsive">
      <table class="table table-bordered bg-white align-middle">
        <thead class="table-light">
          <tr>
            <th>Référence</th>
            <th>Client</th>
            <th>Prix</th>
            <th>Statut commande</th>
            <th>Statut paiement</th>
            <th>Statut livraison</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!orders.length">
            <td colspan="6" class="text-center text-muted py-4">
              Aucune commande pour le moment.
            </td>
          </tr>
          <tr v-for="order in orders" :key="order.id_orders">
            <td>{{ order.reference }}</td>
            <td>
              {{ order.customer?.first_name_customers }}
              {{ order.customer?.last_name_customers }}
            </td>
            <td>{{ Number(order.price).toFixed(2) }} €</td>
            <td>
              <select
                class="form-select form-select-sm"
                :value="order.status_order"
                :disabled="savingId === order.id_orders"
                @change="onStatusChange(order, $event.target.value)"
              >
                <option v-for="status in ORDER_STATUSES" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </td>
            <td>
              <span class="badge bg-secondary">{{ order.status_payment }}</span>
            </td>
            <td>
              <span class="badge bg-secondary">{{ order.status_delivery }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

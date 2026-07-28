<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import { getPayments, updatePayment } from "@/services/payments";

const PAYMENT_STATUSES = [
  "PENDING",
  "PROCESSING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "CANCELLED",
];

const payments = ref([]);
const loading = ref(true);
const error = ref(null);
const savingId = ref(null);

async function loadPayments() {
  loading.value = true;
  error.value = null;
  try {
    payments.value = await getPayments();
  } catch (err) {
    error.value = "Impossible de charger les paiements.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadPayments);

async function onStatusChange(payment, newStatus) {
  savingId.value = payment.id_payment;
  error.value = null;
  try {
    const updated = await updatePayment(payment.id_payment, {
      status: newStatus,
    });
    const index = payments.value.findIndex(
      (p) => p.id_payment === payment.id_payment
    );
    if (index !== -1) payments.value[index] = updated;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Impossible de mettre à jour le statut du paiement.";
  } finally {
    savingId.value = null;
  }
}

function statusBadgeClass(status) {
  if (status === "PAID") return "bg-success";
  if (status === "FAILED" || status === "CANCELLED") return "bg-danger";
  return "bg-warning text-dark";
}
</script>

<template>
  <AdminLayout>
    <h2 class="mb-4">Paiements</h2>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="loading" class="text-center py-5">Chargement…</div>
    <div v-else class="table-responsive">
      <table class="table table-bordered bg-white align-middle">
        <thead class="table-light">
          <tr>
            <th>Référence</th>
            <th>Commande</th>
            <th>Type</th>
            <th>Téléphone</th>
            <th>Transaction</th>
            <th>Statut transaction</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!payments.length">
            <td colspan="7" class="text-center text-muted py-4">
              Aucun paiement pour le moment.
            </td>
          </tr>
          <tr v-for="payment in payments" :key="payment.id_payment">
            <td>{{ payment.reference }}</td>
            <td>{{ payment.order?.reference ?? "—" }}</td>
            <td>{{ payment.type }}</td>
            <td>{{ payment.phone_payment ?? "—" }}</td>
            <td>{{ payment.transaction ?? "—" }}</td>
            <td>
              <span class="badge" :class="statusBadgeClass(payment.status_transaction)">
                {{ payment.status_transaction }}
              </span>
            </td>
            <td>
              <select
                class="form-select form-select-sm"
                :value="payment.status"
                :disabled="savingId === payment.id_payment"
                @change="onStatusChange(payment, $event.target.value)"
              >
                <option v-for="status in PAYMENT_STATUSES" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

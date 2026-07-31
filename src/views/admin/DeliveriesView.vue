<script setup>
import { ref, onMounted, reactive } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {
  getDeliveries,
  createDelivery,
  updateDelivery,
} from "@/services/deliveries";
import { getOrders } from "@/services/orders";

const DELIVERY_STATUSES = [
  "PENDING",
  "ASSIGNED",
  "PICKED_UP",
  "ON_THE_WAY",
  "DELIVERED",
  "FAILED",
  "CANCELLED",
];

const deliveries = ref([]);
const orders = ref([]);
const loading = ref(true);
const error = ref(null);
const savingId = ref(null);
const saving = ref(false);
const formError = ref(null);

const showForm = ref(false);
const form = reactive({ order_id: "", area_delivery: "", status: "PENDING" });

async function loadAll() {
  loading.value = true;
  error.value = null;
  try {
    const [deliveriesData, ordersData] = await Promise.all([
      getDeliveries(),
      getOrders(),
    ]);
    deliveries.value = deliveriesData;
    orders.value = ordersData;
  } catch (err) {
    error.value = "Impossible de charger les livraisons.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadAll);

function ordersWithoutDelivery() {
  const deliveredOrderIds = new Set(
    deliveries.value.map((d) => String(d.order_id))
  );
  return orders.value.filter((o) => !deliveredOrderIds.has(String(o.id)));
}

function openCreateForm() {
  form.order_id = "";
  form.area_delivery = "";
  form.status = "PENDING";
  formError.value = null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
}

async function submitForm() {
  saving.value = true;
  formError.value = null;
  try {
    await createDelivery({
      order_id: Number(form.order_id),
      area_delivery: form.area_delivery,
      status: form.status,
    });
    closeForm();
    await loadAll();
  } catch (err) {
    formError.value =
      err.response?.data?.message || "Impossible de créer la livraison.";
  } finally {
    saving.value = false;
  }
}

async function onStatusChange(delivery, newStatus) {
  savingId.value = delivery.id;
  error.value = null;
  try {
    const updated = await updateDelivery(delivery.id, {
      status: newStatus,
    });
    const index = deliveries.value.findIndex(
      (d) => d.id === delivery.id
    );
    if (index !== -1) deliveries.value[index] = updated;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Impossible de mettre à jour le statut de la livraison.";
  } finally {
    savingId.value = null;
  }
}
</script>

<template>
  <AdminLayout>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Livraisons</h2>
      <button class="btn btn-primary" @click="openCreateForm">
        + Nouvelle livraison
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="showForm" class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Nouvelle livraison</h5>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-4">
              <label class="form-label">Commande</label>
              <select v-model="form.order_id" class="form-select" required>
                <option value="" disabled>Choisir…</option>
                <option
                  v-for="order in ordersWithoutDelivery()"
                  :key="order.id"
                  :value="order.id"
                >
                  {{ order.reference }}
                </option>
              </select>
            </div>
            <div class="col-md-5">
              <label class="form-label">Zone de livraison</label>
              <input
                v-model="form.area_delivery"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-3">
              <label class="form-label">Statut initial</label>
              <select v-model="form.status" class="form-select">
                <option v-for="status in DELIVERY_STATUSES" :key="status" :value="status">
                  {{ status }}
                </option>
              </select>
            </div>
          </div>
          <p v-if="formError" class="text-danger mt-3 mb-0">{{ formError }}</p>
          <div class="mt-3 d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? "Création…" : "Créer la livraison" }}
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="closeForm"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">Chargement…</div>
    <div v-else class="table-responsive">
      <table class="table table-bordered bg-white align-middle">
        <thead class="table-light">
          <tr>
            <th>Référence</th>
            <th>Commande</th>
            <th>Zone</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!deliveries.length">
            <td colspan="4" class="text-center text-muted py-4">
              Aucune livraison pour le moment.
            </td>
          </tr>
          <tr v-for="delivery in deliveries" :key="delivery.id">
            <td>{{ delivery.reference }}</td>
            <td>{{ delivery.order?.reference ?? "—" }}</td>
            <td>{{ delivery.area_delivery }}</td>
            <td>
              <select
                class="form-select form-select-sm"
                :value="delivery.status"
                :disabled="savingId === delivery.id"
                @change="onStatusChange(delivery, $event.target.value)"
              >
                <option v-for="status in DELIVERY_STATUSES" :key="status" :value="status">
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

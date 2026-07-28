<script setup>
import { ref, onMounted, reactive } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categories";

const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const saving = ref(false);
const formError = ref(null);

const showForm = ref(false);
const editingId = ref(null);
const form = reactive({ label_category: "", state: "ACTIVE" });

async function loadCategories() {
  loading.value = true;
  error.value = null;
  try {
    categories.value = await getCategories();
  } catch (err) {
    error.value = "Impossible de charger les catégories.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadCategories);

function resetForm() {
  form.label_category = "";
  form.state = "ACTIVE";
  editingId.value = null;
  formError.value = null;
}

function openCreateForm() {
  resetForm();
  showForm.value = true;
}

function openEditForm(category) {
  editingId.value = category.id_category;
  form.label_category = category.label_category;
  form.state = category.state || "ACTIVE";
  formError.value = null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  resetForm();
}

async function submitForm() {
  saving.value = true;
  formError.value = null;
  try {
    const payload = { label_category: form.label_category, state: form.state };
    if (editingId.value) {
      await updateCategory(editingId.value, payload);
    } else {
      await createCategory(payload);
    }
    closeForm();
    await loadCategories();
  } catch (err) {
    formError.value =
      err.response?.data?.message || "Impossible d'enregistrer.";
  } finally {
    saving.value = false;
  }
}

async function onDelete(category) {
  if (!confirm(`Supprimer la catégorie "${category.label_category}" ?`)) {
    return;
  }
  try {
    await deleteCategory(category.id_category);
    await loadCategories();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Impossible de supprimer cette catégorie.";
  }
}
</script>

<template>
  <AdminLayout>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Catégories</h2>
      <button class="btn btn-primary" @click="openCreateForm">
        + Nouvelle catégorie
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="showForm" class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">
          {{ editingId ? "Modifier la catégorie" : "Nouvelle catégorie" }}
        </h5>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-8">
              <label class="form-label">Libellé</label>
              <input
                v-model="form.label_category"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Statut</label>
              <select v-model="form.state" class="form-select">
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>
          <p v-if="formError" class="text-danger mt-3 mb-0">{{ formError }}</p>
          <div class="mt-3 d-flex gap-2">
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? "Enregistrement…" : "Enregistrer" }}
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
            <th>Libellé</th>
            <th>Produits</th>
            <th>Statut</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!categories.length">
            <td colspan="4" class="text-center text-muted py-4">
              Aucune catégorie pour le moment.
            </td>
          </tr>
          <tr v-for="category in categories" :key="category.id_category">
            <td>{{ category.label_category }}</td>
            <td>{{ category.products?.length ?? 0 }}</td>
            <td>
              <span
                class="badge"
                :class="
                  category.state === 'ACTIVE' ? 'bg-success' : 'bg-secondary'
                "
                >{{ category.state }}</span
              >
            </td>
            <td class="text-end">
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="openEditForm(category)"
              >
                Modifier
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="onDelete(category)"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

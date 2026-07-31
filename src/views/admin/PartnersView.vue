<script setup>
import { ref, onMounted, reactive } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "@/services/partners";

const partners = ref([]);
const loading = ref(true);
const error = ref(null);
const saving = ref(false);
const formError = ref(null);

const showForm = ref(false);
const editingId = ref(null);
const imageFile = ref(null);
const imagePreview = ref(null);
const form = reactive({ label_partners: "", state: "ACTIVE" });

async function loadPartners() {
  loading.value = true;
  error.value = null;
  try {
    partners.value = await getPartners();
  } catch (err) {
    error.value = "Impossible de charger les partenaires.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadPartners);

function resetForm() {
  form.label_partners = "";
  form.state = "ACTIVE";
  editingId.value = null;
  formError.value = null;
  imageFile.value = null;
  imagePreview.value = null;
}

function openCreateForm() {
  resetForm();
  showForm.value = true;
}

function openEditForm(partner) {
  editingId.value = partner.id;
  form.label_partners = partner.label_partners;
  form.state = partner.state || "ACTIVE";
  formError.value = null;
  imageFile.value = null;
  imagePreview.value = partner.image || null;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  resetForm();
}

function onImageChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
}

async function submitForm() {
  saving.value = true;
  formError.value = null;
  try {
    const payload = new FormData();
    payload.append("label_partners", form.label_partners);
    payload.append("state", form.state);
    if (imageFile.value) {
      payload.append("image", imageFile.value);
    }
    if (editingId.value) {
      await updatePartner(editingId.value, payload);
    } else {
      await createPartner(payload);
    }
    closeForm();
    await loadPartners();
  } catch (err) {
    formError.value =
      err.response?.data?.message || "Impossible d'enregistrer.";
  } finally {
    saving.value = false;
  }
}

async function onDelete(partner) {
  if (!confirm(`Supprimer le partenaire "${partner.label_partners}" ?`)) {
    return;
  }
  try {
    await deletePartner(partner.id);
    await loadPartners();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Impossible de supprimer ce partenaire.";
  }
}
</script>

<template>
  <AdminLayout>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Partenaires</h2>
      <button class="btn btn-primary" @click="openCreateForm">
        + Nouveau partenaire
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="showForm" class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">
          {{ editingId ? "Modifier le partenaire" : "Nouveau partenaire" }}
        </h5>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-8">
              <label class="form-label">Libellé</label>
              <input
                v-model="form.label_partners"
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
            <div class="col-md-6">
              <label class="form-label">Photo</label>
              <input
                type="file"
                accept="image/*"
                class="form-control"
                @change="onImageChange"
              />
            </div>
            <div class="col-md-6" v-if="imagePreview">
              <label class="form-label">Aperçu</label>
              <div>
                <img
                  :src="imagePreview"
                  alt="Aperçu"
                  style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px"
                />
              </div>
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
            <th>Photo</th>
            <th>Libellé</th>
            <th>Produits</th>
            <th>Statut</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!partners.length">
            <td colspan="5" class="text-center text-muted py-4">
              Aucun partenaire pour le moment.
            </td>
          </tr>
          <tr v-for="partner in partners" :key="partner.id">
            <td>
              <img
                v-if="partner.image"
                :src="partner.image"
                alt=""
                style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px"
              />
              <span v-else class="text-muted">—</span>
            </td>
            <td>{{ partner.label_partners }}</td>
            <td>{{ partner.products?.length ?? 0 }}</td>
            <td>
              <span
                class="badge"
                :class="
                  partner.state === 'ACTIVE' ? 'bg-success' : 'bg-secondary'
                "
                >{{ partner.state }}</span
              >
            </td>
            <td class="text-end">
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="openEditForm(partner)"
              >
                Modifier
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="onDelete(partner)"
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

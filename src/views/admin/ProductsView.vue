<script setup>
import { ref, onMounted, reactive } from "vue";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/products";
import { getCategories } from "@/services/categories";
import { getPartners } from "@/services/partners";
import { formatPrice } from "@/utils/currency";

const products = ref([]);
const categories = ref([]);
const partners = ref([]);
const loading = ref(true);
const error = ref(null);
const saving = ref(false);
const formError = ref(null);

const showForm = ref(false);
const editingId = ref(null);
const imageFile = ref(null);
const imagePreview = ref(null);
const form = reactive({
  label_products: "",
  price: "",
  category_id: "",
  partner_id: "",
  state: "ACTIVE",
});

async function loadAll() {
  loading.value = true;
  error.value = null;
  try {
    const [productsData, categoriesData, partnersData] = await Promise.all([
      getProducts(),
      getCategories(),
      getPartners(),
    ]);
    products.value = productsData;
    categories.value = categoriesData;
    partners.value = partnersData;
  } catch (err) {
    error.value = "Impossible de charger les produits.";
  } finally {
    loading.value = false;
  }
}

onMounted(loadAll);

function resetForm() {
  form.label_products = "";
  form.price = "";
  form.category_id = "";
  form.partner_id = "";
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

function openEditForm(product) {
  editingId.value = product.id;
  form.label_products = product.label_products;
  form.price = product.price;
  form.category_id = product.category_id;
  form.partner_id = product.partner_id;
  form.state = product.state || "ACTIVE";
  formError.value = null;
  imageFile.value = null;
  imagePreview.value = product.image || null;
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
    payload.append("label_products", form.label_products);
    payload.append("price", Number(form.price));
    payload.append("category_id", Number(form.category_id));
    payload.append("partner_id", Number(form.partner_id));
    payload.append("state", form.state);
    if (imageFile.value) {
      payload.append("image", imageFile.value);
    }
    if (editingId.value) {
      await updateProduct(editingId.value, payload);
    } else {
      await createProduct(payload);
    }
    closeForm();
    await loadAll();
  } catch (err) {
    formError.value =
      err.response?.data?.message ||
      "Impossible d'enregistrer ce produit.";
  } finally {
    saving.value = false;
  }
}

async function onDelete(product) {
  if (
    !confirm(
      `Supprimer le produit "${product.label_products}" ? Cette action est irréversible.`
    )
  ) {
    return;
  }
  try {
    await deleteProduct(product.id);
    await loadAll();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Impossible de supprimer ce produit.";
  }
}
</script>

<template>
  <AdminLayout>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Produits</h2>
      <button class="btn btn-primary" @click="openCreateForm">
        + Nouveau produit
      </button>
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="showForm" class="card mb-4 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">
          {{ editingId ? "Modifier le produit" : "Nouveau produit" }}
        </h5>
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Libellé</label>
              <input
                v-model="form.label_products"
                type="text"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">Prix (FCFA)</label>
              <input
                v-model="form.price"
                type="number"
                step="1"
                min="0"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-4">
              <label class="form-label">Catégorie</label>
              <select v-model="form.category_id" class="form-select" required>
                <option value="" disabled>Choisir…</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.label_category }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">Partenaire</label>
              <select v-model="form.partner_id" class="form-select" required>
                <option value="" disabled>Choisir…</option>
                <option
                  v-for="partner in partners"
                  :key="partner.id"
                  :value="partner.id"
                >
                  {{ partner.label_partners }}
                </option>
              </select>
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
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="saving"
            >
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
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Partenaire</th>
            <th>Statut</th>
            <th class="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!products.length">
            <td colspan="7" class="text-center text-muted py-4">
              Aucun produit pour le moment.
            </td>
          </tr>
          <tr v-for="product in products" :key="product.id">
            <td>
              <img
                v-if="product.image"
                :src="product.image"
                alt=""
                style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px"
              />
              <span v-else class="text-muted">—</span>
            </td>
            <td>{{ product.label_products }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td>{{ product.category?.label_category ?? "—" }}</td>
            <td>{{ product.partner?.label_partners ?? "—" }}</td>
            <td>
              <span
                class="badge"
                :class="
                  product.state === 'ACTIVE' ? 'bg-success' : 'bg-secondary'
                "
                >{{ product.state }}</span
              >
            </td>
            <td class="text-end">
              <button
                class="btn btn-sm btn-outline-primary me-2"
                @click="openEditForm(product)"
              >
                Modifier
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="onDelete(product)"
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

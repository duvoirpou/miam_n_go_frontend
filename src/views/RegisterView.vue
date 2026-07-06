<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const mail = ref("");
const password = ref("");
const submitting = ref(false);
const error = ref(null);

async function submitRegister() {
  submitting.value = true;
  error.value = null;
  try {
    await authStore.register({
      first_name_customers: firstName.value,
      last_name_customers: lastName.value,
      phone_customers: phone.value,
      mail_customers: mail.value,
      password: password.value,
    });
    router.push("/mon-compte");
  } catch (err) {
    error.value = "Impossible de créer le compte. Vérifiez vos informations.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Inscription" title="Inscription" />
    <section class="content-inner-1">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <form class="shop-form" @submit.prevent="submitRegister">
              <div class="row">
                <div class="col-md-6 form-group m-b20">
                  <label>Prénom</label>
                  <input v-model="firstName" type="text" class="form-control" required />
                </div>
                <div class="col-md-6 form-group m-b20">
                  <label>Nom</label>
                  <input v-model="lastName" type="text" class="form-control" required />
                </div>
              </div>
              <div class="form-group m-b20">
                <label>Téléphone</label>
                <input v-model="phone" type="tel" class="form-control" required />
              </div>
              <div class="form-group m-b20">
                <label>Email</label>
                <input v-model="mail" type="email" class="form-control" required />
              </div>
              <div class="form-group m-b20">
                <label>Mot de passe</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>
              <p v-if="error" class="text-danger">{{ error }}</p>
              <button
                type="submit"
                class="btn btn-primary btn-hover-1 w-100"
                :disabled="submitting"
              >
                {{ submitting ? "Création…" : "Créer mon compte" }}
              </button>
              <p class="m-t20 text-center">
                Déjà inscrit ? <RouterLink to="/connexion">Connectez-vous</RouterLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

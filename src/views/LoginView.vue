<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const mail = ref("");
const password = ref("");
const submitting = ref(false);
const error = ref(null);

async function submitLogin() {
  submitting.value = true;
  error.value = null;
  try {
    await authStore.login({
      mail_customers: mail.value,
      password: password.value,
    });
    router.push(route.query.redirect || "/mon-compte");
  } catch (err) {
    error.value =
      err.response?.data?.message || "Identifiants incorrects.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Connexion" title="Connexion" />
    <section class="content-inner-1">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <form class="shop-form" @submit.prevent="submitLogin">
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
                {{ submitting ? "Connexion…" : "Se connecter" }}
              </button>
              <p class="m-t20 text-center">
                Pas encore de compte ?
                <RouterLink to="/inscription">Inscrivez-vous</RouterLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

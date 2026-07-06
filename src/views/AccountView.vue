<script setup>
import { useRouter, RouterLink } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

async function onLogout() {
  await authStore.logout();
  router.push("/home-2");
}
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Mon compte" title="Mon compte" />
    <section class="content-inner-1">
      <div class="container">
        <div class="row justify-content-center" v-if="authStore.customer">
          <div class="col-lg-6">
            <ul class="detail-list">
              <li>
                Prénom
                <span class="text-primary m-t5">{{
                  authStore.customer.first_name_customers
                }}</span>
              </li>
              <li>
                Nom
                <span class="text-primary m-t5">{{
                  authStore.customer.last_name_customers
                }}</span>
              </li>
              <li>
                Téléphone
                <span class="text-primary m-t5">{{
                  authStore.customer.phone_customers
                }}</span>
              </li>
              <li>
                Email
                <span class="text-primary m-t5">{{
                  authStore.customer.mail_customers
                }}</span>
              </li>
            </ul>
            <div class="d-flex m-t30">
              <RouterLink
                to="/mes-commandes"
                class="btn btn-outline-secondary btn-hover-2 m-r10"
                >Mes commandes</RouterLink
              >
              <button class="btn btn-primary btn-hover-2" @click="onLogout">
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

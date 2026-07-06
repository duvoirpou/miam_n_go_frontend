<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import placeholderImg from "@/assets/images/team/pic1.jpg";
import { getPartners } from "@/services/partners";

const partners = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    partners.value = await getPartners();
  } catch (err) {
    error.value = "Impossible de charger les partenaires pour le moment.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Nos partenaires" title="Partenaires" />
    <section class="content-inner-1">
      <div class="container">
        <div v-if="loading" class="text-center">Chargement…</div>
        <div v-else-if="error" class="text-center text-danger">{{ error }}</div>
        <div v-else-if="!partners.length" class="text-center">
          Aucun partenaire disponible pour le moment.
        </div>
        <div v-else class="row">
          <div
            class="col-lg-3 col-md-6 col-sm-6 m-b30"
            v-for="partner in partners"
            :key="partner.id_partners"
          >
            <div class="dz-img-box style-2 box-hover">
              <div class="dz-media">
                <img :src="partner.image || placeholderImg" alt="/" />
              </div>
              <div class="dz-content">
                <h4 class="dz-title">
                  <RouterLink :to="`/partenaires/${partner.id_partners}`">{{
                    partner.label_partners
                  }}</RouterLink>
                </h4>
                <RouterLink
                  :to="`/partenaires/${partner.id_partners}`"
                  class="btn btn-primary btn-hover-2"
                  >Voir le menu</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

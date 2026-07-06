<script setup>
import { useRoute, RouterLink } from "vue-router";
import CommonBanner from "../elements/CommonBanner.vue";
import bgimg from "@/assets/images/banner/bnr1.jpg";
import Header2 from "../Layouts/Header2.vue";
import Footer2View from "../Layouts/Footer2View.vue";

const route = useRoute();
</script>

<template>
  <div class="page-content bg-white">
    <Header2 />
    <CommonBanner :img="bgimg" heading="Commande confirmée" title="Confirmation" />
    <section class="content-inner-1">
      <div class="container text-center">
        <h4>Merci pour votre commande !</h4>
        <p>
          Votre commande n°{{ route.params.orderId }} a bien été enregistrée.
          Vous pouvez suivre son statut depuis votre espace
          <RouterLink to="/mes-commandes">Mes commandes</RouterLink>.
        </p>
      </div>
    </section>
    <Footer2View />
  </div>
</template>

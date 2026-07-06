<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import router from "../router";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const menus = ref([
  { menu: "Accueil", link: "/" },
  { menu: "Partenaires", link: "/partenaires" },
  { menu: "Panier", link: "/panier" },
  { menu: "Contact", link: "/contact-us" },
]);

let active = ref("");

function dataItem() {
  menus.value.forEach((ele) => {
    if (router.currentRoute.value.fullPath.startsWith(ele.link)) {
      active.value = ele.menu;
    }
  });
}

router.afterEach(() => {
  dataItem();
});

function mobileActiveMenu(ind) {
  let item = document.querySelectorAll(".nevList");
  item.forEach((ell, index) => {
    ell.classList.toggle("open");
    if (index !== ind) {
      ell.classList.remove("open");
    }
  });
}
</script>

<template>
  <div class="logo-header">
    <RouterLink to="/" class="anim-logo"
      ><img src="../assets/images/logo.png" alt="/"
    /></RouterLink>
  </div>
  <ul class="nav navbar-nav navbar">
    <li
      v-for="(item, ind) in menus"
      :class="`${item.menu === active ? 'active' : ''} nevList`"
      :key="ind"
      @click="mobileActiveMenu(ind)"
    >
      <RouterLink :to="item.link">{{ item.menu }}</RouterLink>
    </li>
    <li v-if="!authStore.isLoggedIn">
      <RouterLink to="/connexion">Connexion</RouterLink>
    </li>
    <li v-else>
      <RouterLink to="/mon-compte">Mon compte</RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import logo from "@/assets/images/logo.png";

const router = useRouter();
const authStore = useAuthStore();

const navItems = [
  { to: "/admin", label: "Tableau de bord", exact: true },
  { to: "/admin/produits", label: "Produits" },
  { to: "/admin/categories", label: "Catégories" },
  { to: "/admin/partenaires", label: "Partenaires" },
  { to: "/admin/commandes", label: "Commandes" },
  { to: "/admin/paiements", label: "Paiements" },
  { to: "/admin/livraisons", label: "Livraisons" },
];

async function onLogout() {
  await authStore.logout();
  router.push("/connexion");
}
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-brand">
        <img :src="logo" alt="Miam'n'Go" />
        <span>Admin</span>
      </div>
      <nav class="admin-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="admin-nav-link"
          :exact-active-class="'active'"
          :active-class="item.exact ? '' : 'active'"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="admin-sidebar-footer">
        <div class="admin-user">
          <div class="admin-user-name">
            {{ authStore.customer?.first_name_customers }}
            {{ authStore.customer?.last_name_customers }}
          </div>
          <div class="admin-user-role">{{ authStore.role }}</div>
        </div>
        <button class="btn btn-outline-light btn-sm w-100" @click="onLogout">
          Se déconnecter
        </button>
        <RouterLink to="/" class="d-block text-center mt-2 small text-light">
          ← Retour au site
        </RouterLink>
      </div>
    </aside>
    <main class="admin-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #fff7ee;
}

.admin-sidebar {
  width: 240px;
  flex-shrink: 0;
  background: #0f3a5c;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
}

.admin-sidebar-brand {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-sidebar-brand img {
  height: 28px;
  width: auto;
}

.admin-sidebar-brand span {
  font-size: 1.1rem;
  font-weight: 700;
  color: #ff6b35;
}

.admin-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  overflow-y: auto;
}

.admin-nav-link {
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 0.9rem;
}

.admin-nav-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.admin-nav-link.active {
  background: #ff6b35;
  color: #fff;
  font-weight: 600;
}

.admin-sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-user-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.admin-user-role {
  font-size: 0.75rem;
  color: #ff6b35;
  margin-bottom: 10px;
}

.admin-content {
  flex: 1;
  padding: 24px 32px;
  min-width: 0;
}
</style>

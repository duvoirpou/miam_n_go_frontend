import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home2View.vue"),
    },
    {
      path: "/partenaires",
      name: "partners",
      component: () => import("../views/PartnersView.vue"),
    },
    {
      path: "/partenaires/:id",
      name: "partner_detail",
      component: () => import("../views/PartnerDetailView.vue"),
    },
    {
      path: "/produit/:id",
      name: "product_detail",
      component: () => import("../views/ProductDetailsView.vue"),
    },
    {
      path: "/panier",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/commande",
      name: "checkout",
      component: () => import("../views/CheckoutView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/commande/confirmation/:orderId",
      name: "order_confirmation",
      component: () => import("../views/OrderConfirmationView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/mes-commandes",
      name: "orders_history",
      component: () => import("../views/OrdersHistoryView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/connexion",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/inscription",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/mon-compte",
      name: "account",
      component: () => import("../views/AccountView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/contact-us",
      name: "contact_us",
      component: () => import("../views/ContactUsView.vue"),
    },
    {
      path: "/admin",
      name: "admin_dashboard",
      component: () => import("../views/admin/DashboardView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/produits",
      name: "admin_products",
      component: () => import("../views/admin/ProductsView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/categories",
      name: "admin_categories",
      component: () => import("../views/admin/CategoriesView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/partenaires",
      name: "admin_partners",
      component: () => import("../views/admin/PartnersView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/commandes",
      name: "admin_orders",
      component: () => import("../views/admin/OrdersView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/paiements",
      name: "admin_payments",
      component: () => import("../views/admin/PaymentsView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/admin/livraisons",
      name: "admin_deliveries",
      component: () => import("../views/admin/DeliveriesView.vue"),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error_404",
      component: () => import("../views/Error404View.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: "login", query: { redirect: to.fullPath } };
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return { name: "home" };
  }
});

export default router;

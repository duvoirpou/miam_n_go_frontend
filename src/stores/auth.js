import { defineStore } from "pinia";
import * as authService from "@/services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    customer: JSON.parse(localStorage.getItem("auth_customer") || "null"),
    user: JSON.parse(localStorage.getItem("auth_user") || "null"),
    token: localStorage.getItem("auth_token") || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    role: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === "ADMIN",
  },
  actions: {
    setSession(customer, user, token) {
      this.customer = customer;
      this.user = user;
      this.token = token;
      localStorage.setItem("auth_customer", JSON.stringify(customer));
      localStorage.setItem("auth_user", JSON.stringify(user));
      localStorage.setItem("auth_token", token);
    },
    async login(credentials) {
      const data = await authService.login(credentials);
      this.setSession(data.customer, data.user, data.token);
      return data;
    },
    async register(payload) {
      const data = await authService.register(payload);
      this.setSession(data.customer, data.user, data.token);
      return data;
    },
    async logout() {
      try {
        await authService.logout();
      } finally {
        this.customer = null;
        this.user = null;
        this.token = null;
        localStorage.removeItem("auth_customer");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_token");
      }
    },
    async fetchMe() {
      const data = await authService.fetchMe();
      this.customer = data.customer;
      this.user = data.user;
      localStorage.setItem("auth_customer", JSON.stringify(data.customer));
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      return data;
    },
  },
});

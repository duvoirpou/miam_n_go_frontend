import { defineStore } from "pinia";
import * as authService from "@/services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    customer: JSON.parse(localStorage.getItem("auth_customer") || "null"),
    token: localStorage.getItem("auth_token") || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setSession(customer, token) {
      this.customer = customer;
      this.token = token;
      localStorage.setItem("auth_customer", JSON.stringify(customer));
      localStorage.setItem("auth_token", token);
    },
    async login(credentials) {
      const data = await authService.login(credentials);
      this.setSession(data.customer, data.token);
      return data;
    },
    async register(payload) {
      const data = await authService.register(payload);
      this.setSession(data.customer, data.token);
      return data;
    },
    async logout() {
      try {
        await authService.logout();
      } finally {
        this.customer = null;
        this.token = null;
        localStorage.removeItem("auth_customer");
        localStorage.removeItem("auth_token");
      }
    },
    async fetchMe() {
      const customer = await authService.fetchMe();
      this.customer = customer;
      localStorage.setItem("auth_customer", JSON.stringify(customer));
      return customer;
    },
  },
});

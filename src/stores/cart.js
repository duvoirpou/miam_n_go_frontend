import { defineStore } from "pinia";

function loadCart() {
  return JSON.parse(localStorage.getItem("cart_items") || "[]");
}

function persist(items) {
  localStorage.setItem("cart_items", JSON.stringify(items));
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: loadCart(),
  }),
  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.unit_price * item.quantity,
        0
      ),
    partnerId: (state) => state.items[0]?.partner_id ?? null,
  },
  actions: {
    addItem(product, quantity = 1) {
      if (
        this.items.length &&
        this.partnerId !== null &&
        product.partner_id !== this.partnerId
      ) {
        throw new Error(
          "Votre panier contient déjà des articles d'un autre partenaire. Videz-le avant d'ajouter ce produit."
        );
      }
      const existing = this.items.find(
        (item) => item.product_id === product.id
      );
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({
          product_id: product.id,
          label: product.label_products,
          unit_price: product.price,
          quantity,
          partner_id: product.partner_id,
        });
      }
      persist(this.items);
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.product_id === productId);
      if (!item) return;
      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }
      item.quantity = quantity;
      persist(this.items);
    },
    removeItem(productId) {
      this.items = this.items.filter(
        (item) => item.product_id !== productId
      );
      persist(this.items);
    },
    clear() {
      this.items = [];
      persist(this.items);
    },
  },
});

import http, { unwrap } from "./http";

export function getOrders() {
  return http.get("/orders").then(unwrap);
}

export function getOrder(id) {
  return http.get(`/orders/${id}`).then(unwrap);
}

export function createOrder(payload) {
  return http.post("/orders", payload).then(unwrap);
}

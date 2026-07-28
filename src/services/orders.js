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

export function updateOrder(id, payload) {
  return http.put(`/orders/${id}`, payload).then(unwrap);
}

export function deleteOrder(id) {
  return http.delete(`/orders/${id}`).then((res) => res.data);
}

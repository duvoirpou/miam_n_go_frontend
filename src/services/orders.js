import http from "./http";

export function getOrders() {
  return http.get("/orders").then((res) => res.data);
}

export function getOrder(id) {
  return http.get(`/orders/${id}`).then((res) => res.data);
}

export function createOrder(payload) {
  return http.post("/orders", payload).then((res) => res.data);
}

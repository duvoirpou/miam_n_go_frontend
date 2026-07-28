import http, { unwrap } from "./http";

export function getPayments() {
  return http.get("/payments").then(unwrap);
}

export function getPayment(id) {
  return http.get(`/payments/${id}`).then(unwrap);
}

export function createPayment(payload) {
  return http.post("/payments", payload).then(unwrap);
}

export function updatePayment(id, payload) {
  return http.put(`/payments/${id}`, payload).then(unwrap);
}

export function deletePayment(id) {
  return http.delete(`/payments/${id}`).then((res) => res.data);
}

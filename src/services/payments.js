import http from "./http";

export function createPayment(payload) {
  return http.post("/payments", payload).then((res) => res.data);
}

import http, { unwrap } from "./http";

export function createPayment(payload) {
  return http.post("/payments", payload).then(unwrap);
}

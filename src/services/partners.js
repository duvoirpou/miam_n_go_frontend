import http, { unwrap } from "./http";

export function getPartners() {
  return http.get("/partners").then(unwrap);
}

export function getPartner(id) {
  return http.get(`/partners/${id}`).then(unwrap);
}

export function createPartner(payload) {
  return http.post("/partners", payload).then(unwrap);
}

export function updatePartner(id, payload) {
  if (payload instanceof FormData) {
    payload.append("_method", "PUT");
    return http.post(`/partners/${id}`, payload).then(unwrap);
  }
  return http.put(`/partners/${id}`, payload).then(unwrap);
}

export function deletePartner(id) {
  return http.delete(`/partners/${id}`).then((res) => res.data);
}

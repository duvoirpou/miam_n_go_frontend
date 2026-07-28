import http, { unwrap } from "./http";

export function getCategories(partnerId) {
  return http
    .get("/categories", { params: { partner_id: partnerId } })
    .then(unwrap);
}

export function getCategory(id) {
  return http.get(`/categories/${id}`).then(unwrap);
}

export function createCategory(payload) {
  return http.post("/categories", payload).then(unwrap);
}

export function updateCategory(id, payload) {
  return http.put(`/categories/${id}`, payload).then(unwrap);
}

export function deleteCategory(id) {
  return http.delete(`/categories/${id}`).then((res) => res.data);
}

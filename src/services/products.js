import http, { unwrap } from "./http";

export function getProducts({ partnerId, categoryId } = {}) {
  return http
    .get("/products", {
      params: { partner_id: partnerId, category_id: categoryId },
    })
    .then(unwrap);
}

export function getProduct(id) {
  return http.get(`/products/${id}`).then(unwrap);
}

export function getMyProducts() {
  return http.get("/my-products").then(unwrap);
}

export function createProduct(payload) {
  return http.post("/products", payload).then(unwrap);
}

export function updateProduct(id, payload) {
  return http.put(`/products/${id}`, payload).then(unwrap);
}

export function deleteProduct(id) {
  return http.delete(`/products/${id}`).then((res) => res.data);
}

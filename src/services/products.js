import http, { unwrap } from "./http";

export function getProducts({ partnerId, categoryId, isSpecial } = {}) {
  return http
    .get("/products", {
      params: {
        partner_id: partnerId,
        category_id: categoryId,
        is_special: isSpecial,
      },
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
  if (payload instanceof FormData) {
    payload.append("_method", "PUT");
    return http.post(`/products/${id}`, payload).then(unwrap);
  }
  return http.put(`/products/${id}`, payload).then(unwrap);
}

export function deleteProduct(id) {
  return http.delete(`/products/${id}`).then((res) => res.data);
}

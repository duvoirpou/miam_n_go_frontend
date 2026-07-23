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

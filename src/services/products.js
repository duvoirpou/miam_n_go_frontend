import http from "./http";

export function getProducts({ partnerId, categoryId } = {}) {
  return http
    .get("/products", {
      params: { partner_id: partnerId, category_id: categoryId },
    })
    .then((res) => res.data);
}

export function getProduct(id) {
  return http.get(`/products/${id}`).then((res) => res.data);
}

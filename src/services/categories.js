import http from "./http";

export function getCategories(partnerId) {
  return http
    .get("/categories", { params: { partner_id: partnerId } })
    .then((res) => res.data);
}

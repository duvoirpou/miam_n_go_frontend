import http, { unwrap } from "./http";

export function getReviews({ partnerId } = {}) {
  return http
    .get("/reviews", { params: { partner_id: partnerId } })
    .then(unwrap);
}

export function getReview(id) {
  return http.get(`/reviews/${id}`).then(unwrap);
}

export function createReview(payload) {
  return http.post("/reviews", payload).then(unwrap);
}

export function updateReview(id, payload) {
  return http.put(`/reviews/${id}`, payload).then(unwrap);
}

export function deleteReview(id) {
  return http.delete(`/reviews/${id}`).then((res) => res.data);
}

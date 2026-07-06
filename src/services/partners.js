import http from "./http";

export function getPartners() {
  return http.get("/partners").then((res) => res.data);
}

export function getPartner(id) {
  return http.get(`/partners/${id}`).then((res) => res.data);
}

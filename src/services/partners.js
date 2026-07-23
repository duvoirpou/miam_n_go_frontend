import http, { unwrap } from "./http";

export function getPartners() {
  return http.get("/partners").then(unwrap);
}

export function getPartner(id) {
  return http.get(`/partners/${id}`).then(unwrap);
}

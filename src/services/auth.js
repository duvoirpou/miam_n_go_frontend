import http from "./http";

export function register(payload) {
  return http.post("/auth/register", payload).then((res) => res.data);
}

export function login(payload) {
  return http.post("/auth/login", payload).then((res) => res.data);
}

export function logout() {
  return http.post("/auth/logout").then((res) => res.data);
}

export function fetchMe() {
  return http.get("/auth/me").then((res) => res.data);
}

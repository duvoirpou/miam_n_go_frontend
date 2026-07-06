import http from "./http";

export function register(payload) {
  return http.post("/register", payload).then((res) => res.data);
}

export function login(payload) {
  return http.post("/login", payload).then((res) => res.data);
}

export function logout() {
  return http.post("/logout").then((res) => res.data);
}

export function fetchMe() {
  return http.get("/me").then((res) => res.data);
}

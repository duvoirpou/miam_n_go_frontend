import http, { unwrap } from "./http";

export function getDeliveries() {
  return http.get("/deliveries").then(unwrap);
}

export function getDelivery(id) {
  return http.get(`/deliveries/${id}`).then(unwrap);
}

export async function getDeliveryByOrder(orderId) {
  const deliveries = await getDeliveries();
  return (
    deliveries.find(
      (delivery) => String(delivery.order_id) === String(orderId)
    ) || null
  );
}

export function createDelivery(payload) {
  return http.post("/deliveries", payload).then(unwrap);
}

export function updateDelivery(id, payload) {
  return http.put(`/deliveries/${id}`, payload).then(unwrap);
}

export function deleteDelivery(id) {
  return http.delete(`/deliveries/${id}`).then((res) => res.data);
}

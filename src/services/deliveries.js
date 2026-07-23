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
      (delivery) => String(delivery.id_orders) === String(orderId)
    ) || null
  );
}

import http from "./http";

export function getDeliveryByOrder(orderId) {
  return http.get(`/deliveries/${orderId}`).then((res) => res.data);
}

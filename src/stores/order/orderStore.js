import { defineStore } from 'pinia';
import { useGetOrderStore } from './getOrderStore';
import { computed } from 'vue';
import { useDetailOrderStore } from './detailOrderStore';

export const useOrderStore = defineStore('order', () => {
  const getOrder = useGetOrderStore();
  const detailOrder = useDetailOrderStore();

  const orders = computed(() => getOrder.orders);
  const orderDetail = computed(() => detailOrder.orderDetail);

  return {
    orders: orders,
    orderDetail: orderDetail,
    fetchTodayOrder: getOrder.fetchTodayOrder,
    fetchDetailOrder: detailOrder.fetchDetailOrder,
    get: getOrder,
    detail: detailOrder
  };
});

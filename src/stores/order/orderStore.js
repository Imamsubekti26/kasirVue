import { defineStore } from 'pinia';
import { useGetOrderStore } from './getOrderStore';
import { computed } from 'vue';

export const useOrderStore = defineStore('order', () => {
  const getOrder = useGetOrderStore();

  const orders = computed(() => getOrder.orders);

  return {
    orders: orders,
    fetchTodayOrder: getOrder.fetchTodayOrder,
    get: getOrder
  };
});

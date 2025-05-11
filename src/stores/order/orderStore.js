import { defineStore } from 'pinia';
import { useGetOrderStore } from './getOrderStore';
import { computed } from 'vue';
import { useDetailOrderStore } from './detailOrderStore';
import { useCreateOrderStore } from './createOrderStore';
import { useUpdateOrderStore } from './updateOrderStore';

export const useOrderStore = defineStore('order', () => {
  const getOrder = useGetOrderStore();
  const detailOrder = useDetailOrderStore();
  const createOrder = useCreateOrderStore();
  const updateOrder = useUpdateOrderStore();

  return {
    orders: computed(() => getOrder.orders),
    orderDetail: computed(() => detailOrder.orderDetail),
    fetchTodayOrder: getOrder.fetchTodayOrder,
    fetchDetailOrder: detailOrder.fetchDetailOrder,
    newOrder: createOrder.newOrder,
    editOrder: updateOrder.editOrder,
    get: getOrder,
    detail: detailOrder,
    create: createOrder,
    update: updateOrder,
  };
});

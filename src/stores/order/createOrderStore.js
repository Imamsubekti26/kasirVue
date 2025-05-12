import { createNewOrder } from '@/lib/firebase/services/orderService';
import { getUserId } from '@/lib/helpers/session';
import { Timestamp } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCreateOrderStore = defineStore('createOrder', () => {
  const loading = ref(false);
  const error = ref(null);

  const newOrder = async (orderDetail, isFinish = false) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken === undefined) {
      loading.value = false;
      error.value = 'you are not login yet!';
      return { error: true, message: 'you are not login yet!', data: null };
    }

    const userId = getUserId(jwtToken);
    delete orderDetail.id;
    orderDetail.orderDate = Timestamp.fromDate(new Date());
    orderDetail.finishDate = isFinish ? Timestamp.fromDate(new Date()) : null;
    const result = await createNewOrder(userId, orderDetail);

    error.value = result.error ? result.message : null;
    loading.value = false;
    return result;
  };

  return { loading, error, newOrder };
});

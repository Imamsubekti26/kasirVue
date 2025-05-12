import { ref } from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { getUserId } from '@/lib/helpers/session';
import { updateOrder } from '@/lib/firebase/services/orderService';
import { Timestamp } from 'firebase/firestore';

export const useUpdateOrderStore = defineStore('updateOrder', () => {
  const loading = ref(false);
  const error = ref(null);

  const editOrder = async (orderDetail, isFinish = false) => {
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
    orderDetail.finishDate = isFinish ? Timestamp.fromDate(new Date()) : null;
    const result = await updateOrder(userId, orderDetail.id, orderDetail);

    error.value = result.error ? result.message : null;
    loading.value = false;
    return result;
  };

  return { loading, error, editOrder };
});

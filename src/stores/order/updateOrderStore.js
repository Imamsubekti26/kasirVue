import { ref } from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { getUserId } from '@/lib/helpers/session';
import { updateOrder } from '@/lib/firebase/services/orderService';

export const useUpdateOrderStore = defineStore('updateOrder', () => {
  const loading = ref(false);
  const error = ref(null);

  const editOrder = async (orderDetail) => {
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
    const result = await updateOrder(userId, orderDetail.id, orderDetail);

    error.value = result.error ? result.message : null;
    loading.value = false;
    return result;
  };

  return { loading, error, editOrder };
});

import { detailOrder } from '@/lib/firebase/services/orderService';
import { getUserId } from '@/lib/helpers/session';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCartStore } from '../cart/cartStore';

export const useDetailOrderStore = defineStore('detailOrder', () => {
  const cartStore = useCartStore();

  const orderDetail = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchDetailOrder = async (historyId) => {
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
    const result = await detailOrder(userId, historyId);
    if (result.error) {
      error.value = result.message;
      orderDetail.value = null;
    } else {
      error.value = null;
      cartStore.products = result.data.orderList;
      orderDetail.value = result.data;
    }

    loading.value = false;
    return result;
  };

  const reset = () => {
    orderDetail.value = null;
  }

  return { orderDetail, loading, error, fetchDetailOrder, reset };
});

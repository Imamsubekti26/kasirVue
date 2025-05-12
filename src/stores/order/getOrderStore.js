import { getOrderHistory } from '@/lib/firebase/services/orderService';
import { getUserId } from '@/lib/helpers/session';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGetOrderStore = defineStore('getOrder', () => {
  const orders = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchOrder = async (force =false, startDate = null, endDate = null) => {
    if (loading.value) return;

    if (!force && orders.value.length) return; // caching

    loading.value = true;
    error.value = null;

    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken === undefined) {
      loading.value = false;
      error.value = 'you are not login yet!';
      return { error: true, message: 'you are not login yet!', data: null };
    }

    const userId = getUserId(jwtToken);
    const result = await getOrderHistory(userId, startDate, endDate);

    if (result.error) {
      error.value = result.message;
      orders.value = [];
    } else {
      error.value = null;
      orders.value = result.data;
    }

    loading.value = false;
    return result;
  };

  return { orders, loading, error, fetchOrder };
});

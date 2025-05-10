import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getAllProduct } from '@/lib/firebase/services/productService';
import Cookies from 'js-cookie';
import { getUserId } from '@/lib/helpers/session';

export const useGetProductStore = defineStore('getProduct', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchAllProduct = async () => {
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
    const result = await getAllProduct(userId);

    if (result.error) {
      error.value = result.message;
      products.value = [];
    } else {
      error.value = null;
      products.value = result.data;
    }

    loading.value = false;
    return result;
  };

  return { products, loading, error, fetchAllProduct };
});

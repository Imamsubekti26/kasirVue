import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getAllProduct, updateProduct } from '@/lib/firebase/services/productService';
import Cookies from 'js-cookie';
import { getUserId } from '@/lib/helpers/session';

export const useUpdateProductStore = defineStore('updateProduct', () => {
  const loading = ref(false);
  const error = ref(null);

  const editProduct = async (product, image) => {
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
    const result = await updateProduct(userId, product.id, product, image);

    error.value = result.error ? result.message : null;
    loading.value = false;
    return result;
  };

  return { loading, error, editProduct };
});

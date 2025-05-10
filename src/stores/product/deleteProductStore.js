import { deleteProduct } from "@/lib/firebase/services/productService";
import { getUserId } from "@/lib/helpers/session";
import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeleteProductStore = defineStore('deleteProduct', () => {
  const loading = ref(false);
  const error = ref(null);

  const removeProduct = async (productId) => {
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
    const result = await deleteProduct(userId, productId);

    error.value = result.error ? result.message : null;
    loading.value = false;
    return result;
  };

  return { loading, error, removeProduct };
})

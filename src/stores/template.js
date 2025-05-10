import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDeleteProductStore = defineStore('deleteProduct', () => {
  const loading = ref(false);
  const error = ref(null);

  const foo = async () => {};

  return { loading, error, foo };
});

import { defineStore } from 'pinia';
import { useGetProductStore } from './getProductStore';
import { useCreateProductStore } from './createProductStore';
import { useDeleteProductStore } from './deleteProductStore';
import { useUpdateProductStore } from './updateProductStore';
import { computed } from 'vue';

export const useProductStore = defineStore('product', () => {
  const getProduct = useGetProductStore();
  const createProduct = useCreateProductStore();
  const updateProduct = useUpdateProductStore();
  const deleteProduct = useDeleteProductStore();

  const products = computed(() => getProduct.products);

  return {
    products,
    fetchAllProduct: getProduct.fetchAllProduct,
    newProduct: createProduct.newProduct,
    editProduct: updateProduct.editProduct,
    removeProduct: deleteProduct.removeProduct,
    get: getProduct,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct
  };
});

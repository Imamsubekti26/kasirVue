import { defineStore } from 'pinia';
import { useGetProductStore } from './getProductStore';
import { useCreateProductStore } from './createProductStore';
import { useDeleteProductStore } from './deleteProductStore';
import { useUpdateProductStore } from './updateProductStore';

export const useProductStore = defineStore('product', () => {
  const getProduct = useGetProductStore();
  const createProduct = useCreateProductStore();
  const updateProduct = useUpdateProductStore();
  const deleteProduct = useDeleteProductStore();

  return {
    products: getProduct.products,
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

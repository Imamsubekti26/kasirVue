import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const products = ref([]);
  const grandTotal = ref(0);

  const calculateGrandTotal = () => {
    grandTotal.value = products.value.reduce((sum, item) => sum + item.total, 0);
  };

  const attach = (product) => {
    const existing = products.value.find((p) => p.name === product.name);
    if (existing) {
      existing.amount += 1;
      existing.total = existing.amount * existing.price;
    } else {
      products.value.push({
        ...product,
        amount: 1,
        total: product.price
      });
    }
    calculateGrandTotal();
  };

  const dettach = (product) => {
    const index = products.value.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      const item = products.value[index];
      item.amount -= 1;
      if (item.amount <= 0) {
        products.value.splice(index, 1);
      } else {
        item.total = item.amount * item.price;
      }
      calculateGrandTotal();
    }
  };

  const reset = () => {
    products.value = [];
    grandTotal.value = 0;
  }

  return { products, grandTotal, attach, dettach, reset };
});

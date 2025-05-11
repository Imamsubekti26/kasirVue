import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const products = ref([]);

  const grandTotal = computed(() => {
    if (!products.value.length) return 0;
    return products.value.reduce((sum, item) => {
      if (item.total) return sum + item.total;
      if (item.price && item.amount) return sum + item.price * item.amount;
      return 0;
    }, 0);
  });

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
    }
  };

  const reset = () => {
    products.value = [];
  };

  return { products, grandTotal, attach, dettach, reset };
});

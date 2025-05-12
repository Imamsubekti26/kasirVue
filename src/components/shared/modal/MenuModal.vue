<script setup>
import IconButton from '@/components/shared/button/IconButton.vue';
import MenuCard from '@/components/shared/card/MenuCard.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/product/productStore';
import { useCartStore } from '@/stores/cart/cartStore';

const productStore = useProductStore();
const cartStore = useCartStore();

const searchValue = ref('');
const selectedCategory = ref('all');
const filteredProducts = computed(() => {
  return productStore.products.filter((item) => {
    const matchesCategory = selectedCategory.value === 'all' || item?.category === selectedCategory.value;
    const matchesSearch = item?.name?.toLowerCase().includes(searchValue.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const fetchProduct = async () => {
  await productStore.fetchAllProduct();
  if (productStore.get.error) {
    alert(productStore.get.error);
  }
};

onMounted(async () => {
  await fetchProduct();
});
</script>

<template>
  <div>
    <div class="sticky top-0 flex gap-2 pt-6 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
      <SelectInput v-model="selectedCategory" />
      <CustomInput type="search" placeholder="cari produk..." v-model="searchValue" />
    </div>

    <div v-if="productStore.get.loading" class="flex flex-col gap-4 justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p>Loading</p>
    </div>

    <MenuCard v-else v-for="product in filteredProducts" :key="product.id" :product="product">
      <IconButton icon="/icons/ic_minus.svg" @click="cartStore.dettach(product)" />
      <p class="px-2">{{ cartStore.products?.find((p) => p.name === product.name)?.amount || 0 }}</p>
      <IconButton icon="/icons/ic_plus.svg" @click="cartStore.attach(product)" />
    </MenuCard>
  </div>
</template>

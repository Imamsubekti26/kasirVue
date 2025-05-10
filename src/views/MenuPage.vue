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
    <MenuCard v-for="product in filteredProducts" :key="product.id" :product="product">
      <IconButton icon="/icons/ic_minus.svg" @click="cartStore.dettach(product)" />
      <p class="px-2">{{ cartStore.products?.find((p) => p.name === product.name)?.amount || 0 }}</p>
      <IconButton icon="/icons/ic_plus.svg" @click="cartStore.attach(product)" />
    </MenuCard>
  </div>
</template>

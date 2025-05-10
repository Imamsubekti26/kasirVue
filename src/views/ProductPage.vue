<script setup>
import CustomButton from '@/components/shared/button/CustomButton.vue';
import IconButton from '@/components/shared/button/IconButton.vue';
import MenuCard from '@/components/shared/card/MenuCard.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import MenuForm from '@/components/shared/form/MenuForm.vue';
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '@/stores/product/productStore';

const productStore = useProductStore();

const selectedCategory = ref('all');
const searchValue = ref('');
const filteredProducts = computed(() => {
  return productStore.products.filter((item) => {
    const matchesCategory = selectedCategory.value === 'all' || item?.category === selectedCategory.value;
    const matchesSearch = item?.name?.toLowerCase().includes(searchValue.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
const productInModal = ref();
const modalVisible = ref(false);

const showModal = (product) => {
  if (product != undefined) {
    productInModal.value = product;
  }
  modalVisible.value = true;
};

const closeModal = () => {
  productInModal.value = undefined;
  modalVisible.value = false;
};

const deleteProduct = async (productId) => {
  // do
};

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
  <div class="sticky top-0 flex gap-2 pt-6 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
    <SelectInput v-model="selectedCategory" />
    <CustomInput type="search" placeholder="cari produk..." v-model="searchValue" />
  </div>

  <MenuCard v-for="product in filteredProducts" :key="product.id" :product="product">
    <IconButton icon="/icons/ic_pencil.svg" @click="showModal(product)" />
    <IconButton icon="/icons/ic_bin.svg" color="danger" @click="deleteProduct(product.id)" />
  </MenuCard>

  <div v-if="productStore.get.loading" class="flex flex-col gap-4 justify-center items-center">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <p>Loading</p>
  </div>
  <div v-else class="w-full px-4">
    <CustomButton @click="showModal">Tambah menu baru</CustomButton>
  </div>

  <MenuForm v-if="modalVisible" :product="productInModal" @afterSubmit="console.log(1)" @close="closeModal" />
</template>

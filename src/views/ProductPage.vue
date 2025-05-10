<script setup>
import CustomButton from '@/components/shared/button/CustomButton.vue';
import IconButton from '@/components/shared/button/IconButton.vue';
import MenuCard from '@/components/shared/card/MenuCard.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import MenuForm from '@/components/shared/form/MenuForm.vue';
import { ref } from 'vue';

const categorySelected = ref('all');
const searchValue = ref('');
const filteredProducts = ref([
  {
    id: 'AsAcJcSChnnnwtMKj6Lo',
    price: 5000,
    name: 'Kopi',
    category: 'drink',
    image: 'https://firebasestorage.googleapis.com/v0/b/imam-test.appspot.com/o/products%2F2aT30hHrixa0DF1M4aodZQWq9xg1%2F20240724_Kopi?alt=media&token=4639ccd7-9e60-4ffd-83b3-2eca0ce80f67'
  },
  {
    id: 'AsAcJcSChnnnwtMKj6Ld',
    price: 5000,
    name: 'Kopi',
    category: 'drink',
    image: 'https://firebasestorage.googleapis.com/v0/b/imam-test.appspot.com/o/products%2F2aT30hHrixa0DF1M4aodZQWq9xg1%2F20240724_Kopi?alt=media&token=4639ccd7-9e60-4ffd-83b3-2eca0ce80f67'
  }
]);
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

// do something
</script>

<template>
  <div class="sticky top-0 flex gap-2 pt-6 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
    <SelectInput v-model="categorySelected" />
    <CustomInput type="search" placeholder="cari produk..." v-model="searchValue" />
  </div>

  <MenuCard v-for="product in filteredProducts" :key="product.id" :product="product">
    <IconButton icon="/icons/ic_pencil.svg" @click="showModal(product)" />
    <IconButton icon="/icons/ic_bin.svg" color="danger" @click="deleteProduct(product.id)" />
  </MenuCard>

  <div class="w-full px-4">
    <CustomButton @click="showModal">Tambah menu baru</CustomButton>
  </div>

  <MenuForm v-if="modalVisible" :product="productInModal" @afterSubmit="console.log(1)" @close="closeModal" />
</template>

<script setup>
import IconButton from '@/components/shared/button/IconButton.vue';
import MenuCard from '@/components/shared/card/MenuCard.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import { ref } from 'vue';

const itemCount = ref(0);
const searchValue = ref('');
const selectedCategory = ref('all');
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
</script>

<template>
  <div>
    <div class="sticky top-0 flex gap-2 pt-6 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
      <SelectInput v-model="selectedCategory" />
      <CustomInput type="search" placeholder="cari produk..." v-model="searchValue" />
    </div>
    <MenuCard v-for="product in filteredProducts" :key="product.id" :product="product">
      <IconButton icon="/icons/ic_minus.svg" />
      <p class="px-2">{{ itemCount[product.id] || 0 }}</p>
      <IconButton icon="/icons/ic_plus.svg" />
    </MenuCard>
  </div>
</template>

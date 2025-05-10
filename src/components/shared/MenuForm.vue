<script setup>
import { ref } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';

const props = defineProps({
  product: Object,
  afterSubmit: Function
});

const isLoading = ref(false);
const id = ref(props.product?.id || '');
const name = ref(props.product?.name || '');
const category = ref(props.product?.category || '');
const price = ref(props.product?.price || '');
const file = ref(null);

const handleSubmit = () => {
  isLoading.value = true;
  console.log({
    id: id.value,
    name: name.value,
    category: category.value,
    price: price.value,
    file: file.value
  });

  setTimeout(() => {
    props.afterSubmit?.();
    isLoading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="absolute bottom-0 right-0 left-0 mx-auto max-w-md z-20 flex justify-center">
    <div class="w-full bg-white border-t-2 rounded-3xl py-4 px-6">
      <div class="flex justify-between">
        <h2 class="font-medium mb-6">{{ id ? 'Edit Menu' : 'Tambah Menu' }}</h2>
        <img src="/icons/ic_close.svg" alt="" class="h-6" />
      </div>
      <div class="flex flex-col gap-4">
        <CustomInput label="Kategori" type="text" v-model="category" />
        <CustomInput label="Nama" placeholder="nama produk" type="text" v-model="name" />
        <CustomInput label="Harga" placeholder="harga produk" type="number" v-model="price" />
        <CustomInput label="Gambar produk (opsional)" type="file" v-model="file" />
        <CustomButton :isLoading="isLoading" @click="handleSubmit">Simpan</CustomButton>
      </div>
    </div>
  </div>
</template>

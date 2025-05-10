<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';
import SelectInput from '../input/SelectInput.vue';
import CustomInput from '../input/CustomInput.vue';
import CustomButton from '../button/CustomButton.vue';
import { useCartStore } from '@/stores/cart/cartStore';

const cartStore = useCartStore();

const money = ref(0);
const paymentMethod = ref('cash');
const cashback = computed(() => money.value - cartStore.grandTotal);
const listOfPaymentMethod = ref([
  { id: 'cash', text: 'Tunai' },
  { id: 'qris', text: 'QRIS' },
  { id: 'non-cash', text: 'Non-tunai lain' },
]);

const handleSave = async () => {};
const handleProcess = async () => {};

onBeforeUnmount(() => {
  cartStore.reset();
});
</script>

<template>
  <div class="absolute -bottom-4 right-0 left-0 mx-auto max-w-md z-20 flex justify-center">
    <div class="w-full bg-white dark:bg-slate-800 border-t-2 border-gray-50 dark:border-gray-800 rounded-3xl py-4 pb-8 px-6">
      <div class="flex justify-between text-sm">
        <p>Total:</p>
        <p class="font-semibold">Rp. {{ cartStore.grandTotal }}</p>
      </div>
      <div class="py-4 flex flex-col gap-2">
        <div class="flex gap-2">
          <SelectInput label="Metode Pembayaran" :options="listOfPaymentMethod" v-model="paymentMethod" />
          <CustomInput v-if="paymentMethod === 'cash'" type="number" label="Jumlah Uang" placeholder="Rp." v-model="money" />
        </div>
        <div v-if="paymentMethod === 'cash'" class="flex justify-between text-sm">
          <p>Kembalian:</p>
          <p class="font-semibold">Rp. {{ cashback }}</p>
        </div>
        <div class="flex gap-4 mt-2">
          <CustomButton styleType="outline" @click="handleSave">Tunda</CustomButton>
          <CustomButton @click="handleProcess">Proses</CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import SelectInput from '../input/SelectInput.vue';
import CustomInput from '../input/CustomInput.vue';
import CustomButton from '../button/CustomButton.vue';
import { useCartStore } from '@/stores/cart/cartStore';
import { useOrderStore } from '@/stores/order/orderStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const props = defineProps({
  table: Number
});

const money = ref(0);
const paymentMethod = ref('cash');
const cashback = computed(() => money.value - cartStore.grandTotal);
const listOfPaymentMethod = ref([
  { id: 'cash', text: 'Tunai' },
  { id: 'qris', text: 'QRIS' },
  { id: 'non-cash', text: 'Non-tunai lain' }
]);

const handleSave = async (isFinish = false) => {
  if (!props.table || props.table === '') {
    alert('nomor meja wajib diisi');
    return;
  }

  if (!cartStore.products.length) {
    if (!confirm('Tidak ada item di dalam keranjang, hapus transaksi?')) return;

    if (route.params.order_id) {
      // hapus dari firestore
    }

    window.history.back();
    return;
  }

  const payload = {
    id: route.params.order_id || '',
    label: props.table || 0,
    total: cartStore.grandTotal,
    money: paymentMethod.value === 'cash' ? money.value : cartStore.grandTotal,
    method: paymentMethod.value,
    orderList: cartStore.products
  };

  const result = route.params.order_id ? await orderStore.editOrder(payload, isFinish) : await orderStore.newOrder(payload, isFinish);
  const error = orderStore.create.error || orderStore.update.error;
  if (error) {
    alert(error);
    return;
  }

  if (!isFinish) router.push({ name: 'dashboard' });
  return result.data.id;
};

const handleProcess = async () => {
  if(cashback.value < 0) {
    alert('Uang pelanggan kurang, tidak bisa meneruskan pembayaran!')
    return;
  }
  const orderId = await handleSave(true);
  router.push({ name: 'bill', params: { order_id: orderId } });
};
</script>

<template>
  <div class="absolute -bottom-4 right-0 left-0 mx-auto max-w-md z-20 flex justify-center">
    <div class="w-full bg-white dark:bg-slate-800 border-t-2 border-gray-50 dark:border-gray-800 rounded-3xl py-4 pb-8 px-6">
      <div class="flex justify-between text-sm">
        <p>Total:</p>
        <p class="font-semibold">Rp. {{ cartStore.grandTotal.toLocaleString('id-ID') }}</p>
      </div>

      <div v-if="orderStore.create.loading || orderStore.update.loading" class="flex flex-col gap-4 justify-center items-center my-8">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p>Menyimpan...</p>
      </div>

      <div v-else class="py-4 flex flex-col gap-2">
        <div class="flex gap-2">
          <SelectInput label="Metode Pembayaran" :options="listOfPaymentMethod" v-model="paymentMethod" />
          <CustomInput v-if="paymentMethod === 'cash'" type="number" label="Jumlah Uang" placeholder="Rp." v-model="money" />
        </div>
        <div v-if="paymentMethod === 'cash'" class="flex justify-between text-sm">
          <p>Kembalian:</p>
          <p class="font-semibold">Rp. {{ cashback.toLocaleString('id-ID') }}</p>
        </div>
      </div>
      <div class="flex gap-4 mb-4">
        <CustomButton styleType="outline" @click="handleSave">Simpan dulu</CustomButton>
        <CustomButton @click="handleProcess">Bayar Sekarang</CustomButton>
      </div>
    </div>
  </div>
</template>

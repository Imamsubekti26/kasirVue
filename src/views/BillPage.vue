<script setup>
import CustomButton from '@/components/shared/button/CustomButton.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { useOrderStore } from '@/stores/order/orderStore';
import { onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const orderStore = useOrderStore();

// Format waktu
const formattedTime = (time) =>
  new Date(time * 1000).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

const handleBack = () => {
  if (globalStore.report.isFromReport) {
    window.history.back();
  } else {
    router.push({name: 'dashboard'})
  }
};

const fetchData = async (historyId) => {
  await orderStore.fetchDetailOrder(historyId);
  if (orderStore.detail.error) {
    alert(orderStore.detail.error);
    return;
  }
};

onBeforeMount(() => {
  globalStore.report.markAsFromBill();
});

onMounted(async () => {
  await fetchData(route.params.order_id);
});
</script>

<template>
  <div class="flex flex-col justify-between items-center h-screen w-screen p-6 pt-16">
    <main class="w-full">
      <div class="w-full flex flex-col gap-4 items-center">
        <h1 class="font-semibold">Status Transaksi</h1>
        <img src="/icons/success.svg" alt="success" />
        <h1 class="font-semibold">Berhasil</h1>
      </div>
      <h2 class="w-full text-left font-semibold mt-6 mb-2">Detail Transaksi</h2>
      <div class="flex w-full justify-between">
        <p>Waktu</p>
        <p>{{ formattedTime(orderStore.orderDetail.order_date.seconds) }}</p>
      </div>
      <div class="flex w-full justify-between">
        <p>Total</p>
        <p>Rp.{{ orderStore.orderDetail.total.toLocaleString('id-ID') }}</p>
      </div>
      <div class="flex w-full justify-between">
        <p>Bayar</p>
        <p>Rp.{{ orderStore.orderDetail.money.toLocaleString('id-ID') }}</p>
      </div>
      <div class="flex w-full justify-between">
        <p>Kembali</p>
        <p>Rp. {{ (orderStore.orderDetail.money - orderStore.orderDetail.total).toLocaleString('id-ID') }}</p>
      </div>
      <div class="flex w-full justify-between">
        <p>Metode</p>
        <p>{{ orderStore.orderDetail.method }}</p>
      </div>

      <h2 class="w-full text-left font-semibold mt-6 mb-2">Rincian Pesanan</h2>
      <div v-for="item in orderStore.orderDetail.orderList" :key="item.id" class="flex w-full justify-between">
        <p>{{ item.name }} (x{{ item.amount }})</p>
        <p>Rp. {{ (item.price * item.amount).toLocaleString('id-ID') }}</p>
      </div>
    </main>
    <footer class="w-full flex flex-col gap-2">
      <CustomButton>Cetak</CustomButton>
      <CustomButton styleType="outline" @click="handleBack">Kembali</CustomButton>
    </footer>
  </div>
</template>

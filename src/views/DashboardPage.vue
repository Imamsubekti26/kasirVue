<script setup>
import OrderCard from '@/components/shared/card/OrderCard.vue';
import { useGlobalStore } from '@/stores/globalStore';
import { useOrderStore } from '@/stores/order/orderStore';
import { onMounted, computed } from 'vue';

const globalStore = useGlobalStore();
const orderStore = useOrderStore();

const totalData = computed(() => orderStore.orders.length);
const totalBalance = computed(() => orderStore.orders.reduce((sum, item) => sum + item.total, 0));
const transactions = computed(() => {
  return orderStore.orders.filter((o) => (globalStore.dashboard.activeTab === 'pending' ? o.finish_date === null : o.finish_date !== null));
});

const changeActiveTab = (tab) => {
  globalStore.dashboard.activeTab = tab;
};

const fetchTodayOrders = async () => {
  await orderStore.fetchOrder(true);
  if (orderStore.get.error) {
    alert(orderStore.get.error);
  }
};

onMounted(async () => {
  await fetchTodayOrders();
});
</script>

<template>
  <div class="sticky top-0 pb-2 z-10 px-6 pt-4 bg-white dark:bg-slate-900">
    <h2 class="mb-2">Transaksi Hari ini:</h2>
    <div class="flex justify-between gap-4">
      <div class="rounded-lg px-4 py-3 flex-grow bg-blue-400 text-white dark:text-black">
        <p class="text-xs">total transaksi:</p>
        <p class="font-semibold">{{ totalData || 0 }}</p>
      </div>
      <div class="rounded-lg px-4 py-3 flex-grow bg-blue-400 text-white dark:text-black">
        <p class="text-xs">total perolehan:</p>
        <p class="font-semibold">Rp. {{ totalBalance.toLocaleString('id-ID') || 0 }}</p>
      </div>
    </div>

    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex w-full justify-between gap-4 -mb-px mt-2">
        <li class="flex-grow" @click="changeActiveTab('pending')">
          <p
            class="block p-3 border-b-2 rounded-t-lg"
            :class="{
              'active border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:text-blue-700 hover:border-blue-300 dark:hover:text-blue-600': globalStore.dashboard.activeTab === 'pending',
              'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300': globalStore.dashboard.activeTab !== 'pending'
            }"
          >
            Belum Bayar
          </p>
        </li>
        <li class="flex-grow" @click="changeActiveTab('done')">
          <p
            class="block p-3 border-b-2 rounded-t-lg"
            :class="{
              'active border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:text-blue-700 hover:border-blue-300 dark:hover:text-blue-600': globalStore.dashboard.activeTab === 'done',
              'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300': globalStore.dashboard.activeTab !== 'done'
            }"
          >
            Transaksi Selesai
          </p>
        </li>
      </ul>
    </div>
  </div>

  <div v-if="orderStore.get.loading && !orderStore.orders.length" class="flex flex-col gap-4 justify-center items-center mt-4">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <p>Loading</p>
  </div>

  <div v-else-if="orderStore.get.loading && orderStore.orders.length" class="flex justify-center">
    <svg class="animate-spin m-1 h-3 w-3 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <p class="text-sm">Singkronisasi...</p>
  </div>

  <div class="flex flex-col gap-1 mt-4 w-full px-4">
    <OrderCard v-for="item in transactions" :key="item.id" :id="item.id" :title="`Meja no.${item.label}`" :time="item.order_date.seconds" :price="item.total" :done="item.finish_date || null" />
  </div>
</template>

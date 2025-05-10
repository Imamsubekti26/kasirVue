<script setup>
import OrderCard from '@/components/shared/card/OrderCard.vue';
import { ref } from 'vue';

const totalData = ref(0);
const totalBalance = ref(0);
const activeTab = ref('pending'); // [done, pending]
const transactions = ref([
  {
    id: 'robh6mCnfCYD5tBoDKvG',
    label: 1,
    total: 6000,
    money: 6000,
    method: 'qris',
    order_date: {
      seconds: 1746840299,
      nanoseconds: 545000000
    },
    finish_date: null
  }
]);

const changeActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="sticky top-0 pb-2 z-10 px-6 pt-4 bg-white dark:bg-slate-800">
    <h2 class="mb-2">Transaksi Hari ini:</h2>
    <div class="flex justify-between gap-4">
      <div class="rounded-lg px-4 py-3 flex-grow bg-blue-400 text-white dark:text-black">
        <p class="text-xs">total transaksi:</p>
        <p class="font-semibold">{{ totalData || 0 }}</p>
      </div>
      <div class="rounded-lg px-4 py-3 flex-grow bg-blue-400 text-white dark:text-black">
        <p class="text-xs">total perolehan:</p>
        <p class="font-semibold">Rp. {{ totalBalance || 0 }}</p>
      </div>
    </div>

    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex w-full justify-between gap-4 -mb-px mt-2">
        <li class="flex-grow" @click="changeActiveTab('pending')">
          <p
            class="block p-3 border-b-2 rounded-t-lg"
            :class="{
              'active border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:text-blue-700 hover:border-blue-300 dark:hover:text-blue-600': activeTab === 'pending',
              'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300': activeTab !== 'pending'
            }"
          >
            Belum Bayar
          </p>
        </li>
        <li class="flex-grow" @click="changeActiveTab('done')">
          <p
            class="block p-3 border-b-2 rounded-t-lg"
            :class="{
              'active border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:text-blue-700 hover:border-blue-300 dark:hover:text-blue-600': activeTab === 'done',
              'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300': activeTab !== 'done'
            }"
          >
            Transaksi Selesai
          </p>
        </li>
      </ul>
    </div>
  </div>
  <div class="flex flex-col gap-1 mt-4 w-full px-4">
    <OrderCard v-for="item in transactions" :key="item.id" :id="item.id" :title="`Meja no.${item.label}`" :time="item.order_date.seconds" :price="item.money" />
  </div>
</template>

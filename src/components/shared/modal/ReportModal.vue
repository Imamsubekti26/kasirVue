<script setup>
import { ref } from 'vue';
import OrderCard from '../card/OrderCard.vue';

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
</script>

<template>
  <div class="sticky top-0 pb-2 z-10 px-4 pt-2 bg-white dark:bg-slate-900">
    <div class="text-center">
      <h4 class="text-sm">Tanggal</h4>
      <h2 class="">20 Mei 2025 - 20 Juni 2025</h2>
    </div>
    <div class="flex justify-between gap-4 mt-4">
      <div class="rounded-lg px-4 py-3 flex-grow bg-blue-400 text-white dark:text-black">
        <p class="text-xs">total transaksi:</p>
        <p class="font-semibold">{{ totalData || 0 }}</p>
      </div>
      <div class="rounded-lg px-4 py-3 flex-grow bg-blue-400 text-white dark:text-black">
        <p class="text-xs">total perolehan:</p>
        <p class="font-semibold">Rp. {{ totalBalance || 0 }}</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-1 mt-4 w-full px-4">
    <OrderCard v-for="item in transactions" :key="item.id" :id="item.id" :title="`Meja no.${item.label}`" :time="item.order_date.seconds" :price="item.money" />
  </div>
</template>

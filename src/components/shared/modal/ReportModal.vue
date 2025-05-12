<script setup>
import { computed } from 'vue';
import OrderCard from '../card/OrderCard.vue';
import { useOrderStore } from '@/stores/order/orderStore';
import { getFormattedDateReport } from '@/lib/helpers/dateFormatter';

const props = defineProps({
  reportType: {
    type: String,
    default: 'date',
    validator: (val) => ['date', 'month', 'year'].includes(val)
  },
  reportDate: Object
});

const orderStore = useOrderStore();

const transactions = computed(() => orderStore.orders.filter((item) => item.finish_date));
const totalData = computed(() => transactions.value.length);
const totalBalance = computed(() => transactions.value.reduce((sum, item) => sum + item.total, 0));

const titleStart = computed(() => getFormattedDateReport(props.reportType, props.reportDate.start));
const titleEnd = computed(() => getFormattedDateReport(props.reportType, props.reportDate.end));

const titleList = {
  date: 'Tanggal',
  month: 'Bulan',
  year: 'Tahun'
};
</script>

<template>
  <div class="sticky top-0 pb-2 z-10 px-4 pt-2 bg-white dark:bg-slate-900">
    <div class="text-center">
      <h4 class="text-sm">{{ titleList[reportType] }}</h4>
      <h2 class="">
        {{ titleStart }} {{ titleStart !== titleEnd ? `- ${titleEnd}` : '' }}
      </h2>
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

  <div v-if="orderStore.get.loading" class="flex flex-col gap-4 justify-center items-center mt-4">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <p>Loading</p>
  </div>

  <div v-else class="flex flex-col gap-1 mt-4 w-full px-4">
    <OrderCard v-for="item in transactions" :key="item.id" :id="item.id" :title="`Meja no.${item.label}`" :time="item.order_date.seconds" :price="item.total" :done="{ status: true }" />
  </div>
</template>

<script setup>
import { useGlobalStore } from '@/stores/globalStore';
import { onBeforeMount } from 'vue';

const globalStore = useGlobalStore();
onBeforeMount(() => {
  globalStore.report.markAsFromBill();
})
</script>

<template>bill</template>

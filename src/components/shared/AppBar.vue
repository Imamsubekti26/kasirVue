<script setup>
import { useRoute } from 'vue-router';
import BackIcon from '../icon/BackIcon.vue';

const route = useRoute();

defineProps({
  back: Boolean,
  close: Boolean,
});

const emit = defineEmits(['close']);

const goBack = () => {
  window.history.back();
};
</script>

<template>
  <header class="flex justify-between items-center w-full px-6 py-4 bg-white dark:bg-slate-800 h-16 border-b border-slate-200 dark:border-slate-900">
    <div class="w-6">
      <div v-if="back" @click="goBack">
        <BackIcon />
      </div>
      <div v-if="close" @click="emit('close')">
        <BackIcon />
      </div>
    </div>
    <h1 class="text-center text-black dark:text-white font-bold">{{ route.name.toUpperCase() }}</h1>
    <div class="w-6"></div>
  </header>
</template>

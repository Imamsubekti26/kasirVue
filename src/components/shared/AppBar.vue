<script setup>
import { useRoute } from 'vue-router';
import BackIcon from '../icon/BackIcon.vue';

const route = useRoute();

defineProps({
  back: Boolean
})

const goBack = () => {
  window.history.back()
}

</script>

<template>
<header class="flex justify-between items-center w-full px-6 py-4 bg-white h-16 border-b">
  <div class="w-6">
    <div v-if="back" @click="goBack">
      <BackIcon />
    </div>
  </div>
  <h1 class="text-center text-black font-bold">{{ route.name.toUpperCase() }}</h1>
  <div class="w-6"></div>
</header>
</template>

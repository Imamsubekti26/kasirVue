<script setup lang="ts">
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  styleType: {
    type: String,
    default: 'fill' // [outline, danger, fill]
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

const looks = computed(() => {
  switch (props.styleType) {
    case 'outline':
      return 'text-blue-400 bg-white border border-blue-400';
    case 'danger':
      return 'text-red-400 border border-red-400';
    default:
      return 'text-white bg-blue-400';
  }
});
</script>

<template>
  <button class="w-full px-2.5 py-3 rounded-md text-xs flex items-center justify-center" :class="looks" :disabled="isLoading" @click="$emit('click')">
    <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <slot />
  </button>
</template>

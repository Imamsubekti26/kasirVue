<script setup>
defineProps({
  icon: {
    type: String
  },
  color: {
    type: String,
    default: 'default' // [default, danger]
  }
});
</script>

<template>
  <button class="w-8 h-8 rounded-md text-white flex justify-center items-center" :class="{ 'bg-blue-400': color === 'default', 'bg-red-500': color === 'danger' }">
    <img :src="icon" alt="" class="w-5 h-5" />
  </button>
</template>

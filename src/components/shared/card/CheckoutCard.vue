<script setup>
defineProps({
  title: {
    type: String,
    default: 'Soto Jadul Lamongan'
  },
  price: {
    type: String,
    default: '20.000'
  }
});
</script>

<template>
  <div class="flex flex-col gap-2 mb-2 text-black dark:text-white">
    <div class="flex justify-between px-6">
      <div class="flex gap-4 w-full">
        <div class="flex flex-col justify-between h-full w-full">
          <p class="text-base font-medium text-left">{{ title }}</p>
          <div class="flex justify-between items-end mt-2">
            <div class="flex gap-2 items-center">
              <slot />
            </div>
            <p class="text-sm font-semibold text-left">{{ price }}</p>
          </div>
        </div>
      </div>
    </div>
    <hr class="w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
  </div>
</template>

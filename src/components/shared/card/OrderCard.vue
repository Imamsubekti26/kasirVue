<script setup>
import { useRouter } from 'vue-router';

// Props
const props = defineProps({
  id: [String, Number],
  title: {
    type: String,
    default: 'Meja no.0'
  },
  time: {
    type: Number,
    default: 1720578875
  },
  price: {
    type: Number,
    default: 0
  }
});

// Format waktu
const formattedTime = new Date(props.time * 1000).toLocaleString('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

// Router
const router = useRouter();

// Click handler sementara hanya navigasi
const handleClick = () => {
  router.push({ name: 'order' }); // ganti nanti jika perlu kondisi
};
</script>

<template>
  <div class="flex justify-between items-center px-5 py-3 mb-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-800" @click="handleClick">
    <div class="flex justify-between items-center flex-grow">
      <div class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
        <p class="flex-grow-0 flex-shrink-0 text-base text-left">{{ title }}</p>
        <p class="flex-grow-0 flex-shrink-0 text-xs text-left">{{ formattedTime }}</p>
      </div>
      <p class="flex-grow-0 flex-shrink-0 text-base text-right">{{ price }}</p>
    </div>
  </div>
</template>

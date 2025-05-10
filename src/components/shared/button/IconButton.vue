<script setup>
defineProps({
  icon: {
    type: String
  }
});

defineEmits('click');
</script>

<button class="w-8 h-8 bg-blue-400 rounded-md text-white flex justify-center items-center" @click="emit('click')">
  <img :src="icon" alt="" class="w-5 h-5">
</button>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: 1
  },
  options: {
    type: Array,
    default: () => [
      { id: 'all', text: 'Semua' },
      { id: 'food', text: 'Makanan' },
      { id: 'drink', text: 'Minuman' },
      { id: 'snack', text: 'Camilan' }
    ]
  }
});

const emit = defineEmits(['update:modelValue']);

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <div class="flex flex-col w-full gap-1">
    <label v-if="label !== ''" class="text-xs text-left">{{ label }}</label>

    <div class="flex justify-start items-center h-12 px-3 py-2 rounded-lg border border-gray-400 gap-2">
      <select class="text-sm w-full focus:outline-none focus:ring-0 bg-transparent" :disabled="disabled" v-model="modelValueProxy">
        <option v-for="option in options" :key="option.id" :value="option.id">
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

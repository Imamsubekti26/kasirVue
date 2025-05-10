<script setup>
defineProps({
  modelValue: [String, Number], // wajib nama 'modelValue' untuk v-model
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (val) => ['text', 'number', 'password', 'search', 'date', 'time'].includes(val)
  },
  placeholder: String,
  disabled: Boolean
});
</script>

<template>
  <div class="flex flex-col w-full gap-1">
    <label v-if="label" class="text-xs text-left text-black">{{ label }}</label>
    <div class="flex justify-start items-center h-12 px-3 py-2 rounded-lg bg-white border border-gray-400 gap-2">
      <input :type="type" :placeholder="placeholder" :disabled="disabled" class="text-sm w-full focus:outline-none bg-transparent" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    </div>
  </div>
</template>

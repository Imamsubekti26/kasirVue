<script setup>
import { ref } from 'vue';
import { toBase64, convertToWebP, compressImage } from '@/lib/helpers/imageManipulation';

defineProps({
  modelValue: String,
  label: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const fileName = ref('');

const handleFileChange = async (event) => {
  const singleFile = event.target.files[0];
  if (singleFile) {
    fileName.value = singleFile.name;

    let compressedFile = singleFile;
    if (singleFile.size > 200 * 1024) {
      compressedFile = await compressImage(singleFile);
    }

    const webpFile = await convertToWebP(compressedFile);
    const base64File = await toBase64(webpFile);

    emit('update:modelValue', base64File);
  }
};
</script>

<template>
  <div class="flex flex-col w-full gap-1">
    <label v-if="label" class="text-xs text-left text-black">{{ label }}</label>
    <div class="flex justify-start items-center h-12 px-3 py-2 rounded-lg bg-white border border-gray-400 gap-2">
      <img src="/icons/ic_picture.svg" alt="picture_icon" />
      <input id="file-input" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
      <label for="file-input" class="text-sm w-full cursor-pointer focus:outline-none focus:ring-0">
        {{ fileName || 'Choose a file' }}
      </label>
    </div>
  </div>
</template>

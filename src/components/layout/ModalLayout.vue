<script setup>
import { computed } from 'vue';
import AppBar from '../shared/AppBar.vue';

const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(['update:visible']);

const isVisible = computed(() => props.visible);

function closeHandler() {
  emit('update:visible');
}
</script>

<template>
  <Teleport defer to="#main-wrapper">
    <div class="w-full h-screen bg-white dark:bg-slate-900 text-black dark:text-white z-2000 absolute top-0 left-0" :class="{ block: isVisible, hidden: !isVisible }">
      <div class="flex flex-col justify-between items-center w-full h-full">
        <AppBar :close="true" @close="closeHandler" />
        <main class="self-stretch flex-grow overflow-y-auto">
          <slot />
        </main>
      </div>
    </div>
  </Teleport>
</template>

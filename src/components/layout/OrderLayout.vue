<script setup>
import baseLayout from './BaseLayout.vue';
</script>

<template>
  <base-layout>
    <div class="flex flex-col justify-between items-center w-full h-full">
      <header></header>
      <main class="self-stretch flex-grow overflow-y-auto">
        <router-view />
      </main>
    </div>
  </base-layout>
</template>

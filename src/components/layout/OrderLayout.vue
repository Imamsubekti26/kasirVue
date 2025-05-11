<script setup>
import AppBar from '../shared/AppBar.vue';
</script>

<template>
  <div id="main-wrapper" class="relative max-w-md mx-auto h-screen bg-white dark:bg-slate-900 text-black dark:text-white">
    <div class="flex flex-col justify-between items-center w-full h-full">
      <AppBar :back="true" />
      <main class="self-stretch flex-grow overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

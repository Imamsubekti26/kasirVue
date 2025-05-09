<script setup>
import AppBar from '../shared/AppBar.vue';
</script>

<template>
  <div class="max-w-md mx-auto h-screen">
    <div class="flex flex-col justify-between items-center w-full h-full">
      <AppBar :back="true" />
      <main class="self-stretch flex-grow overflow-y-auto p-2">
        <router-view />
      </main>
    </div>
  </div>
</template>

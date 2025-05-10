<script setup>
import AppBar from '../shared/AppBar.vue';
import NavBar from '../shared/NavBar.vue';
</script>

<template>
  <div class="max-w-md mx-auto h-screen bg-white dark:bg-slate-900 text-black dark:text-white">
    <div class="flex flex-col justify-between items-center w-full h-full">
      <AppBar :back="false" />
      <main class="self-stretch flex-grow overflow-y-auto">
        <router-view />
      </main>
      <NavBar />
    </div>
  </div>
</template>

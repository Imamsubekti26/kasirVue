<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Dummy sample
const menuList = ref([
  {id: 'dashboard', title: 'Home', icon: '/icons/ic_home.svg', iconActive: '/icons/ic_home_fill.svg'},
  {id: 'product', title: 'Menu', icon: '/icons/ic_burger.svg', iconActive: '/icons/ic_burger_fill.svg'},
  {id: 'order', title: 'New Order', icon: '/icons/ic_plus.svg'},
  {id: 'report', title: 'Laporan', icon: '/icons/ic_chart.svg', iconActive: '/icons/ic_chart_fill.svg'},
  {id: 'settings', title: 'Setting', icon: '/icons/ic_setting.svg', iconActive: '/icons/ic_setting_fill.svg'},
]);

const activeTab = ref('dashboard');

const changeMenu = (menu, routeName) => {
  activeTab.value = menu.id;
  router.push({ name: routeName });
};

onMounted(() => {
  activeTab.value = route.name;
})
</script>

<template>
  <div class="flex justify-between items-end border-t py-2 px-6 h-[70px] self-stretch flex-grow-0 flex-shrink-0 sticky bottom-0 z-10 bg-white">
    <template v-for="menu in menuList" :key="menu.id">
      <button
        v-if="menu.id !== 'order'"
        class="flex flex-col items-center w-10"
        @click="changeMenu(menu, menu.id)"
      >
        <img :src="activeTab === menu.id ? menu.iconActive : menu.icon" alt="" class="w-8 h-8" />
        <p class="text-xs text-blue-400">{{ menu.title }}</p>
      </button>

      <button v-else class="flex flex-col items-center" @click="changeMenu(menu, menu.id)">
        <div class="bg-blue-400 rounded-full p-2">
          <img :src="menu.icon" alt="" class="w-12 h-12" />
        </div>
        <p class="text-xs text-black w-20">{{ menu.title }}</p>
      </button>
    </template>
  </div>
</template>

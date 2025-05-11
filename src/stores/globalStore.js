import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const dashboardActiveTab = ref('pending'); // [done, pending]

  return {
    dashboard: {
      activeTab: dashboardActiveTab
    }
  };
});

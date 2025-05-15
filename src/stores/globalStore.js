import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  const dashboardActiveTab = ref('pending'); // [done, pending]
  const reportModalIsShown = ref(false);
  const fromBillReport = ref([false, false]); // [fromBill, fromReport]

  const markAsFromBill = () => {
    fromBillReport.value = [true, false];
  }; // hanya dipanggil di bill

  const isFromBill = () => {
    const f = fromBillReport.value[0];
    fromBillReport.value = [false, true];
    return f;
  }; // hanya dipanggil di report

  const isFromReport = () => {
    return fromBillReport.value[1]
  };

  return {
    dashboard: {
      activeTab: dashboardActiveTab
    },
    report: {
      isReportShown: reportModalIsShown,
      markAsFromBill,
      isFromBill,
      isFromReport
    }
  };
});

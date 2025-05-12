<script setup>
import ModalLayout from '@/components/layout/ModalLayout.vue';
import CustomButton from '@/components/shared/button/CustomButton.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import ReportModal from '@/components/shared/modal/ReportModal.vue';
import { convertToDateRange } from '@/lib/helpers/dateFormatter';
import { useGlobalStore } from '@/stores/globalStore';
import { useOrderStore } from '@/stores/order/orderStore';
import { ref, onBeforeMount } from 'vue';

const globalStore = useGlobalStore();
const orderStore = useOrderStore();

const selectedType = ref('date');
const selectedDate = ref({ start: '', end: '' });
const selectedMonth = ref({ start: '', end: '' });
const selectedYear = ref({ start: '', end: '' });
const reportDate = ref({ start: '', end: '' }); // ini nanti yg dikirim ke children

const typeOption = ref([
  { id: 'date', text: 'Harian' },
  { id: 'month', text: 'Bulanan' },
  { id: 'year', text: 'Tahunan' }
]);

const downloadExcel = async () => {};

const getReportByDate = async () => {
  const greaterCheck = new Date(selectedDate.value.start) > new Date(selectedDate.value.end);

  if (!selectedDate.value.start || !selectedDate.value.end || greaterCheck) {
    alert('Tanggal tidak valid!');
    return;
  }

  reportDate.value = selectedDate.value;
  globalStore.report.isReportShown = true;

  await orderStore.fetchOrder(true, selectedDate.value.start, selectedDate.value.end);
};

const getReportByMonth = async () => {
  const range = convertToDateRange('month', selectedMonth.value.start, selectedMonth.value.end);
  const greaterCheck = range ? new Date(range.start) > new Date(range.end) : null;

  if (!range || greaterCheck) {
    alert('Bulan tidak valid!');
    return;
  }

  reportDate.value = selectedMonth.value;
  globalStore.report.isReportShown = true;

  await orderStore.fetchOrder(true, range.start, range.end);
};

const getReportByYear = async () => {
  const range = convertToDateRange('year', selectedYear.value.start, selectedYear.value.end);
  const greaterCheck = range ? new Date(range.start) > new Date(range.end) : null;

  if (!range || greaterCheck) {
    alert('Tahun tidak valid!');
    return;
  }

  reportDate.value = selectedYear.value;
  globalStore.report.isReportShown = true;

  await orderStore.fetchOrder(true, range.start, range.end);
};

const showReport = async () => {
  switch (selectedType.value) {
    case 'date':
      getReportByDate();
      break;
    case 'month':
      getReportByMonth();
      break;
    case 'year':
      getReportByYear();
      break;
    default:
      alert('error: tipe laporan tidak cocok dengan data apapun');
  }
};

onBeforeMount(() => {
  if (!globalStore.report.isFromBill()) {
    globalStore.report.isReportShown = false;
  }
});
</script>

<template>
  <div class="flex flex-col gap-2 pt-4 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
    <SelectInput label="Jenis laporan" :options="typeOption" v-model="selectedType" />
    <div v-if="selectedType === 'date'" class="grid grid-cols-2 gap-2">
      <CustomInput v-model="selectedDate.start" label="dari tanggal" type="date" />
      <CustomInput v-model="selectedDate.end" label="sampai tanggal" type="date" />
    </div>
    <div v-else-if="selectedType === 'month'" class="grid grid-cols-2 gap-2">
      <CustomInput type="month" v-model="selectedMonth.start" label="dari bulan" placeholder="dari bulan" />
      <CustomInput type="month" v-model="selectedMonth.end" label="sampai bulan" placeholder="sampai bulan" />
      <div class="col-span-2 bg-yellow-300 dark:bg-orange-500 p-4 text-sm rounded-lg mt-4">
        <h2 class="font-bold">Perhatian!</h2>
        <p>pemilihan bulan hanya didukung untuk pengguna chrome saja! <br/> bagi pengguna firefox atau safari bisa ketik manual dengan format YYYY-mm, contoh: 2025-08.</p>
      </div>
    </div>
    <div v-else-if="selectedType === 'year'" class="grid grid-cols-2 gap-2">
      <CustomInput type="number" v-model="selectedYear.start" label="dari tahun" placeholder="dari tahun" />
      <CustomInput type="number" v-model="selectedYear.end" label="sampai tahun" placeholder="sampai tahun" />
    </div>
    <div class="grid grid-cols-2 gap-2 mt-4">
      <CustomButton @click="showReport">Lihat Laporan</CustomButton>
      <CustomButton styleType="outline">Download Excel</CustomButton>
    </div>
  </div>

  <ModalLayout v-model:visible="globalStore.report.isReportShown">
    <ReportModal :reportType="selectedType" :reportDate="reportDate" />
  </ModalLayout>
</template>

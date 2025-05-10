<script setup>
import ModalLayout from '@/components/layout/ModalLayout.vue';
import CustomButton from '@/components/shared/button/CustomButton.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import ReportModal from '@/components/shared/modal/ReportModal.vue';
import { ref } from 'vue';

const isReportShown = ref(false);
const selectedCategory = ref('all');
const selectedType = ref('date');
const startDate = ref('');
const endDate = ref('');
const month = ref('');
const year = ref('');

const typeOption = ref([
  { id: 'date', text: 'harian' },
  { id: 'month', text: 'Bulanan' },
  { id: 'year', text: 'Tahunan' }
]);

const downloadExcel = async () => {};

const showReport = () => {
  isReportShown.value = true;
};
</script>

<template>
  <div class="flex flex-col gap-2 pt-4 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
    <SelectInput label="Jenis laporan" :options="typeOption" v-model="selectedType" />
    <div v-if="selectedType === 'date'" class="grid grid-cols-2 gap-2">
      <CustomInput v-model="startDate" label="dari tanggal" type="date" />
      <CustomInput v-model="endDate" label="sampai tanggal" type="date" />
    </div>
    <CustomInput v-else-if="selectedType === 'month'" type="month" v-model="month" label="pilih bulan" placeholder="pilih bulan" />
    <CustomInput v-else-if="selectedType === 'year'" type="number" v-model="year" label="pilih tahun" placeholder="pilih tahun" />
    <SelectInput label="Filter kategori" v-model="selectedCategory" />
    <div class="grid grid-cols-2 gap-2 mt-4">
      <CustomButton @click="showReport">Lihat Laporan</CustomButton>
      <CustomButton styleType="outline">Download Excel</CustomButton>
    </div>
  </div>

  <ModalLayout v-model:visible="isReportShown">
    <ReportModal />
  </ModalLayout>
</template>

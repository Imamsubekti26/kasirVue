<script setup>
import CustomButton from '@/components/shared/button/CustomButton.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import { ref, watch, onMounted } from 'vue';

const disabled = ref(true);
const isLoading = ref(false);
const userInfo = ref({
  name: '',
  address: '',
  email: '',
  phone: '',
  openTime: '',
  closeTime: '',
  instagram: ''
});
const editedInfo = ref({
  name: '',
  address: '',
  email: '',
  phone: '',
  openTime: '',
  closeTime: '',
  instagram: ''
});

const language = ref('indonesia');
const theme = ref('dark');

const refreshProfile = () => {
  editedInfo.value = {
    name: userInfo.value.name,
    address: userInfo.value.address,
    email: userInfo.value.email,
    phone: userInfo.value.phone,
    openTime: userInfo.value.openTime,
    closeTime: userInfo.value.closeTime,
    instagram: userInfo.value.valueinstagram
  };
};

const logout = async () => {};

const saveProfile = async () => {};

const cancelSave = async () => {
  disabled.value = true;
  refreshProfile();
};

watch(
  () => userInfo.value,
  () => refreshProfile()
);
onMounted(() => refreshProfile());
</script>

<template>
  <div class="px-6 pb-6">
    <h2 v-if="disabled" class="mb-4 pt-4">Pengaturan Aplikasi:</h2>
    <div class="flex gap-4">
      <SelectInput
        label="Bahasa"
        :disabled="true"
        v-model="language"
        :options="[
          { id: 'indonesia', text: 'Indonesia' },
          { id: 'english', text: 'English' }
        ]"
      />
      <SelectInput
        label="Tema"
        :disabled="true"
        v-model="theme"
        :options="[
          { id: 'light', text: 'Terang' },
          { id: 'dark', text: 'Gelap' }
        ]"
      />
    </div>

    <h2 class="mb-4 mt-4">Pengaturan Toko:</h2>
    <div class="flex flex-col gap-4">
      <CustomInput label="Nama Toko" :disabled="disabled" v-model="editedInfo.name" />
      <CustomInput label="Alamat Toko" :disabled="disabled" v-model="editedInfo.address" />
      <CustomInput label="Email" :disabled="true" v-model="editedInfo.email" />
      <CustomInput label="Nomor Telepon" :disabled="disabled" v-model="editedInfo.phone" />
      <div class="flex gap-4">
        <CustomInput type="time" label="Jam Operasional" :disabled="disabled" v-model="editedInfo.openTime" />
        <CustomInput type="time" label="Sampai Jam" :disabled="disabled" v-model="editedInfo.closeTime" />
      </div>
      <CustomInput label="Media Sosial (instagram)" placeholder="@instagram" :disabled="disabled" v-model="editedInfo.instagram" />

      <template v-if="disabled">
        <CustomButton @click="disabled = !disabled">Edit Profile</CustomButton>
        <CustomButton styleType="danger" @click="logout">Log Out</CustomButton>
      </template>
      <div v-else class="flex gap-4">
        <CustomButton @click="saveProfile" :isLoading="isLoading">Simpan Perubahan</CustomButton>
        <CustomButton styleType="danger" @click="cancelSave">Batal</CustomButton>
      </div>
    </div>
  </div>
</template>

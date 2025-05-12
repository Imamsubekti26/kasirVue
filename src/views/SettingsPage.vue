<script setup>
import CustomButton from '@/components/shared/button/CustomButton.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import SelectInput from '@/components/shared/input/SelectInput.vue';
import { useAuthStore } from '@/stores/auth/authStore';
import { useProfileStore } from '@/stores/profile/profileStore';
import { computed } from 'vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const disabled = ref(true);
const userInfo = computed(() => profileStore.profile);
const editedInfo = ref({
  name: '',
  address: '',
  email: '',
  phone: '',
  open_time: '',
  close_time: '',
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
    open_time: userInfo.value.open_time,
    close_time: userInfo.value.close_time,
    instagram: userInfo.value.instagram
  };
};

const logout = async () => {
  if (!confirm('apakah anda yakin untuk logout?')) return;

  await authStore.signOut();

  if (!authStore.error) {
    router.push({ name: 'login' });
  } else {
    alert(authStore.error);
  }
};

const getProfile = async () => {
  await profileStore.fetchUser();
  if (profileStore.error) {
    alert(profileStore.error);
  }
};

const saveProfile = async () => {
  await profileStore.editProfile(editedInfo.value);
  if (profileStore.update.error) {
    alert(profileStore.update.error);
    return;
  }

  await profileStore.fetchUser(true);
  if (profileStore.get.error) {
    alert(profileStore.get.error);
    return;
  }

  disabled.value = true;
};

const cancelSave = async () => {
  disabled.value = true;
  refreshProfile();
};

watch(
  () => userInfo.value,
  () => refreshProfile()
);

onMounted(async () => {
  await getProfile();
  refreshProfile();
});
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

    <div v-if="profileStore.get.loading" class="flex flex-col gap-4 justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p>Loading</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <CustomInput label="Nama Toko" :disabled="disabled" v-model="editedInfo.name" />
      <CustomInput label="Alamat Toko" :disabled="disabled" v-model="editedInfo.address" />
      <CustomInput label="Email" :disabled="true" v-model="editedInfo.email" />
      <CustomInput label="Nomor Telepon" :disabled="disabled" v-model="editedInfo.phone" />
      <div class="flex gap-4">
        <CustomInput type="time" label="Jam Operasional" :disabled="disabled" v-model="editedInfo.open_time" />
        <CustomInput type="time" label="Sampai Jam" :disabled="disabled" v-model="editedInfo.close_time" />
      </div>
      <CustomInput label="Media Sosial (instagram)" placeholder="@instagram" :disabled="disabled" v-model="editedInfo.instagram" />

      <template v-if="disabled">
        <CustomButton @click="disabled = !disabled">Edit Profile</CustomButton>
        <CustomButton styleType="danger" @click="logout">Log Out</CustomButton>
      </template>
      <div v-else class="flex gap-4 mb-12">
        <CustomButton @click="saveProfile" :isLoading="profileStore.update.loading">Simpan Perubahan</CustomButton>
        <CustomButton styleType="danger" @click="cancelSave">Batal</CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import CustomButton from '@/components/shared/button/CustomButton.vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const isLoading = computed(() => authStore.loading);

const handleSubmit = async () => {
  if (password.value !== passwordConfirm.value) {
    alert('Password tidak sama, coba lagi');
    return;
  }

  await authStore.signUp(email.value, password.value);

  if (authStore.error) {
    alert(authStore.error);
  } else {
    router.push({ name: 'login' });
  }
};
</script>

<template>
  <div class="flex flex-col gap-6 px-6">
    <span class="mb-16" />
    <div class="flex flex-col items-center gap-4">
      <img src="/icon192.webp" alt="" class="w-16 rounded-xl" />
      <h1 class="font-semibold text-lg text-center">Hallo, Mari Bergabung!</h1>
    </div>

    <CustomInput type="email" label="Email" placeholder="Masukkan Email" v-model="email" />
    <CustomInput type="password" label="Password" placeholder="Masukkan Password" v-model="password" />
    <CustomInput type="password" label="Konfirmasi Password" placeholder="Konfirmasi Password" v-model="passwordConfirm" />

    <CustomButton :isLoading="isLoading" @click="handleSubmit">Daftar</CustomButton>

    <div class="flex items-center justify-center gap-4">
      <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 flex-grow relative" />
      <span class="text-center text-sm">atau daftar dengan:</span>
      <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 flex-grow relative" />
    </div>

    <CustomButton styleType="outline">Google</CustomButton>

    <p class="text-center text-sm">
      Sudah punya akun?
      <router-link :to="{ name: 'login' }" class="text-blue-400">Login</router-link>
    </p>
  </div>
</template>

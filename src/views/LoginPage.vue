<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import CustomButton from '@/components/shared/button/CustomButton.vue';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth/authStore.js';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const remember = ref(false);
const isLoading = computed(() => authStore.loading);

const handleSubmit = async () => {
  await authStore.signIn(email.value, password.value, remember.value);

  if (!authStore.error) {
    router.push({ name: 'dashboard' });
  } else {
    alert(authStore.error);
  }
};
</script>

<template>
  <div class="flex flex-col gap-6 px-6">
    <span class="mb-16" />
    <div class="flex flex-col items-center gap-4">
      <img src="/icon192.webp" alt="" class="w-16 rounded-xl" />
      <h1 class="font-semibold text-lg text-center">Hai, Selamat Datang Kembali!</h1>
    </div>

    <CustomInput type="email" label="Email" placeholder="Masukkan Email" v-model="email" />
    <CustomInput type="password" label="Password" placeholder="Masukkan Password" v-model="password" />

    <div class="flex justify-between">
      <div>
        <input type="checkbox" id="rememberme" v-model="remember" />
        <label for="rememberme" class="text-sm"> Ingat Saya</label>
      </div>
      <p class="text-red-400 text-sm font-medium"></p>
    </div>

    <CustomButton :isLoading="isLoading" @click="handleSubmit">Masuk</CustomButton>

    <div class="flex items-center justify-center gap-4">
      <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 flex-grow relative" />
      <span class="text-center text-sm">atau masuk dengan:</span>
      <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700 flex-grow relative" />
    </div>

    <CustomButton styleType="outline">Google</CustomButton>

    <p class="text-center text-sm">
      Belum punya akun?
      <router-link :to="{ name: 'register' }" class="text-blue-400">Daftar</router-link>
    </p>
  </div>
</template>

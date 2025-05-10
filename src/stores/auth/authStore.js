import { login, logout, register } from '@/lib/firebase/services/userService';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const loading = ref(false);
  const error = ref(null);

  const signIn = async (email, password, remember) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    const user = await login(email, password);

    if (user.error) {
      error.value = user.message;
    } else {
      const expires = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 8;
      Cookies.set('jwtToken', user.token, { expires, sameSite: 'Strict', secure: import.meta.env.PROD });
      Cookies.set('isLogin', true, { expires, sameSite: 'Strict', secure: import.meta.env.PROD });
      error.value = null;
    }

    loading.value = false;
  };

  const signOut = async () => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    const result = await logout();

    if (result.error) {
      error.value = result.message;
    } else {
      error.value = null;
      Cookies.remove('isLogin');
      Cookies.remove('jwtToken');
    }

    loading.value = false;
  };

  const signUp = async (email, password) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    const user = await register(email, password);

    error.value = user.error ? user.message : null;
    loading.value = false;
  };

  return { loading, error, signIn, signOut, signUp };
});

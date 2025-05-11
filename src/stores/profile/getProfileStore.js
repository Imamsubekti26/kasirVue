import { getProfile } from '@/lib/firebase/services/userService';
import { getUserId } from '@/lib/helpers/session';
import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGetProfileStore = defineStore('getProfile', () => {
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchUser = async (force = false) => {
    if (loading.value) return;

    if (!force && profile.value) return; // caching

    loading.value = true;
    error.value = null;

    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken === undefined) {
      loading.value = false;
      error.value = 'you are not login yet!';
      return { error: true, message: 'you are not login yet!', data: null };
    }

    const userId = getUserId(jwtToken);
    const result = await getProfile(userId);

    if (result.error) {
      error.value = result.message;
      profile.value = null;
    } else {
      error.value = null;
      profile.value = result.data;
    }

    loading.value = false;
    return result;
  };

  return { profile, loading, error, fetchUser };
});

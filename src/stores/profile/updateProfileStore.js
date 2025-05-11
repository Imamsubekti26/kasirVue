import { ref } from 'vue';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import { getUserId } from '@/lib/helpers/session';
import { updateProfile } from '@/lib/firebase/services/userService';

export const useUpdateProfileStore = defineStore('updateProfile', () => {
  const loading = ref(false);
  const error = ref(null);

  const editProfile = async (profile) => {
    if (loading.value) return;

    loading.value = true;
    error.value = null;

    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken === undefined) {
      loading.value = false;
      error.value = 'you are not login yet!';
      return { error: true, message: 'you are not login yet!', data: null };
    }

    const userId = getUserId(jwtToken);
    const result = await updateProfile(userId, profile);

    error.value = result.error ? result.message : null;
    loading.value = false;
    return result;
  };

  return { loading, error, editProfile };
});

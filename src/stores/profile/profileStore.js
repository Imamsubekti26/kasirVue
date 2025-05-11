import { computed } from 'vue';
import { useGetProfileStore } from './getProfileStore';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const getProfile = useGetProfileStore();

  const profile = computed(() => getProfile.profile);

  return {
    profile,
    fetchUser: getProfile.fetchUser,
    get: getProfile
  };
});

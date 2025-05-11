import { computed } from 'vue';
import { useGetProfileStore } from './getProfileStore';
import { defineStore } from 'pinia';
import { useUpdateProfileStore } from './updateProfileStore';

export const useProfileStore = defineStore('profile', () => {
  const getProfile = useGetProfileStore();
  const updateProfile = useUpdateProfileStore();

  const profile = computed(() => getProfile.profile);

  return {
    profile,
    fetchUser: getProfile.fetchUser,
    editProfile: updateProfile.editProfile,
    get: getProfile,
    update: updateProfile,
  };
});

<script setup>
import ModalLayout from '@/components/layout/ModalLayout.vue';
import CustomButton from '@/components/shared/button/CustomButton.vue';
import IconButton from '@/components/shared/button/IconButton.vue';
import CheckoutCard from '@/components/shared/card/CheckoutCard.vue';
import PaymentForm from '@/components/shared/form/PaymentForm.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import MenuModal from '@/components/shared/modal/MenuModal.vue';
import { useCartStore } from '@/stores/cart/cartStore';
import { useOrderStore } from '@/stores/order/orderStore';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderStore = useOrderStore();
const cartStore = useCartStore();

const table = ref('');
const isMenuShown = ref(false);

const fetchData = async (historyId) => {
  await orderStore.fetchDetailOrder(historyId);
  if (orderStore.detail.error) {
    alert(orderStore.detail.error);
    return;
  }
  table.value = orderStore.orderDetail?.label;
};

onMounted(async () => {
  if (route.params.order_id) {
    await fetchData(route.params.order_id);
  }
});

onBeforeUnmount(() => {
  cartStore.reset();
  orderStore.detail.reset();
});
</script>

<template>
  <div class="sticky top-0 flex gap-2 pt-6 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
    <CustomInput type="number" placeholder="Nomor Meja" v-model="table" />
    <CustomButton @click="isMenuShown = true">Daftar Menu</CustomButton>
  </div>

  <div v-if="orderStore.detail.loading" class="flex flex-col gap-4 justify-center items-center">
    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <p>Loading</p>
  </div>

  <CheckoutCard v-else v-for="order in cartStore.products" :key="order" :title="order.name" :price="(parseInt(order.price) * parseInt(order.amount)).toString()">
    <IconButton icon="/icons/ic_minus.svg" @click="cartStore.dettach(order)" />
    <p class="px-2">{{ order.amount }}</p>
    <IconButton icon="/icons/ic_plus.svg" @click="cartStore.attach(order)" />
  </CheckoutCard>

  <PaymentForm :table="parseInt(table)" />

  <ModalLayout v-model:visible="isMenuShown">
    <MenuModal />
  </ModalLayout>
</template>

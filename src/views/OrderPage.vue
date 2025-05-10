<script setup>
import CustomButton from '@/components/shared/button/CustomButton.vue';
import IconButton from '@/components/shared/button/IconButton.vue';
import CheckoutCard from '@/components/shared/card/CheckoutCard.vue';
import PaymentForm from '@/components/shared/form/PaymentForm.vue';
import CustomInput from '@/components/shared/input/CustomInput.vue';
import { useCartStore } from '@/stores/cart/cartStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

const table = ref('');
</script>

<template>
  <div class="sticky top-0 flex gap-2 pt-6 pb-6 px-4 z-10 bg-white dark:bg-slate-900">
    <CustomInput type="number" placeholder="Nomor Meja" v-model="table" />
    <CustomButton @click="router.push({ name: 'menu' })">Daftar Menu</CustomButton>
  </div>

  <CheckoutCard v-for="order in cartStore.products" :key="order" :title="order.name" :price="(parseInt(order.price) * parseInt(order.amount)).toString()">
    <IconButton icon="/icons/ic_minus.svg" @click="cartStore.dettach(order)" />
    <p class="px-2">{{ order.amount }}</p>
    <IconButton icon="/icons/ic_plus.svg" @click="cartStore.attach(order)" />
  </CheckoutCard>

  <PaymentForm />
</template>

<script setup lang="ts">
// Basic component for a product card, 
defineProps<{
  name: string
  imageURL: string
  rating?: string
  reviews?: string
  country: string
  winery: string
}>()
</script>

<template>
  <div class="flex flex-col border-1 border-solid rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition ease-in">
    <p class='text-[12px]'>{{ country }}</p>
    <h3 class="font-bold text-[20px]">{{ name }}</h3>
    <p class='text-[12px]'>{{ winery }}</p>
    <div class="self-center py-4 h-[300px]">
      <img :src="imageURL" alt="Product Image" class="h-full" />
    </div>
    <p>{{ rating }}/5 from {{ reviews }}</p>
  </div>
</template>

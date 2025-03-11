<script setup lang="ts">
import { onMounted } from 'vue'
import { categories } from '@/constants.ts'
import productCard from '@/components/productCard.vue'
import filterButton from '@/components/filterButton.vue'
import { getWineData } from '@/composables/getWineData'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const { selectedCategory, data, hasMore, loading, getData } = getWineData()
useInfiniteScroll(getData)

//get data on mount to ensure the page is immediately populated
onMounted(() => {
  getData()
})

// On Button click category selected is updated to the category identified via button Text, and we fetch data associated with the selected category.
const selectCategory = (category: string) => {
  selectedCategory.value = category
  data.value = []
  getData()
}

</script>

<template>
  <main>
    <div class='max-w-[1280px]'>
      <!-- header - basic header with just a h1 -->
      <div class="text-center">
        <h1 class='text-[48px] text-white underline py-4'>Merlins Merlots</h1>

        <!-- category filter buttons -->
        <div class="flex flex-wrap gap-4 py-4 justify-center">
          <filterButton v-for="category in categories" :key="category" :category="category" :selected="selectedCategory"
            @select="selectCategory" />
        </div>
      </div>

      <!-- wine list - simple for loop which passes data from the api to a productCard and renders out a grid of products. The grid is using flex-basis to ensure responsive behaviour rendering 1 / 2 or 3 product cards at a time based on screen size -->
      <ul class="flex flex-wrap">
        <li v-for="item in data" :key="item.id" class="list-none basis-full md:basis-1/2 lg:basis-1/3 p-4">
          <productCard :name="item.wine" :imageURL="item.image" :rating="item.rating.average"
            :reviews="item.rating.reviews" :country="item.location" :winery="item.winery" />
        </li>
      </ul>

      <!-- loading and load more text, when you scroll to the bottom you will see the loading text, unless there is no more data available in which case you will see a message to state this to the user. -->
      <div class="text-center py-4">
        <p v-if="loading" class="text-gray-600">Loading...</p>
        <p v-if="!hasMore" class="text-gray-600">No more wines to load</p>
      </div>
    </div>
  </main>
</template>

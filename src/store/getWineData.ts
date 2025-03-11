import { ref } from 'vue'
import type { Wine } from "@/types/wine";

// function to fetch data from out selected api.
// in this case i chose to use a free sample api at sampleapis.com which i found while researching.
// In this function we are also setting the pagination for use in our app, on fetch we store all the returned data and then render items for the slice associated with the current 'page' we are on pagination wise. As the triggers this function for the first time for example it will return the first 9 items. Once re-triggered you will get the next 9 and so on. 
export function getWineData() {
  const selectedCategory = ref('Whites')
  const data = ref<Wine[]>([])
  const page = ref(1)
  const itemsPerPage = 9
  const loading = ref(false)
  const hasMore = ref(true)

  const getData = async () => {
    if (loading.value || !hasMore.value) return

    try {
      loading.value = true
      const resp = await fetch(
        `https://api.sampleapis.com/wines/${selectedCategory.value.toLowerCase()}`
      )
      const allData = await resp.json()

      const startIndex = (page.value - 1) * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newItems = allData.slice(startIndex, endIndex)

      if (newItems.length < itemsPerPage) {
        hasMore.value = false
      }

      data.value = [...data.value, ...newItems]
      page.value++
    } catch (err) {
      console.error('Error fetching wines:', err)
    } finally {
      loading.value = false
    }
  }

  return { selectedCategory, data, page, hasMore, loading, getData }
}


import { onMounted, onUnmounted } from 'vue'

// infinite scroll function which calls getData to render the next page of items when a user scrolls to the bottom of the page. type set to void for type safety as there is nothing returned from this function.
export function useInfiniteScroll(getData: () => void) {
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY
    const bottomOfPage = document.documentElement.offsetHeight - 100

    if (scrollPosition >= bottomOfPage) {
      getData()
    }
  }

  onMounted(() => window.addEventListener('scroll', handleScroll))
  // onUnmounted will never be called in this instance as this function has been called from app.vue which is never unmounted.
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
}

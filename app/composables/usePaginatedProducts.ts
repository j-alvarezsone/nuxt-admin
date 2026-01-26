
export async function usePaginatedProducts() {
  const route = useRoute()

  const page = computed(() => {
    const pageParams = route.query.page as string
    return isNaN(+pageParams) ? 1 : +pageParams
  })

  const limit = computed(() => {
    const limitParams = route.query.limit as string
    return isNaN(+limitParams) ? 10 : +limitParams
  })

  const offset = computed(() => {
    return (page.value - 1) * limit.value
  })

  const result = await useFetch('/api/products', {
    query: {
      offset,
      limit
    },
    watch: [page, limit]
  })

  return {
    ...result,
    products: computed(() => result.data.value?.products ?? []),
    totalPages: computed(() => result.data.value?.totalPages || 0),
    currentPage: computed(() => result.data.value?.currentPage || 1),
    perPage: computed(() => result.data.value?.perPage || 10),
    total: computed(() => result.data.value?.total || 0)
  }
}

export default usePaginatedProducts

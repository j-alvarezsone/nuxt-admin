<script setup lang="ts">
  interface Props {
    slug: string;
  }

  const { slug } = defineProps<Props>();

  const { data: productSuggestions, status } = await useLazyFetch(`/api/product/${slug}/suggestions`, {
    cache: 'force-cache'
  })

</script>

<template>
  <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <USkeleton class="w-full h-52 rounded-md mb-4" />
    <USkeleton class="w-full h-52 rounded-md mb-4" />
    <USkeleton class="w-full h-52 rounded-md mb-4" />
  </div>

  <ProductsGrid v-else :products="productSuggestions || []" />
</template>

<style scoped>

</style>

<script setup lang="ts">
  const { products, total, currentPage, perPage } = await usePaginatedProducts()
</script>

<template>
  <div>
    <UPageCTA
      orientation="horizontal"
      title="Products"
      description="Discover our products and services."
    >
      <template #default>
        <div class="flex items-center justify-center">
          <UIcon
            name="i-lucide-box"
            :size="150"
          />
        </div>
      </template>
    </UPageCTA>

    <div class="mt-10" />

    <ProductsGrid :products />

    <SharedPagination
      :total
      :model-value="currentPage"
      :per-page="perPage"
    />
  </div>
</template>

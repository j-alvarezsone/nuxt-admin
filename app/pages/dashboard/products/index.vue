<script setup lang="ts">
  import { h, resolveComponent } from 'vue';
  import type { TableColumn } from '@nuxt/ui';

  const UBadge = resolveComponent('UBadge');
  const NuxtImg = resolveComponent('NuxtImg');

  const { products, perPage, total } = await usePaginatedProducts()

  const columns: TableColumn<Product>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => `#${row.getValue('id')}`,
    },
    {
      accessorKey: 'images',
      header: 'Images',
      cell: ({ row }) => {
        const images = row.getValue('images') as string[];
        const url = Array.isArray(images) && images.length > 0
          ? images[0]
          : 'https://placehold.co/48x48?text=No+Image';

        return h(NuxtImg, {
          src: url,
          alt: 'Product Image',
          width: 48,
          height: 48,
          class: 'rounded-md object-cover aspect-square',
        });
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => row.getValue('name'),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        return h('div', { class: 'whitespace-normal break-all max-w-[300px] truncate' }, String(row.getValue('description')).slice(0, 50) + '...');
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => formatCurrency(row.getValue('price')),
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.getValue('tags') as string[];
        if (!Array.isArray(tags)) return '';

        return h('div', { class: 'flex flex-wrap gap-1' }, tags.map((tag) =>
          h(UBadge, { key: tag, color: 'primary', size: 'md', variant: 'subtle' }, () => tag)
        ));
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => dayMonthYearFormat(new Date(row.getValue('createdAt') ?? '')),
    },
  ];
</script>

<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Manage and organize your product catalog
        </p>
      </div>
      <UButton
        icon="i-lucide-plus"
        label="Add Product"
        color="primary"
        size="lg"
      />
    </div>

    <UTable
      :data="products"
      :columns="columns"
      class="flex-1"
    />
    <SharedPagination
      :total="total"
      :per-page="perPage"
    />
  </div>
</template>

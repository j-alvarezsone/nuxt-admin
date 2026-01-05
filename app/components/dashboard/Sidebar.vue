<script setup lang="ts">
  import type {
    CommandPaletteGroup,
    CommandPaletteItem,
    NavigationMenuItem,
  } from '@nuxt/ui';

  const items: NavigationMenuItem[][] = [
    [
      {
        label: 'Home',
        icon: 'i-lucide-house',
        to: '/dashboard',
        exact: true,
      },
      {
        label: 'Products',
        icon: 'i-lucide-inbox',
        badge: '4',
        to: '/dashboard/products',
        exact: false,
      },
      // {
      //   label: 'Contacts',
      //   icon: 'i-lucide-users',
      // },
      // {
      //   label: 'Settings',
      //   icon: 'i-lucide-settings',
      //   defaultOpen: true,
      //   children: [
      //     {
      //       label: 'General',
      //     },
      //     {
      //       label: 'Members',
      //     },
      //     {
      //       label: 'Notifications',
      //     },
      //   ],
      // },
    ],
    [
      {
        label: 'Feedback',
        icon: 'i-lucide-message-circle',
        to: 'https://github.com/nuxt-ui-templates/dashboard',
        target: '_blank',
      },
      {
        label: 'Help & Support',
        icon: 'i-lucide-info',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      },
    ],
  ];

  const searchGroups = ref<CommandPaletteGroup<CommandPaletteItem>[]>([
    {
      label: 'Products',
      id: 'products',
      highlightedIcon: 'i-lucide-box',
      items: [
        {
          label: 'New Product',
          id: 'new-product',
          icon: 'i-lucide-plus',
          to: '/dashboard/products/new',
        },
      ],
    },
  ]);
</script>

<template>
  <UDashboardSidebar
    collapsible
    resizable
    :ui="{ footer: 'border-t border-default' }"
  >
  <!-- eslint-disable vue/no-useless-template-attributes -->
    <template
      #header="{ collapsed }"
      class="flex items-center gap-2"
    >
      <UDashboardSidebarCollapse variant="subtle" />
      <IconsNuxtui
        v-if="!collapsed"
        class="h-6 w-auto"
      />
    </template>

    <template #default="{ collapsed }">
      <UDashboardSearchButton />
      <UDashboardSearch
        title="Search"
        :groups="searchGroups"
      />
      <!-- <UButton
        :label="collapsed ? undefined : 'Search...'"
        icon="i-lucide-search"
        color="neutral"
        variant="outline"
        block
        :square="collapsed"
      >
        <template v-if="!collapsed" #trailing>
          <div class="flex items-center gap-0.5 ms-auto">
            <UKbd value="meta" variant="subtle" />
            <UKbd value="K" variant="subtle" />
          </div>
        </template>
</UButton> -->

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />

      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[1]"
        orientation="vertical"
        class="mt-auto"
      />

      <div class="">
        <UDashboardSidebarCollapse
          color="neutral"
          variant="ghost"
          square
          class="w-full"
          :title="collapsed ? 'Expand' : 'Collapse'"
        />
      </div>
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/benjamincanac.png',
        }"
        :label="collapsed ? undefined : 'Benjamin'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>

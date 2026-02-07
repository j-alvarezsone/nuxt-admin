<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  const route = useRoute()
  const { isLoggedIn, logout } = useAuthentication()

  const items = computed<NavigationMenuItem[]>(() => [{
    label: 'Products',
    to: '/products',
    icon: 'i-lucide-book-open',
    active: route.path.startsWith('/products')
  }, {
    label: 'Pricing',
    to: '/pricing',
    icon: 'i-lucide-box',
    active: route.path.startsWith('/pricing')
  }, {
    label: 'About',
    icon: 'i-simple-icons-figma',
    to: '/about',
    active: route.path.startsWith('/about')

  }, {
    label: 'Contact',
    icon: 'i-lucide-rocket',
    to: '/contact',
    active: route.path.startsWith('/contact')

  }])

  const responsiveRef = computed<NavigationMenuItem[]>(() => [
    ...items.value,
    {
      label: 'Login',
      icon: 'i-heroicons-user-circle',
      to: '/login',
      active: route.path.startsWith('/login')
    }
  ])
</script>

<template>
  <UHeader>
    <template #title>
      <IconsNuxtui class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip
        text="Open on GitHub"
        :kbds="['meta', 'G']"
      >
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
      <ClientOnly>
        <UButton
          v-if="!isLoggedIn"
          color="primary"
          variant="solid"
          icon="i-heroicons-user-circle"
          to="/login"
          label="Login"
        />
        <UButton
          v-else
          variant="ghost"
          icon="i-heroicons-user-circle"
          label="Logout"
          @click="logout"
        />
      </ClientOnly>
    </template>

    <template #body>
      <UNavigationMenu
        :items="responsiveRef"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>

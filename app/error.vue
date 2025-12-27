<script setup lang="ts">
  import type { NuxtError } from '#app'

  defineProps<{
    error: NuxtError
  }>()
</script>

<template>
  <UError
    :error
    :clear="{
      size: 'xl',
      icon: 'material-symbols:arrow-back-rounded',
      class: 'rounded-full'
    }"
    :ui="{
      statusCode: 'text-9xl font-thin',
    }"
  />
</template>

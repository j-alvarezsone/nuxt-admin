<script setup lang="ts">
  const { data: testimonials } = await useFetch('/api/home/reviews')
</script>

<template>
  <div class="flex flex-col gap-6">
    <HomeCTA />
    <HomeFeatures />
    <HomeTestimonials v-if="testimonials" :testimonials />
    <HomeStack />
  </div>
</template>

<script setup lang="ts">
  interface Props {
    testimonials: {
      name: string
      description: string
      subtitle: string
      profileImage: string
    }[]
  }

  const { testimonials } = defineProps<Props>();

</script>

<template>
  <UPageSection
    title="Testimonials"
    description="Hear what our users have to say about Nuxt UI"
    headline="Testimonials"
  />
  <UPageColumns>
    <UPageCard
      variant="solid"
      to="https://cloudflare.com"
      icon="i-logos-cloudflare-icon"
      title="Cloudflare's Workers LaunchPad"
      description="NuxtHub is part of the Cloudflare's Workers Launchpad Cohort to make sure you get a first-class experience on top of Cloudflare's network."
      :ui="{ leadingIcon: 'size-10' }"
    />

    <UPageCard
      v-for="(testimonial, index) in testimonials"
      :key="index"
      variant="subtle"
      :description="testimonial.description"
      :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }"
    >
      <template #footer>
        <UUser
          :name="testimonial.name"
          :description="testimonial.subtitle"
          :avatar="{ src: testimonial.profileImage, alt: testimonial.name }"
          size="xl"
        />
      </template>
    </UPageCard>
  </UPageColumns>
</template>

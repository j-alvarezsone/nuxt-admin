<script setup lang="ts">

</script>

<template>
  <section class="py-12">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <UPageSection
        title="Contact"
        headline="Get in touch"
        description="Have a question, feedback or want a demo? Send us a message or use the contact details to reach our team."
      />

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ContactForm />
        </div>

        <div>
          <ContactInfo />
        </div>
      </div>
    </div>
  </section>
</template>

<template>
  <UPageCard
    title="Contact Info"
    description="We'd love to hear from you — here's how to reach us."
  >
    <div class="space-y-4 text-sm">
      <div class="flex items-start gap-3">
        <UIcon
          name="i-lucide-mail"
          class="size-5 text-primary"
        />
        <div>
          <div class="font-medium">Email</div>
          <div class="text-muted">hello@company.com</div>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <UIcon
          name="i-lucide-phone"
          class="size-5 text-primary"
        />
        <div>
          <div class="font-medium">Phone</div>
          <div class="text-muted">+1 (555) 123-4567</div>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <UIcon
          name="i-lucide-map-pin"
          class="size-5 text-primary"
        />
        <div>
          <div class="font-medium">Address</div>
          <div class="text-muted">123 Market St, Suite 100<br>San Francisco, CA</div>
        </div>
      </div>

      <div class="flex items-start gap-3">
        <UIcon
          name="i-lucide-clock"
          class="size-5 text-primary"
        />
        <div>
          <div class="font-medium">Hours</div>
          <div class="text-muted">Mon – Fri: 9:00 — 17:00</div>
        </div>
      </div>
    </div>
  </UPageCard>
</template>

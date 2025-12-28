<template>
  <div class="space-y-8">
    <UPageCTA
      orientation="horizontal"
      title="Pricing"
      description="Discover our pricing and plans."
    >
      <template #default>
        <div class="flex items-center justify-center">
          <UIcon
            name="i-simple-icons-nuxtdotjs"
            :size="150"
          />
        </div>
      </template>
    </UPageCTA>

    <PricingTable />
  </div>
</template>

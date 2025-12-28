<script setup lang="ts">
  import * as z from 'zod'
  import type { FormError, FormSubmitEvent } from '@nuxt/ui'

  const toast = useToast()

  const state = reactive({ name: '', email: '', subject: '', message: '' })

  const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    subject: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters')
  })

  type Schema = z.infer<typeof schema>

  function validate(state: Partial<Schema>): FormError[] {
    const errors = []
    if (!state.name) errors.push({ name: 'name', message: 'Name is required' })
    if (!state.email) errors.push({ name: 'email', message: 'Email is required' })
    if (!state.message) errors.push({ name: 'message', message: 'Message is required' })

    return errors
  }

  function reset() {
    state.name = ''
    state.email = ''
    state.subject = ''
    state.message = ''
  }

  function onSubmit(event: FormSubmitEvent<Schema>) {
    toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    console.log(event.data)

    reset()
  }
</script>

<template>
  <UPageCard
    title="Send us a message"
    description="We usually reply within 1-2 business days."
  >
    <UForm
      :schema
      :state
      :validate
      class="space-y-4"
      @submit="onSubmit"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <UFormField
          label="Name"
          name="name"
        >
          <UInput
            v-model="state.name"
            class="w-full"
            label="Name"
            placeholder="Your name"
          />
        </UFormField>
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="state.email"
            class="w-full"
            label="Email"
            placeholder="you@company.com"
            type="email"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-1 gap-3">
        <UFormField
          label="Subject"
          name="subject"
        >
          <UInput
            v-model="state.subject"
            class="w-full"
            label="Subject"
            placeholder="Subject"
          />
        </UFormField>
        <UFormField
          label="Message"
          name="message"
        >
          <UTextarea
            v-model="state.message"
            class="w-full"
            label="Message"
            placeholder="Write your message here"
            :rows="6"
          />
        </UFormField>
      </div>

      <div class="flex items-center justify-end gap-3">
        <UButton
          type="button"
          variant="ghost"
          @click.prevent="reset"
        >Reset</UButton>
        <UButton
          color="primary"
          type="submit"
          label="Send message"
        />
      </div>
    </UForm>
  </UPageCard>
</template>

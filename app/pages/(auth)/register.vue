<script setup lang="ts">
  import * as z from 'zod'
  import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

  definePageMeta({
    layout: 'login'
  })

  const fields: AuthFormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter full name of the user',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true
    },
    {
      name: 'remember',
      label: 'Remember me',
      type: 'checkbox'
    }
  ]

  const schema = z.object({
    name: z.string('Name is required').min(3, 'Must be at least 3 characters'),
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
  })

  type Schema = z.output<typeof schema>

  function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema title="Create a new account" description="Enter your credentials to access your account." icon="i-lucide-user" :fields @submit="onSubmit" />
    </UPageCard>

    <UButton variant="link" to="/login" label="Already have an account? Login" />
  </div>
</template>

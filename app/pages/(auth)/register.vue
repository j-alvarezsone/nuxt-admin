<script setup lang="ts">
  import * as z from 'zod'
  import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
  import { passwordSchema } from '~~/shared/schemas/auth'

  interface CookieRegisterDetails {
    name: string
    email: string
  }

  definePageMeta({
    layout: 'auth',
    middleware: ['not-authenticated']
  })

  const { register } = useAuthentication()
  const toast = useToast()
  const cookieRegisterDetails = useCookie<CookieRegisterDetails | null>('register_details', {
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30
  })

  const isPosting = ref<boolean>(false)

  const fields: AuthFormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter full name of the user',
      required: true,
      defaultValue: cookieRegisterDetails.value?.name || undefined
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
      defaultValue: cookieRegisterDetails.value?.email || undefined
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
      type: 'checkbox',
      defaultValue: !!cookieRegisterDetails.value
    }
  ]

  const schema = z.object({
    name: z.string('Name is required').min(3, 'Must be at least 3 characters'),
    email: z.email('Invalid email'),
    password: passwordSchema,
    remember: z.boolean().optional()
  })

  type Schema = z.output<typeof schema>

  async function onSubmit(payload: FormSubmitEvent<Schema>) {
    const { name, email, password, remember } = payload.data
    isPosting.value = true

    if (remember) {
      cookieRegisterDetails.value = { name, email }
    } else {
      cookieRegisterDetails.value = null
    }

    const result = await register(name, email, password)

    if (!result.success) {
      toast.add({ title: 'Registration failed', description: result.message, })
    }

    isPosting.value = false
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema
        title="Create a new account"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields
        :loading="isPosting"
        :disabled="isPosting"
        @submit="onSubmit"
      />
    </UPageCard>

    <UButton
      variant="link"
      to="/login"
      label="Already have an account? Login"
    />
  </div>
</template>

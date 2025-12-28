<script setup lang="ts">
  const members = [
    {
      user: {
        name: 'Alice Johnson',
        description: 'Founder & CEO',
        avatar: { src: 'https://i.pravatar.cc/150?img=1', alt: 'Alice Johnson' }
      },
      bio: 'Leads product, product strategy and company vision. Loves working on UX-first features.',
      tags: ['Leadership', 'Product']
    },
    {
      user: {
        name: 'Mateo Garcia',
        description: 'CTO',
        avatar: { src: 'https://i.pravatar.cc/150?img=12', alt: 'Mateo Garcia' }
      },
      bio: 'Builds reliable systems and developer tools. Focused on performance and DX.',
      tags: ['Engineering', 'Cloud']
    },
    {
      user: {
        name: 'Pia Nguyen',
        description: 'Head of Design',
        avatar: { src: 'https://i.pravatar.cc/150?img=5', alt: 'Pia Nguyen' }
      },
      bio: 'Design systems lead. Loves prototypes, motion and accessibility.',
      tags: ['Design', 'Research']
    },
    {
      user: {
        name: 'Liam O’Connor',
        description: 'Senior Engineer',
        avatar: { src: 'https://i.pravatar.cc/150?img=15', alt: 'Liam O’Connor' }
      },
      bio: 'Works on our frontend architecture and component libraries.',
      tags: ['Frontend', 'TypeScript']
    },
    {
      user: {
        name: 'Sara Kim',
        description: 'Customer Success',
        avatar: { src: 'https://i.pravatar.cc/150?img=20', alt: 'Sara Kim' }
      },
      bio: 'Helps customers get the most out of our product and collects feedback.',
      tags: ['Support', 'Community']
    }
  ]

  const stats = [
    { label: 'Customers', value: '1,200+' },
    { label: 'Projects shipped', value: '3,400+' },
    { label: 'Offices', value: '3 (Remote-first)' },
    { label: 'Years', value: '5' }
  ]

  const values = [
    { title: 'User first', desc: 'We ship features that solve real problems and listen to feedback.', icon: 'i-lucide-user' },
    { title: 'Craftsmanship', desc: 'Clean code, good design and attention to detail.', icon: 'i-lucide-feather' },
    { title: 'Open', desc: 'We share knowledge and learn together.', icon: 'i-lucide-globe' }
  ]
</script>

<template>
  <section class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <UPageSection
        title="About Us"
        headline="We build delightful products for teams and creators"
        description="We’re a remote-first team focused on shipping useful, well-designed software that helps teams move faster."
      />

      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <div class="md:col-span-2 space-y-6">
          <UPageCard
            title="Our mission"
            description="Make it easy to build and ship beautiful applications with confidence. We focus on developer and user experience, performance, and accessibility."
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UPageCard
              v-for="s in stats"
              :key="s.label"
              :title="s.value"
              :description="s.label"
              variant="subtle"
            />
          </div>

          <div>
            <h3 class="mt-6 mb-4 font-medium text-lg">Our values</h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <UPageCard
                v-for="v in values"
                :key="v.title"
                :title="v.title"
                :description="v.desc"
                :icon="v.icon"
                variant="ghost"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <UPageCard
            title="Join our team"
            description="We’re hiring engineers, designers and product people. We offer flexible hours, remote work and a supportive culture."
          >
            <template #footer>
              <div class="flex gap-2">
                <UButton
                  variant="ghost"
                  label="Contact us"
                  to="/contact"
                />
              </div>
            </template>
          </UPageCard>

          <UPageCard
            title="Contact"
            description="Have questions or want a demo? Reach out to hello@company.com or book a call."
          />
        </div>
      </div>

      <h2 class="mt-12 mb-4 font-semibold text-xl">Meet the team</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <UPageCard
          v-for="m in members"
          :key="m.user.name"
          variant="subtle"
          :description="m.bio"
        >
          <template #header>
            <div class="flex items-center gap-3">
              <UUser
                v-bind="m.user"
                size="lg"
              />
              <div>
                <div class="font-medium">{{ m.user.name }}</div>
                <div class="text-sm text-muted">{{ m.user.description }}</div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in m.tags"
                :key="tag"
                :label="tag"
                color="info"
                variant="soft"
              />
            </div>
          </template>
        </UPageCard>
      </div>
    </div>
  </section>
</template>

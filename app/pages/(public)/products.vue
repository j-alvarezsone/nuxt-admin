<script setup lang="ts">
  const products = ref<Product[]>([
    {
      id: '1',
      slug: 'cloud-storage-saas',
      name: 'Cloud Storage Pro',
      description:
        'Secure and scalable cloud storage service for businesses of all sizes.',
      price: 100,
      images: [
        'https://picsum.photos/600/400?random=1',
        'https://picsum.photos/600/400?random=2',
        'https://picsum.photos/600/400?random=3',
      ],
      tags: ['cloud', 'storage', 'SaaS', 'security'],
    },
    {
      id: '2',
      slug: 'managed-it-services',
      name: 'IT Support 24/7',
      description:
        'Technical support and comprehensive IT infrastructure management, available 24/7.',
      price: 200,
      images: [
        'https://picsum.photos/600/400?random=4',
        'https://picsum.photos/600/400?random=5',
        'https://picsum.photos/600/400?random=6',
      ],
      tags: ['support', 'infrastructure', 'IT', 'enterprise'],
    },
    {
      id: '3',
      slug: 'cybersecurity-suite',
      name: 'CyberSecurity Suite',
      description:
        'Comprehensive cybersecurity solution with protection against advanced threats, firewall, and vulnerability analysis.',
      price: 300,
      images: [
        'https://picsum.photos/600/400?random=7',
        'https://picsum.photos/600/400?random=8',
        'https://picsum.photos/600/400?random=9',
      ],
      tags: ['cybersecurity', 'firewall', 'protection', 'vulnerability'],
    },
    {
      id: '4',
      slug: 'ai-chatbot-platform',
      name: 'AI Chatbot Platform',
      description:
        'Intelligent platform for creating and managing AI chatbots for customer service.',
      price: 400,
      images: [
        'https://picsum.photos/600/400?random=10',
        'https://picsum.photos/600/400?random=11',
        'https://picsum.photos/600/400?random=12',
      ],
      tags: ['AI', 'chatbot', 'automation', 'customer service'],
    },
  ]);
</script>

<template>
  <div>
    <UPageCTA
      orientation="horizontal"
      title="Products"
      description="Discover our products and services."
    >
      <template #default>
        <div class="flex items-center justify-center">
          <UIcon
            name="i-lucide-box"
            :size="150"
          />
        </div>
      </template>
    </UPageCTA>

    <div class="mt-10" />

    <ProductsGrid :products="products" />

    <SharedPagination
      :total="100"
      :per-page="10"
    />
  </div>
</template>

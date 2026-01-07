<script setup lang="ts">
  const route = useRoute();
  const slug = route.params.slug as string;
  // Simulated products - in production these would come from an API
  const products = ref < Product[] > ([
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
      tags: ['support', 'infrastructure', 'IT', 'business'],
    },
    {
      id: '3',
      slug: 'cybersecurity-suite',
      name: 'CyberSecurity Suite',
      description:
        'Complete cybersecurity solution with advanced threat protection, firewall, and vulnerability scanning.',
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
        'Intelligent platform for building and managing AI-powered chatbots for customer support.',
      price: 400,
      images: [
        'https://picsum.photos/600/400?random=10',
        'https://picsum.photos/600/400?random=11',
        'https://picsum.photos/600/400?random=12',
      ],
      tags: ['AI', 'chatbot', 'automation', 'customer service'],
    },
  ]);
  // Find the product by slug (id in this case)
  const product = computed(() => {
    return products.value.find((p) => p.slug === slug);
  });
  // If the product is not found, throw a 404 error
  if (!product.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    });
  }
  // State for the selected image
  const selectedImageIndex = ref(0);
  // State for quantity
  const quantity = ref(1);
  const increaseQuantity = () => {
    quantity.value++;
  };
  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--;
    }
  };
  const totalPrice = computed(() => {
    return (product.value?.price || 0) * quantity.value;
  });
</script>

<template>
  <div
    v-if="product"
    class="container mx-auto px-4 py-8"
  >
    <!-- Breadcrumb -->
    <UBreadcrumb
      class="mb-8"
      :items="[
        { label: 'Products', to: '/products' },
        { label: product.name, to: `/product/${product.slug}` },
      ]"
    />

    <!-- Product Detail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Images Section -->
      <div class="space-y-4">
        <!-- Main Image -->
        <div class="rounded-lg overflow-hidden bg-gray-100">
          <img
            :src="product.images[selectedImageIndex]"
            :alt="product.name"
            class="w-full h-96 object-cover"
            loading="lazy"
          >
        </div>

        <!-- Thumbnail Images -->
        <div class="grid grid-cols-3 gap-4">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            class="rounded-lg overflow-hidden border-2 transition-all cursor-pointer"
            :class="selectedImageIndex === index
                ? 'border-primary-500'
                : 'border-gray-200 hover:border-gray-300'
              "
            @click="selectedImageIndex = index"
          >
            <img
              :src="image"
              :alt="`${product.name} - Image ${index + 1}`"
              class="w-full h-24 object-cover"
            >
          </button>
        </div>
      </div>

      <!-- Product Info Section -->
      <div class="space-y-6">
        <!-- Title and Price -->
        <div>
          <h1 class="text-3xl font-bold mb-2 capitalize">
            {{ product.name }}
          </h1>
          <p class="text-2xl font-bold text-primary-600">
            {{ formatCurrency(product.price) }}
          </p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="tag in product.tags"
            :key="tag"
            color="primary"
            variant="subtle"
            class="capitalize"
          >
            {{ tag }}
          </UBadge>
        </div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Description</h2>
          <p class="leading-relaxed">
            {{ product.description }}
          </p>
        </div>

        <USeparator />

        <!-- Quantity Selector -->
        <div>
          <h3 class="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
          <div class="flex items-center space-x-4">
            <div class="flex items-center border border-gray-300 rounded-lg">
              <UButton
                icon="i-lucide-minus"
                color="neutral"
                variant="ghost"
                :disabled="quantity <= 1"
                @click="decreaseQuantity"
              />
              <span class="px-4 py-2 font-semibold">{{ quantity }}</span>
              <UButton
                icon="i-lucide-plus"
                color="neutral"
                variant="ghost"
                @click="increaseQuantity"
              />
            </div>
            <p class="text-sm text-gray-500">
              Total: {{ formatCurrency(totalPrice) }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <UButton
            color="primary"
            size="xl"
            block
            icon="i-lucide-shopping-cart"
            label="Add to cart"
          />
          <UButton
            color="neutral"
            size="xl"
            block
            variant="outline"
            icon="i-lucide-heart"
            label="Add to favorites"
          />
        </div>
      </div>
    </div>

    <!-- <USeparator class="h-[3000px]" /> -->
    <USeparator
      class="my-10"
      icon="i-lucide-box"
    />

    <!-- Reviews -->
    <ProductReviews />

    <!-- Related Products Section (optional) -->
    <div
      v-if="product"
      class="mt-16"
    >
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        Related Products
      </h2>
      <LazyProductsGrid
        hydrate-on-visible
        :products="products.filter((p) => p.id !== product?.id).slice(0, 3)"
      />
    </div>
  </div>
</template>

<style scoped></style>

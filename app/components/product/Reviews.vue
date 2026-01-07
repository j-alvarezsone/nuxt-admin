<script setup lang="ts">
  const testimonials = ref([
    {
      user: {
        stars: 5,
        name: 'María González',
        description: 'Verified buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/68.jpg',
          alt: 'María González',
        },
      },
      quote:
        'Excellent product! It arrived quickly and in perfect condition. I highly recommend it.',
    },
    {
      user: {
        stars: 4,
        name: 'Juan Pérez',
        description: 'Frequent customer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/14.jpg',
          alt: 'Juan Pérez',
        },
      },
      quote:
        'The quality is incredible for the price. I will definitely buy from this store again.',
    },
    {
      user: {
        stars: 3,
        name: 'Lucía Romero',
        description: 'Verified buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/44.jpg',
          alt: 'Lucía Romero',
        },
      },
      quote:
        "I'm very happy with my purchase; it exceeded my expectations and customer service was excellent.",
    },
    {
      user: {
        stars: 2,
        name: 'Carlos Torres',
        description: 'New customer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/34.jpg',
          alt: 'Carlos Torres',
        },
      },
      quote:
        'Shipping was fast and the product arrived well packaged. I will shop here again.',
    },
    {
      user: {
        stars: 1,
        name: 'Fernanda Ruiz',
        description: 'Frequent buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/55.jpg',
          alt: 'Fernanda Ruiz',
        },
      },
      quote:
        'Great shopping experience; the product was exactly as described and of very good quality.',
    },
    {
      user: {
        stars: 1,
        name: 'Diego Martínez',
        description: 'Satisfied customer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/99.jpg',
          alt: 'Diego Martínez',
        },
      },
      quote: 'I loved it; it exceeded my expectations and I will recommend it to my friends.',
    },
    {
      user: {
        stars: 2,
        name: 'Sofía López',
        description: 'Buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/22.jpg',
          alt: 'Sofía López',
        },
      },
      quote: 'Excellent service and a good product. Everything arrived very well and quickly.',
    },
    {
      user: {
        stars: 3,
        name: 'Miguel Fernández',
        description: 'Regular buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/15.jpg',
          alt: 'Miguel Fernández',
        },
      },
      quote: 'Good price and quality, no problems with the order. I recommend it.',
    },
    {
      user: {
        stars: 4,
        name: 'Paula Sánchez',
        description: 'Verified buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/21.jpg',
          alt: 'Paula Sánchez',
        },
      },
      quote:
        'Very happy with my purchase. The product works perfectly and the service was great.',
    },
    {
      user: {
        stars: 5,
        name: 'Alejandro Díaz',
        description: 'Recommender',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/16.jpg',
          alt: 'Alejandro Díaz',
        },
      },
      quote: 'First time buying and everything went excellent. 100% recommended.',
    },
    {
      user: {
        stars: 5,
        name: 'Valentina Morales',
        description: 'Happy buyer',
        avatar: {
          src: 'https://randomuser.me/api/portraits/women/47.jpg',
          alt: 'Valentina Morales',
        },
      },
      quote:
        'I was surprised by the quality. Shipping was also very fast. Thanks!',
    },
  ]);
</script>

<template>
  <UCard
    class="mb-8"
    icon="i-lucide-star"
  >
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <UIcon
          name="i-lucide-star"
          class="text-primary-500 text-2xl"
        />
        <div>
          <h2 class="text-xl font-semibold">Reviews</h2>
          <p class="text-gray-600 text-sm">
            Reviews from our satisfied customers.
          </p>
        </div>
      </div>
      <!-- <UButton
        color="primary"
        icon="i-lucide-plus-circle"
        size="md"
        class="ml-4"
        label="Add review"
      /> -->
      <ModalReview button-label="Add review" />
    </div>
  </UCard>

  <UPageColumns>
    <UPageCard
      v-for="(testimonial, index) in testimonials"
      :key="index"
      variant="subtle"
      :description="testimonial.quote"
      :ui="{
        description: 'before:content-[open-quote] after:content-[close-quote]',
      }"
    >
      <template #footer>
        <div class="flex items-center gap-2 mb-2">
          <UIcon
            v-for="star in testimonial.user.stars"
            :key="star"
            name="i-lucide-star"
            class="text-primary-500 text-xl"
          />
        </div>
        <UUser
          v-bind="testimonial.user"
          size="xl"
        />
      </template>
    </UPageCard>
  </UPageColumns>
</template>

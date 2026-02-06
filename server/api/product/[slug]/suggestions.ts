export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);
  const config = useRuntimeConfig();

  const product = await prisma.product.findUnique({
    where: {
      slug
    }
  });

  await new  Promise(resolve => setTimeout(resolve, 2500));

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Product with slug "${slug}" not found`,
      data: {
        slug,
        state: config.public.stage
      },
      stack: config.public.stage !== 'prod' ? new Error().stack : undefined,
    });
  }

  const suggestions = await prisma.product.findMany({
    where: {
      tags: {
        hasSome: product.tags
      },
      NOT: {
        id: product.id
      }
    },
    take: 3
  });

  return suggestions;
});

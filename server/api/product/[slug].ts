import { prisma } from './../../utils/db';
export default defineEventHandler(async (event) => {
  const { slug } = getRouterParams(event);
  const config = useRuntimeConfig();

  const product = await prisma.product.findUnique({
    where: {
      slug
    }
  });

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

  return product;
});

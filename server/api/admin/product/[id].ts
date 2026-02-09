export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  const product = await prisma.product.findUnique({
    where: {
      id: +id
    }
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Product with id ${id} not found`,
    });
  }

  return {
    product,
  }
});

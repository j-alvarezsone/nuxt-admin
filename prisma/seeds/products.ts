import { products } from './../../shared/mock/products';
import type { PrismaClient } from '../generated/client';

export async function seedProducts(prisma: PrismaClient) {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: products,
  });
}

import type { PrismaClient } from '../generated/client';
import { siteReviews } from '../../shared/mock/site-review';

export async function seedSiteReview(prisma: PrismaClient) {
  await prisma.siteReview.deleteMany();

  await prisma.siteReview.createMany({
    data: siteReviews,
  });
}

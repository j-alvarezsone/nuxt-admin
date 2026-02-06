import type { PrismaClient } from '../generated/client';
import { users } from '../../shared/mock/user';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users,
  });
}

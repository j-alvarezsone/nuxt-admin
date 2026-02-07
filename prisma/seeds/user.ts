import bcrypt from "bcryptjs";
import type { PrismaClient } from '../generated/client';
import { users } from '../../shared/mock/user';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.deleteMany();

  const usersWithHashedPassword = users.map((user) => {
    const hashedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    return {
      ...user,
      password: hashedPassword,
    };
  });

  await prisma.user.createMany({
    data: usersWithHashedPassword,
  });
}

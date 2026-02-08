import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { passwordSchema } from '~~/shared/schemas/auth';

const bodySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }).trim(),
  email: z.email().toLowerCase().trim(),
  password: passwordSchema,
})

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readValidatedBody(event, bodySchema.parse)

  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    throw createError({ statusCode: 409, message: 'Email already registered' })
  }

  const hashedPassword = bcrypt.hashSync(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      roles: ['user']
    }
  })

  return {
    user: user,
    message: 'Registration successful'
  }
})

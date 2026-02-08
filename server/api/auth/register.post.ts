import * as z from 'zod';
import bcrypt from 'bcryptjs';

const bodySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 2 characters long" }).trim(),
  email: z.email().toLowerCase().trim(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number",
    }),
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

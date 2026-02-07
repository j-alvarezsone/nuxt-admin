import * as z from 'zod';
import bcrypt from 'bcryptjs';

const bodySchema = z.object({
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
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password)

  if(!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    },
    message: 'Login successful'
  }
})

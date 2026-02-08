
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { passwordSchema } from '~~/shared/schemas/auth';

const bodySchema = z.object({
  email: z.email().toLowerCase().trim(),
  password: passwordSchema,
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password)

  const userSessions = {
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles,
  } as const

  await setUserSession(event, {
    user: userSessions,
    loggedInAt: new Date()
  })

  if(!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  return {
    user: userSessions,
    message: 'Login successful'
  }
})

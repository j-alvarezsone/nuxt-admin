# My website with Nuxt

## Development

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Copy the `.env.example` file to `.env` and configure the required environment variables

   - Note: If you are using a managed database (Neon/Heroku/etc.), make sure your connection string includes `?sslmode=verify-full` to enforce TLS certificate verification. For local development you may use `sslmode=disable`, but never use that in production.

4. Run `npx prisma migrate dev` to apply database migrations
5. Run the seed with `pnpm seed`
6. Start the development server with `pnpm dev`

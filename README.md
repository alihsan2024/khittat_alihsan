This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Maintenance mode

The whole public site can be put behind a branded "we're improving your experience"
screen ([src/app/[locale]/maintenance/page.tsx](<src/app/[locale]/maintenance/page.tsx>)),
served in English or Arabic depending on the visitor.

| Variable | Purpose |
| --- | --- |
| `MAINTENANCE_MODE` | `true` gates the site, anything else serves it normally |
| `MAINTENANCE_BYPASS_TOKEN` | Secret that lets you keep browsing the real site |

- The gate lives in [src/middleware.ts](src/middleware.ts) and runs before the
  next-intl middleware. Gated responses are `no-store` and `noindex, nofollow`.
- The admin area (`/admin`) stays reachable — it is already behind its own login.
- To see the real site while the gate is on, open `/?preview=<MAINTENANCE_BYPASS_TOKEN>`
  once. That sets an httpOnly cookie which lasts 7 days; clear the
  `khittat_maintenance_bypass` cookie to see the maintenance screen again.
- Keep the token out of the tracked `.env` — put it in `.env.local` locally and
  in the host's environment variables in production.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

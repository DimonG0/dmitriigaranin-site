# React + Vite

## Private archive backend

The "Behind" page now uses Cloudflare Pages Functions plus a private R2 bucket.
Private files are not served from `public`; they are downloaded only through
`/api/archive/download` after a signed HttpOnly session cookie is verified.

Local secrets live in `.dev.vars` (copy `.dev.vars.example` and change the
values). Do not commit `.dev.vars`.

Required production variables:

- `ARCHIVE_SESSION_SECRET` - long random value used to sign archive sessions.
- `ARCHIVE_ACCESS_CODE` or `ARCHIVE_ACCESS_CODES` - partner viewing codes.
- `ARCHIVE_ADMIN_CODE` - owner code that can upload and delete archive files.
- `ARCHIVE_SESSION_DAYS` - optional session lifetime, capped at 30 days.

The R2 binding is configured in `wrangler.toml` as `ARCHIVE_BUCKET`. Create the
production and preview buckets in Cloudflare before deploying.

Useful commands:

- `npm run build`
- `npm run pages:dev`
- `npm run pages:deploy`

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

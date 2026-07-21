# Legacy static site (superseded)

These files are the original static single-page Routebird site that was migrated
into the Next.js 14 App Router codebase in `../src/`.

They are kept in the repo only as a design reference. They are NOT maintained and
are not part of the production build. The source of truth for the live site is
`../src/app/[locale]/page.tsx` (and the rest of `../src/`).

| File | Role | Migrated to |
|------|------|-------------|
| `index.html` | Static landing markup | `src/app/[locale]/page.tsx` |
| `style.css` | Original design system | `src/app/globals.css` |
| `base.css` | CSS reset | `src/app/globals.css` |
| `app.js` | Original JS interactions | various components in `src/components/` |

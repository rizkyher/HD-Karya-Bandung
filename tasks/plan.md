# Plan — SvelteKit & Tailwind Migration

## Objective

Move HD Karya Bandung from the custom Worker HTML renderer to SvelteKit with
Tailwind CSS, while preserving the existing Cloudflare Worker, D1, R2, SEO,
and authenticated admin capabilities.

## Constraints

- Keep the existing D1 schema and R2 bucket; content and accounts must survive.
- Keep all public SEO routes and all admin route permissions server-side.
- Keep the current conservative, factual copy: no invented portfolio, address,
  phone, certification, or testimonial claims.
- Build SvelteKit for the existing Cloudflare Worker using `adapter-cloudflare`.
- Use Tailwind v4 via the Vite plugin; avoid a second component-library layer.

## Delivery slices

1. Establish SvelteKit, Tailwind, Cloudflare adapter, type-safe platform
   bindings, and regression tests for shared routing/validation helpers.
2. Port auth, D1/R2 access, security headers, SEO endpoints, and inquiry
   submission as SvelteKit server code.
3. Rebuild the public site around clear service discovery, evidence-led project
   pages, useful articles, and a direct consultation path.
4. Rebuild the admin shell and module flows with reusable controls, responsive
   tables, legible empty states, and persistent CRUD actions.
5. Check types/build/tests, test login and a content save against Cloudflare,
   then deploy and verify the production Worker.

## UX direction

- Public: calm but confident construction brand, prioritising what HD Karya
  Bandung does, how engagement works, and the next safe action.
- Admin: a practical work surface with a consistent action bar, readable table
  density, one-column mobile forms, and labels that never truncate.
- Accessibility: semantic landmarks, visible focus, sufficient contrast,
  keyboard navigation, responsive menu/drawer, and reduced-motion support.

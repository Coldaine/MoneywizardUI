# Monarch UI agent entrypoint

This repo contains two co-located UI experiences in one Next.js app:

- Monarch Money clone under `/`
- Magnifi clone under `/magnifi/*`

Read these first when changing product flows or layouts:

1. `docs/PRD.md`
2. `docs/features.md`
3. `docs/routes.md`
4. `docs/design-summary.md`
5. `docs/entity-model.md`

For Magnifi-specific work, prefer the committed corpus in `magnifi-spec-extracted/` and the evidence bundle in `docs/evidence/` over stale notes or external zip references.

Working rules:

- Treat Monarch and Magnifi as separate products that share a shell, not as one merged investments area.
- Keep route-specific changes scoped; verify both `/` and `/magnifi/*` when editing shared layout or navigation code.
- All data is mocked; do not introduce backend calls or new dependencies without a strong reason.
- Use SVG or inline CSS for charts and keep client components client-only when they use hooks/browser APIs.
- Prefer shared Tailwind utilities and the existing CSS variables in `src/app/globals.css`.

Before declaring work done:

- Run `npm run build`
- Run `npm run lint`
- Make sure review comments are either fixed in code or resolved as stale

Ask first for destructive changes, dependency additions, or broad route rewrites.

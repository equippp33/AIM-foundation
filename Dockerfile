# =============================================================================
# AIM Foundation — Production Dockerfile
# Next.js 14 · Node.js runtime · pnpm · Coolify-ready
#
# Multi-stage build:
#   1. deps     — install ALL dependencies (including dev) with pnpm
#   2. builder  — compile the Next.js production bundle
#   3. runner   — minimal runtime image (only production artefacts)
# =============================================================================

# ── Pin a specific Node LTS digest for reproducible builds ───────────────────
ARG NODE_VERSION=20-alpine3.20

# =============================================================================
# STAGE 1 — deps
# Install all dependencies so the builder has access to devDeps (TS, PostCSS…)
# =============================================================================
FROM node:${NODE_VERSION} AS deps

# Install pnpm via Corepack (ships with Node 20, zero extra download)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy manifests first — Docker cache is invalidated only when these change
COPY package.json pnpm-lock.yaml ./

# Frozen lockfile ensures CI/CD reproducibility; --ignore-scripts is safe here
RUN pnpm install --frozen-lockfile --ignore-scripts


# =============================================================================
# STAGE 2 — builder
# Compile the Next.js bundle (SSR pages, API routes, static assets)
# =============================================================================
FROM node:${NODE_VERSION} AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Bring installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source tree
COPY . .

# ── Build-time environment variables ─────────────────────────────────────────
# NEXT_PUBLIC_* vars must be present at BUILD time so Next can embed them in
# the client bundle.  Pass real values via Coolify's build-arg / env settings.
# Server-only vars (SES_*, SENDER_EMAIL) are injected at runtime only.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}

# Disable Next.js telemetry in CI/CD
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build


# =============================================================================
# STAGE 3 — runner (production image)
# Minimal Alpine image — only the compiled artefacts land here
# =============================================================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

# ── Security: run as non-root ─────────────────────────────────────────────────
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Disable telemetry in production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# ── Copy Next.js standalone bundle ───────────────────────────────────────────
# The standalone folder contains a self-contained server.js + node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

# ── Runtime environment variables ─────────────────────────────────────────────
# Server-only secrets (SES, Supabase) are injected by Coolify at runtime.
# Provide sensible defaults for non-secret vars only.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# SES / Email — no defaults; must be set in Coolify environment
# ENV SES_USER=
# ENV SES_PASSWORD=
# ENV SENDER_EMAIL=
ENV SES_HOST=email-smtp.ap-south-1.amazonaws.com
ENV SES_PORT=587

# ── Switch to non-root user ───────────────────────────────────────────────────
USER nextjs

# Expose the port Next.js listens on
EXPOSE 3000

# ── Health check ─────────────────────────────────────────────────────────────
# Coolify and most orchestrators honour HEALTHCHECK.
# Polls the root path every 30 s; marks container unhealthy after 3 failures.
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# ── Start the Next.js standalone server ──────────────────────────────────────
CMD ["node", "server.js"]

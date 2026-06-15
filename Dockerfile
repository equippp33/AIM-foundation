# =============================================================================
# AIM Foundation — Production Dockerfile
# Next.js 14 · Node.js 20 · npm · Coolify-ready
#
# Multi-stage build:
#   1. deps     — install ALL dependencies (including devDeps)
#   2. builder  — compile the Next.js production bundle
#   3. runner   — minimal runtime image (only compiled artefacts)
# =============================================================================

ARG NODE_VERSION=20-alpine3.20

# =============================================================================
# STAGE 1 — deps
# =============================================================================
FROM node:${NODE_VERSION} AS deps

WORKDIR /app

# Copy manifests first — Docker cache only invalidates when these change
COPY package.json package-lock.json ./

# npm install instead of npm ci — lockfile was generated on Windows; Alpine Linux
# resolves some optional native bindings (@emnapi/*) at different patch versions,
# which causes npm ci to reject the lockfile. npm install handles this correctly.
RUN npm install --ignore-scripts

# =============================================================================
# STAGE 2 — builder
# =============================================================================
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars must be baked in at BUILD time so Next.js can embed them
# in the client bundle. Pass real values via Coolify build-args / env settings.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
ENV NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# =============================================================================
# STAGE 3 — runner (production image)
# Minimal Alpine image — only compiled artefacts land here
# =============================================================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

# Run as non-root for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# SES SMTP defaults (secrets injected by Coolify at runtime)
ENV SES_HOST=email-smtp.ap-south-1.amazonaws.com
ENV SES_PORT=587

# Next.js standalone bundle — self-contained server.js + node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["node", "server.js"]

FROM node:22-alpine AS builder

RUN apk add --no-cache git
RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

WORKDIR /app

# Copy config files needed for postinstall (cf-typegen / wrangler)
COPY wrangler.jsonc package.json pnpm-lock.yaml ./
COPY project.inlang ./project.inlang/
COPY scripts ./scripts/
COPY tsconfig.json worker-configuration.d.ts ./

RUN pnpm install --frozen-lockfile || pnpm install

COPY . .
RUN pnpm run locale:compile
RUN pnpm run build

EXPOSE 8080

# Use vite preview to serve the built app
CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "8080"]

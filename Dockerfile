FROM node:22-alpine AS builder

RUN apk add --no-cache git
RUN corepack enable && corepack prepare pnpm@10.30.3 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY project.inlang ./project.inlang/
COPY scripts ./scripts/

RUN pnpm install --frozen-lockfile || pnpm install

COPY . .
RUN pnpm run locale:compile
RUN pnpm run build

EXPOSE 8080

# Use vite preview to serve the built app (serves client + SSR via middleware)
CMD ["pnpm", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "8080"]

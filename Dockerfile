# FROM node:16-alpine AS base

# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app


# COPY package.json yarn.lock* ./

# RUN \
#     if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#     elif [ -f package-lock.json ]; then npm ci; \
#     elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
#     else echo "Lockfile not found." && exit 1; \
#     fi

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# RUN yarn build

# FROM base AS runner
# WORKDIR /app

# ENV NODE_ENV production
# ENV API_URL=http://127.0.0.1:8000/dbwebapi/
# ENV NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/dbwebapi/
# ENV NEXT_PUBLIC_MEMBER_DASHBOARD_URL=http://google.com/

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD ["node", "server.js"]

FROM node:16-alpine

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node:node . .

USER node

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
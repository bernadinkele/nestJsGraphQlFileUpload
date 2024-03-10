## build image
FROM node:20.11.0-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /workspace
COPY package.json /workspace/
COPY pnpm-lock.yaml /workspace/
RUN pnpm install
COPY . .
RUN pnpm build

EXPOSE 3000
ENV NODE_ENV production
# CMD ["node", "dist/main"]
CMD ["pnpm", "run", "start:prod"]

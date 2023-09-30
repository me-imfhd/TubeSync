# TubeSync

This is an official TubeSync.

## Docker Installation

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network`

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open http://localhost:3000.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

## Run it locally

Run the following command:

```sh
git clone https://github.com/me-imfhd/TubeSync.git
pnpm install
```

## What's inside?

This turborepo uses pnpm as a package manager. It includes the following packages/apps:

### Apps and Packages

- `webapp`: a [Next.js](https://nextjs.org/) app.
- `api`: an [Express](https://expressjs.com/) server.
- `ui`: ui: a React component library.
- `eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`).
- `eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`).
- `logger`: Isomorphic logger (a small wrapper around console.log).
- `tsconfig`: tsconfig.json;s used throughout the monorepo.

### Utilities

- **Shadcn:** Unstyled components in React.
- **Tailwind CSS:** Utility-first CSS.
- **Clerk:** User management solution.
- **Prisma:** Database toolkit.
- **tRPC:** End-to-end typesafe APIs.
- **React Query:** Server state management in React.
- **Zod:** Schema validation in TypeScript.
- **TypeScript:** A strongly typed superset of JavaScript.
- **ESLint:** A linter tool for identifying and fixing problems in your JavaScript code.
- **Prettier:** An opinionated code formatter for consistent code styling.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Remote Caching

This example includes optional remote caching. In the Dockerfiles of the apps, uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build.

You can test this behavior using a command like:

`docker build -f apps/web/Dockerfile . --build-arg TURBO_TEAM=“your-team-name” --build-arg TURBO_TOKEN=“your-token“ --no-cache`

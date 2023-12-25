# NextJS Web App Template with docker support

This example contains everything needed to get NextJS and Directus development, staging and production environment up and running with Docker Compose or only Docker or without any of them.

## Benefits of Docker Compose

- Develop locally without Node.js or TypeScript installed ✨
- Easy to run, consistent development environment across macOS, Windows, and Linux teams
- Run multiple Next.js apps, databases, and other microservices in a single deployment
- Multistage builds combined with [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) outputs up to 85% smaller apps (Approximately 110 MB compared to 1 GB with create-next-app)
- Easy configuration with YAML files

## How to use

1. Create a repository using this template repository.

```
git clone https://github.com/shahrukhmlk/fullstack.git
```

1. Copy all the files from `secrets` folder to the root directory and edit accordingly. This is required for docker compose to read the secrets.

1. TEMP Fix directus permissions: Grant all users all permissions to `data` folder.

1. Install [Docker Desktop](https://docs.docker.com/get-docker).

Docker Desktop includes Docker Compose as part of the installation.

## Development

### 1. Run the development server:

```bash
# Build dev
docker compose -f docker-compose.dev.yml build

# Up dev
docker compose -f docker-compose.dev.yml up
```

### 3. Access different systems

- NextJS: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing. The page auto-updates as you edit the file.

- Storybook: Open [http://localhost:6006](http://localhost:3000) with your browser to see the result.

- Directus: Open [http://localhost:8055](http://localhost:8055) with your browser to see the result.

TODO:

- Database: Open [http://localhost:8055](http://localhost:8055) with your browser to see the result.

## Staging

Multistage builds are highly recommended in staging. Combined with the Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) feature, only `node_modules` files required for production are copied into the final Docker image.

First, run the staging server (Final image approximately 110 MB).

```bash
# Build stage
docker compose -f docker-compose.stage.yml build

# Up stage in detached mode
docker compose -f docker-compose.stage.yml up -d
```

## Production

Multistage builds are highly recommended in production. Combined with the Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files) feature, only `node_modules` files required for production are copied into the final Docker image.

First, run the production server (Final image approximately 110 MB).

```bash
# Build prod
docker compose -f docker-compose.prod.yml build

# Up prod in detached mode
docker compose -f docker-compose.prod.yml up -d
```

## Useful commands

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes
```

## Without Docker

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

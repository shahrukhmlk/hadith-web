FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci;

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY .eslintrc.json .
COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.js .
# copy prsima schema
COPY prisma ./prisma
# Copy story book
COPY .storybook ./.storybook

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode
CMD npm run dev
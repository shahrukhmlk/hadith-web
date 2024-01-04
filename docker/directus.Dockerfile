FROM directus/directus:10.8.3

USER root
RUN corepack enable
USER node
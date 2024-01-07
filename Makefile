.PHONY: build-development
dev-build: ## Build the development docker image.
	docker compose -f docker/development/docker-compose.yml build

.PHONY: start-development
dev-start: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml up -d

.PHONY: stop-development
dev-stop: ## Stop the development docker container.
	docker compose -f docker/development/docker-compose.yml down

.PHONY: build-staging
stage-build: ## Build the staging docker image.
	docker compose -f docker/staging/docker-compose.yml build

.PHONY: start-staging
stage-start: ## Start the staging docker container.
	docker compose -f docker/staging/docker-compose.yml up -d

.PHONY: stop-staging
stage-stop: ## Stop the staging docker container.
	docker compose -f docker/staging/docker-compose.yml down
  
.PHONY: build-production
prod-build: ## Build the production docker image.
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-production
prod-start: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
prod-stop: ## Stop the production docker container.
	docker compose -f docker/production/docker-compose.yml down

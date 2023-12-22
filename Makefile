#!/usr/bin/make

include .env

.DEFAULT_GOAL := help
docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)
PROJECT_NAME := events

COMPOSE_CONFIG := --env-file .env -p $(PROJECT_NAME) -f ./docker-compose.yml
APP_SERVICE_NAME :=app

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

---------------: ## ------[ Docker ]---------
#DOCKER --------------------------------------------------
build:
	$(docker_compose_bin) $(COMPOSE_CONFIG) build

#CDN --------------------------------------------------
check:
	$(docker_compose_bin) $(COMPOSE_CONFIG) config
up: check
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d
# For the local environment we must reinstall the node_modules because we link directory to the container
ifeq ($(ENVIRONMENT), local)
	@make install
endif
down:
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
restart:
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart

---------------: ## ------[ App development ]---------
#Install node_modules --------------------------------------------------
install:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(APP_SERVICE_NAME)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(APP_SERVICE_NAME) sh -c "cd /app/server && npm i && cd ../client && npm i" || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(APP_SERVICE_NAME)
watch:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(APP_SERVICE_NAME)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --service-ports $(APP_SERVICE_NAME) || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(APP_SERVICE_NAME)

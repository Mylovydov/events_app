#!/usr/bin/make

include .env

.DEFAULT_GOAL := help
docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)
PROJECT_NAME := events_app

COMPOSE_CONFIG := --env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.yml
APP_SERVICE_NAME :=app

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


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
	@make client-install
endif
down:
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
restart:
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart

---------------: ## ------[ App development ]---------
#Install node_modules --------------------------------------------------
install:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(AUTH_GATE_SERVICE)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(AUTH_GATE_SERVICE) yarn install || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(AUTH_GATE_SERVICE)
watch:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(AUTH_GATE_SERVICE)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(AUTH_GATE_SERVICE) yarn start:dev || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(AUTH_GATE_SERVICE)
debug:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(AUTH_GATE_SERVICE)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm -p 9229:9229 $(AUTH_GATE_SERVICE) yarn start:debug || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(AUTH_GATE_SERVICE)
sh:
	$(docker_compose_bin) $(COMPOSE_CONFIG) stop $(AUTH_GATE_SERVICE)
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm $(AUTH_GATE_SERVICE) bash || true
	$(docker_compose_bin) $(COMPOSE_CONFIG) start $(AUTH_GATE_SERVICE)
migrate:
	$(docker_compose_bin) $(COMPOSE_CONFIG) exec -T $(AUTH_GATE_SERVICE) yarn db:auth:migrate || true
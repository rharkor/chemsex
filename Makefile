# Variables
API_PATH = ./apps/api
APP_PATH = ./apps/front
NPM = pnpm

.PHONY: up
up:
	docker compose up -d
.PHONY: down
down:
	docker compose down
.PHONY: logs
logs:
	docker compose logs -f

.PHONY: api
api: 
	$(NPM) run setup && cd $(API_PATH) && turbo run dev
.PHONY: app
app:
	$(NPM) run setup
	$(NPM) --filter $(APP_PATH) dev
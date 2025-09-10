# DevOps Todo App


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project implements a Node.js-based Todo API with production-grade automation, showcasing CI/CD pipelines, containerization, orchestration, monitoring, and security—all using free tools.

## Implemented Features

### Application
- **RESTful API**: Node.js with Express, providing CRUD operations for todos (`/todos` GET/POST, `/todos/:id` PUT/DELETE).
- **Database**: MongoDB for persistent storage.
- **Metrics**: Prometheus client integrated for HTTP request tracking.

### CI/CD Pipeline (GitHub Actions)
- **Triggers**: Runs on push/pull requests to `main` branch.
- **Jobs**:
  - **Lint**: Runs ESLint for code quality checks.
  - **Test**: Executes Jest unit/integration tests with a MongoDB container.
  - **Security Scan**: Uses Trivy to scan filesystem for vulnerabilities.
  - **Docker Build/Push**: Builds and pushes Docker image to Docker Hub.
- **Features**:
  - Parallel execution of lint/test jobs for speed.
  - Dependency caching to reduce build time.
  - Secrets management for secure Docker Hub authentication.
  - Conditional execution: Only pushes images on successful scans/tests.

### Containerization
- **Dockerfile**: Single-stage build using `node:20-alpine`. Copies code, installs dependencies, exposes port 3000, and runs `npm start`.

### Orchestration
- **Docker Compose**: Manages a multi-container setup:
  - **App**: Node.js API (port 3000).
  - **MongoDB**: Database (port 27017) with persistent volume.
  - **Prometheus**: Metrics collection (port 9090).
  - **Grafana**: Visualization dashboards (port 3001).

### Monitoring
- **Prometheus**: Scrapes HTTP request metrics from the app every 15 seconds.
- **Grafana**: Displays dashboards for request counts and system metrics (accessible at `http://localhost:3001`).

### Testing and Quality
- **Unit/Integration Tests**: Jest with Supertest for API endpoints, integrated with MongoDB.
- **Linting**: ESLint enforces consistent code style.
- **Security**: Trivy scans for CVEs in dependencies and filesystem.

## Implementation Details


### CI/CD Workflow
Defined in `.github/workflows/cicd.yml`:
- **Lint Job**: Installs Node.js, runs `npm install`, executes `npm run lint`.
- **Test Job**: Spins up MongoDB via Docker, runs `npm test` with environment variable `MONGO_URI`.
- **Scan Job**: Uses Trivy to scan filesystem; fails on vulnerabilities.
- **Docker Job**: Logs into Docker Hub with secrets (`DOCKER_USERNAME`, `DOCKER_PASSWORD`), builds/pushes image tagged as `YOUR_USERNAME/devops-todo-app:latest`.

### Container Setup
- **Dockerfile**: Uses `node:20-alpine` base image, copies `package.json`, installs dependencies, copies app code, exposes port 3000, runs `npm start`.
- **Docker Compose**: Defines services (`app`, `mongo`, `prometheus`, `grafana`), maps ports, and sets up MongoDB volume for data persistence.

### Monitoring Setup
- **Prometheus**: Configured in `prometheus.yml` to scrape `/metrics` endpoint every 15s.
- **Grafana**: Accessible locally with default admin/admin credentials; add Prometheus datasource (`http://prometheus:9090`) for dashboards.

### How to Run Locally
1. Clone: `git clone https://github.com/YOUR_USERNAME/devops-todo-app.git`
2. Navigate: `cd devops-todo-app`
3. Start: `docker compose up -d`
4. Access:
   - API: `http://localhost:3000/todos` (test with curl/Postman)
   - Prometheus: `http://localhost:9090`
   - Grafana: `http://localhost:3001` (login: admin/admin)
5. Stop: `docker compose down`



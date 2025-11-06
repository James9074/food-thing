# Restaurant Food Management System

This repository contains a full-stack blueprint for a food service management system tailored to restaurant and catering operators. The platform automates supplier catalog ingestion, connects with USDA nutrition data, tracks recipes and inventory, and provides actionable analytics.

## Repository Layout

- `backend/` – FastAPI application with SQLAlchemy models, catalog ingestion pipeline scaffolding, Celery task definitions, and service layers for costing and reporting.
- `frontend/` – Next.js (App Router) dashboard leveraging Radix UI components to visualize alerts, prep lists, supplier ingestion, and ordering workflows.

## Backend Overview

Key capabilities implemented in the backend:

- **Supplier & Product APIs** for managing supplier metadata, ingesting catalog uploads, and storing price history snapshots.
- **Ingredient & Recipe APIs** with automatic cost rollups and placeholder nutrition matching services.
- **Ordering APIs** for creating and tracking supplier purchase orders with multi-item support.
- **Catalog ingestion service** capable of parsing CSV/TSV data, validating UPC/GTIN identifiers, and persisting pricing alongside historical records.
- **Supporting utilities** including GTIN validation, Celery task definitions, and reporting scaffolds for price trends.

### Running the backend locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m app.db.init_db  # create database tables
uvicorn app.main:app --reload
```

The application defaults to an in-memory SQLite database for rapid iteration. Configure PostgreSQL, Redis, and S3 credentials via environment variables defined in `app/core/config.py` when deploying.

## Frontend Overview

The React/Next.js frontend demonstrates the operational dashboards Jessica needs for day-to-day management:

- **Dashboard** summarizing price alerts, prep tasks, and pending orders.
- **Recipe builder** with drag-and-drop style ingredient selection, cost totals, and nutrition snapshots.
- **Supplier management** view for catalog uploads across multiple vendors.
- **Ordering & Inventory** pages to visualize smart ordering recommendations and inventory health.

### Running the frontend locally

```bash
cd frontend
npm install
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000). Update the environment with API endpoints to connect the UI to the FastAPI backend.

## Roadmap Alignment

The codebase is structured around the requested implementation phases:

1. **Catalog ingestion foundation** – file upload endpoint, CSV parser, GTIN validation utilities.
2. **USDA integration scaffolding** – nutrition matching service ready to integrate with external APIs.
3. **Recipe management** – recipe CRUD endpoints and cost engine for real-time pricing.
4. **Ordering & inventory** – ordering API and dashboard components with mock data.
5. **Analytics** – reporting service skeleton for price trend analysis.
6. **Mobile companion** – planned extension via API endpoints already exposed for inventory and orders.

Future work includes implementing Excel/PDF parsing, USDA API calls, Slack integration, machine learning matching, and mobile app delivery.

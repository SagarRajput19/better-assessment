## PR title examples
Task #1 — Backend CRUD APIs (Flask) — Sagar Kashyap
Task #2 — Frontend CRUD + Comments (React) — Sagar Kashyap

## PR description template (copy into each PR body)

### Summary
Implemented Task CRUD APIs and Comments APIs using Flask and SQLAlchemy.
Added automated tests (pytest) for basic endpoints.

### Files changed
- backend/models.py
- backend/routes.py
- backend/app.py
- backend/tests/test_tasks.py

### How to run locally
See backend/README.md and frontend/README.md

### Decisions & Assumptions
- Used SQLite for simplicity (file-based DB).
- Proxy configured in frontend/package.json to avoid CORS during dev.
- Tests use in-memory SQLite DB.

### Trade-offs
- Chose simplicity over production-ready DB (e.g., Postgres) because assignment focuses on API correctness.

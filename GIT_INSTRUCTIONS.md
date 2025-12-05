# Git + PR Setup Instructions (exact commands)

# 1. Initialize repo and push to GitHub (replace origin URL)
git init
git add .
git commit -m "chore: initial commit - backend + frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/better-assessment.git
git push -u origin main

# 2. Create backend branch and commit
git checkout -b feature/backend
git add backend
git commit -m "feat: implement backend APIs and tests"
git push origin feature/backend

# 3. Create frontend branch and commit
git checkout main
git checkout -b feature/frontend
git add frontend
git commit -m "feat: implement frontend UI (CRUD + comments)"
git push origin feature/frontend

# 4. Open PRs on GitHub:
# - feature/backend -> main  (Task #1)
# - feature/frontend -> main (Task #2)

# Use PR titles:
# Task #1 — Backend CRUD APIs (Flask) — Sagar Kashyap
# Task #2 — Frontend CRUD + Comments (React) — Sagar Kashyap

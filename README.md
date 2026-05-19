# Order Fulfillment Review Dashboard

A full-stack web application built for operations managers to review pre-matched order and delivery records, resolve issues, and export results.

## Tech Stack

Frontend:
- React (Vite)
- Axios

Backend:
- FastAPI
- SQLite
- SQLAlchemy

---

## Features

- View all review records
- Filter records:
  - All
  - Partial matches
  - Low confidence matches
- Review complete order and delivery details
- Mark records as resolved
- Export reviewed data as CSV
- SQLite-backed storage

---

## Project Structure

```txt
lockpost/
│
├── frontend/
├── backend/
│   ├── routes/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── seed.py
│   ├── sample_data.json
│
├── README.md
```

---

## Setup

### Clone repository

```bash
git clone <repo-url>
```

---

## Backend setup

```bash
cd backend

python -m venv venv
```

Activate venv:

Mac/Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install fastapi uvicorn sqlalchemy pydantic
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```txt
http://127.0.0.1:8000
```

Swagger docs:

```txt
http://127.0.0.1:8000/docs
```

---

## Seed Database

Run:

```bash
python seed.py
```

This loads records from:

```txt
sample_data.json
```

into SQLite.

---

## Frontend setup

```bash
cd frontend

npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

---

## Application Flow

sample_data.json

↓

seed.py

↓

SQLite database

↓

FastAPI APIs

↓

React Dashboard

---

## Hardest Design Decision

The main design decision was deciding whether to flatten the nested order and delivery JSON or preserve it.

I chose to store:

- searchable fields separately
- raw JSON payloads intact

Tradeoff:

This uses slightly more storage, but keeps flexibility if data structure changes later.

---

## Tradeoffs

To stay within the assignment time scope:

- prioritized functionality over UI polish
- kept authentication out
- used inline styles instead of a component library
- skipped testing

---

## AI Usage

AI tools used:

- ChatGPT

Used for:

- architecture planning
- debugging
- implementation guidance

---

## Future Improvements

- Better UI design
- Search by customer name
- Pagination
- Notes/comments system
- Analytics dashboard
- Unit tests
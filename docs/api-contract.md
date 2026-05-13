================================================================================
FAMILIENPLANER API CONTRACT
Backend: FastAPI
Frontend: React
Database: PostgreSQL
Local Base URL: http://localhost:8000/api
================================================================================


================================================================================
0. GENERAL RULES
================================================================================

# All API routes start with:
# /api

# Frontend calls backend using:
# http://localhost:8000/api/...

# Data format:
# Request body:  JSON
# Response body: JSON

# IDs:
# Use UUID strings for all database objects.

# Dates:
# Use ISO format.
# Example datetime: 2026-05-13T10:30:00
# Example date:     2026-05-20

# First implementation priority:
# Do NOT build all modules at once.
# Start only with:
# - health check
# - shopping list module


================================================================================
1. HEALTH CHECK
================================================================================

# Purpose:
# Frontend, Docker, CI/CD or AWS can check if backend is alive.

REQUEST:
GET /api/health

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
{
  "status": "ok",
  "service": "familienplaner-backend",
  "version": "0.1.0"
}


================================================================================
2. SHOPPING LIST MODULE
================================================================================

# Purpose:
# Manage shopping list items.
# Frontend can:
# - show all items
# - add new item
# - mark item as done / not done
# - edit item
# - delete item
# - load category list


--------------------------------------------------------------------------------
2.1 GET ALL SHOPPING ITEMS
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads all shopping items from backend.
# Used when the Shopping List page/component opens.

REQUEST:
GET /api/shopping/items

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
[
  {
    "id": "7f5d3e1a-2d62-4c58-8a11-3f41f49d9c01",
    "name": "Milk",
    "category": "Groceries",
    "is_done": false,
    "created_at": "2026-05-13T10:30:00"
  },
  {
    "id": "2a8b9ef3-90b1-4e2d-91bc-832d4ef93c22",
    "name": "Toilet paper",
    "category": "Household",
    "is_done": true,
    "created_at": "2026-05-13T10:35:00"
  }
]


--------------------------------------------------------------------------------
2.2 CREATE SHOPPING ITEM
--------------------------------------------------------------------------------

# Purpose:
# Frontend sends a new item to backend.
# Backend saves it in PostgreSQL and returns the created item.

REQUEST:
POST /api/shopping/items

FRONTEND SENDS:
{
  "name": "Bread",
  "category": "Groceries"
}

BACKEND RESPONSE:
{
  "id": "d51f7e10-932f-4215-93f7-2dc2c0e7e511",
  "name": "Bread",
  "category": "Groceries",
  "is_done": false,
  "created_at": "2026-05-13T10:40:00"
}


--------------------------------------------------------------------------------
2.3 UPDATE SHOPPING ITEM - CHECKBOX
--------------------------------------------------------------------------------

# Purpose:
# Frontend marks one item as done or not done.
# Example: user clicks checkbox.

REQUEST:
PATCH /api/shopping/items/d51f7e10-932f-4215-93f7-2dc2c0e7e511

FRONTEND SENDS:
{
  "is_done": true
}

BACKEND RESPONSE:
{
  "id": "d51f7e10-932f-4215-93f7-2dc2c0e7e511",
  "name": "Bread",
  "category": "Groceries",
  "is_done": true,
  "created_at": "2026-05-13T10:40:00"
}


--------------------------------------------------------------------------------
2.4 UPDATE SHOPPING ITEM - EDIT NAME OR CATEGORY
--------------------------------------------------------------------------------

# Purpose:
# Frontend updates item name and/or category.

REQUEST:
PATCH /api/shopping/items/d51f7e10-932f-4215-93f7-2dc2c0e7e511

FRONTEND SENDS:
{
  "name": "Whole grain bread",
  "category": "Groceries"
}

BACKEND RESPONSE:
{
  "id": "d51f7e10-932f-4215-93f7-2dc2c0e7e511",
  "name": "Whole grain bread",
  "category": "Groceries",
  "is_done": true,
  "created_at": "2026-05-13T10:40:00"
}


--------------------------------------------------------------------------------
2.5 DELETE SHOPPING ITEM
--------------------------------------------------------------------------------

# Purpose:
# Frontend deletes one item.
# Backend removes it from database.

REQUEST:
DELETE /api/shopping/items/d51f7e10-932f-4215-93f7-2dc2c0e7e511

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
{
  "message": "Shopping item deleted successfully"
}


--------------------------------------------------------------------------------
2.6 GET SHOPPING CATEGORIES
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads category options for dropdown/filter.

REQUEST:
GET /api/shopping/categories

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
[
  "Groceries",
  "Household",
  "Electronics",
  "Health",
  "Other"
]


================================================================================
3. CALENDAR MODULE
================================================================================

# Purpose:
# Manage simple calendar events.
# Frontend can:
# - show events
# - add event
# - update event
# - delete event
# - filter events by month/date range


--------------------------------------------------------------------------------
3.1 GET ALL CALENDAR EVENTS
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads all calendar events.

REQUEST:
GET /api/calendar/events

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
[
  {
    "id": "9dce62bc-2d21-44cf-8e17-f4a6b6e8a001",
    "title": "Dentist appointment",
    "event_date": "2026-05-20",
    "created_at": "2026-05-13T11:00:00"
  },
  {
    "id": "40a97eb5-2859-441a-91fd-2b5242d5bd19",
    "title": "Family dinner",
    "event_date": "2026-05-24",
    "created_at": "2026-05-13T11:05:00"
  }
]


--------------------------------------------------------------------------------
3.2 GET CALENDAR EVENTS BY DATE RANGE
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads only events for selected month.
# Useful for monthly calendar view.

REQUEST:
GET /api/calendar/events?from=2026-05-01&to=2026-05-31

FRONTEND SENDS:
No body.
Query parameters:
from = start date
to   = end date

BACKEND RESPONSE:
[
  {
    "id": "9dce62bc-2d21-44cf-8e17-f4a6b6e8a001",
    "title": "Dentist appointment",
    "event_date": "2026-05-20",
    "created_at": "2026-05-13T11:00:00"
  },
  {
    "id": "40a97eb5-2859-441a-91fd-2b5242d5bd19",
    "title": "Family dinner",
    "event_date": "2026-05-24",
    "created_at": "2026-05-13T11:05:00"
  }
]


--------------------------------------------------------------------------------
3.3 CREATE CALENDAR EVENT
--------------------------------------------------------------------------------

# Purpose:
# Frontend creates a new calendar event.

REQUEST:
POST /api/calendar/events

FRONTEND SENDS:
{
  "title": "Doctor appointment",
  "event_date": "2026-05-22"
}

BACKEND RESPONSE:
{
  "id": "ac78cc46-06e2-4522-a845-f2cc8d57ef22",
  "title": "Doctor appointment",
  "event_date": "2026-05-22",
  "created_at": "2026-05-13T11:10:00"
}


--------------------------------------------------------------------------------
3.4 UPDATE CALENDAR EVENT
--------------------------------------------------------------------------------

# Purpose:
# Frontend edits title and/or date of an event.

REQUEST:
PATCH /api/calendar/events/ac78cc46-06e2-4522-a845-f2cc8d57ef22

FRONTEND SENDS:
{
  "title": "Updated doctor appointment",
  "event_date": "2026-05-23"
}

BACKEND RESPONSE:
{
  "id": "ac78cc46-06e2-4522-a845-f2cc8d57ef22",
  "title": "Updated doctor appointment",
  "event_date": "2026-05-23",
  "created_at": "2026-05-13T11:10:00"
}


--------------------------------------------------------------------------------
3.5 DELETE CALENDAR EVENT
--------------------------------------------------------------------------------

# Purpose:
# Frontend deletes one event.

REQUEST:
DELETE /api/calendar/events/ac78cc46-06e2-4522-a845-f2cc8d57ef22

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
{
  "message": "Calendar event deleted successfully"
}


================================================================================
4. BUDGET MODULE
================================================================================

# Purpose:
# Manage income and expenses.
# Frontend can:
# - show all transactions
# - create income/expense
# - update transaction
# - delete transaction
# - show budget summary
# - use status for progress bar color


--------------------------------------------------------------------------------
4.1 GET ALL BUDGET TRANSACTIONS
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads all income and expense entries.

REQUEST:
GET /api/budget/transactions

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
[
  {
    "id": "6e4761aa-d57a-4e4a-9d9c-9cd35e58b301",
    "title": "Salary",
    "amount": 2500.0,
    "type": "income",
    "category": "Salary",
    "created_at": "2026-05-13T12:00:00"
  },
  {
    "id": "d6f4b76c-893d-4fd7-a8e1-dc273a26b022",
    "title": "Supermarket",
    "amount": 75.5,
    "type": "expense",
    "category": "Food",
    "created_at": "2026-05-13T12:10:00"
  }
]


--------------------------------------------------------------------------------
4.2 CREATE BUDGET TRANSACTION - INCOME
--------------------------------------------------------------------------------

# Purpose:
# Frontend creates an income transaction.

REQUEST:
POST /api/budget/transactions

FRONTEND SENDS:
{
  "title": "Salary",
  "amount": 2500.0,
  "type": "income",
  "category": "Salary"
}

BACKEND RESPONSE:
{
  "id": "81f0ec2f-f4c9-43cd-9c52-3b2be7d0b921",
  "title": "Salary",
  "amount": 2500.0,
  "type": "income",
  "category": "Salary",
  "created_at": "2026-05-13T12:00:00"
}


--------------------------------------------------------------------------------
4.3 CREATE BUDGET TRANSACTION - EXPENSE
--------------------------------------------------------------------------------

# Purpose:
# Frontend creates an expense transaction.

REQUEST:
POST /api/budget/transactions

FRONTEND SENDS:
{
  "title": "Supermarket",
  "amount": 75.5,
  "type": "expense",
  "category": "Food"
}

BACKEND RESPONSE:
{
  "id": "d6f4b76c-893d-4fd7-a8e1-dc273a26b022",
  "title": "Supermarket",
  "amount": 75.5,
  "type": "expense",
  "category": "Food",
  "created_at": "2026-05-13T12:10:00"
}


--------------------------------------------------------------------------------
4.4 UPDATE BUDGET TRANSACTION
--------------------------------------------------------------------------------

# Purpose:
# Frontend edits title, amount, type or category.

REQUEST:
PATCH /api/budget/transactions/d6f4b76c-893d-4fd7-a8e1-dc273a26b022

FRONTEND SENDS:
{
  "title": "Supermarket Lidl",
  "amount": 82.3,
  "type": "expense",
  "category": "Food"
}

BACKEND RESPONSE:
{
  "id": "d6f4b76c-893d-4fd7-a8e1-dc273a26b022",
  "title": "Supermarket Lidl",
  "amount": 82.3,
  "type": "expense",
  "category": "Food",
  "created_at": "2026-05-13T12:10:00"
}


--------------------------------------------------------------------------------
4.5 DELETE BUDGET TRANSACTION
--------------------------------------------------------------------------------

# Purpose:
# Frontend deletes one transaction.

REQUEST:
DELETE /api/budget/transactions/d6f4b76c-893d-4fd7-a8e1-dc273a26b022

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
{
  "message": "Budget transaction deleted successfully"
}


--------------------------------------------------------------------------------
4.6 GET BUDGET SUMMARY
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads calculated budget overview.
# Used for:
# - total income
# - total expenses
# - remaining budget
# - progress bar
# - warning/critical status

REQUEST:
GET /api/budget/summary

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
{
  "total_income": 2500.0,
  "total_expenses": 850.0,
  "remaining_budget": 1650.0,
  "expense_ratio": 34.0,
  "status": "safe"
}

# Possible status values:
# "safe"     = budget is fine
# "warning"  = budget is getting tight, frontend may show orange
# "critical" = budget is almost used, frontend may show red


================================================================================
5. ACCOUNT MODULE
================================================================================

# Purpose:
# First version: simple profile settings.
# No real login/authentication yet.
# Later this module can become:
# - users
# - password hashing
# - JWT login
# - protected routes
# - user-specific data


--------------------------------------------------------------------------------
5.1 GET USER PROFILE
--------------------------------------------------------------------------------

# Purpose:
# Frontend loads profile and settings.

REQUEST:
GET /api/account/profile

FRONTEND SENDS:
No body.

BACKEND RESPONSE:
{
  "id": "f944e7fd-9c1b-4db4-a402-83d52ad3f30f",
  "name": "Max Mustermann",
  "email": "max@example.com",
  "notifications_enabled": true,
  "dark_mode": false,
  "created_at": "2026-05-13T13:00:00"
}


--------------------------------------------------------------------------------
5.2 UPDATE USER PROFILE
--------------------------------------------------------------------------------

# Purpose:
# Frontend updates profile/settings.

REQUEST:
PATCH /api/account/profile

FRONTEND SENDS:
{
  "name": "Stefan Iordache",
  "email": "stefan@example.com",
  "notifications_enabled": false,
  "dark_mode": true
}

BACKEND RESPONSE:
{
  "id": "f944e7fd-9c1b-4db4-a402-83d52ad3f30f",
  "name": "Stefan Iordache",
  "email": "stefan@example.com",
  "notifications_enabled": false,
  "dark_mode": true,
  "created_at": "2026-05-13T13:00:00"
}


================================================================================
6. STANDARD ERROR RESPONSES
================================================================================

# Purpose:
# Frontend should handle backend errors consistently.


--------------------------------------------------------------------------------
6.1 400 BAD REQUEST
--------------------------------------------------------------------------------

# Meaning:
# Frontend sent invalid data or malformed request.

HTTP STATUS:
400

BACKEND RESPONSE:
{
  "error": "Bad request",
  "detail": "Invalid input data"
}


--------------------------------------------------------------------------------
6.2 404 NOT FOUND
--------------------------------------------------------------------------------

# Meaning:
# Requested object does not exist.
# Example: frontend tries to delete an item that is not in DB.

HTTP STATUS:
404

BACKEND RESPONSE:
{
  "error": "Not found",
  "detail": "Shopping item not found"
}


--------------------------------------------------------------------------------
6.3 422 VALIDATION ERROR
--------------------------------------------------------------------------------

# Meaning:
# FastAPI/Pydantic validation failed.
# Example: required field is missing.

HTTP STATUS:
422

BACKEND RESPONSE:
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "name"],
      "msg": "Field required",
      "input": {
        "category": "Groceries"
      }
    }
  ]
}


--------------------------------------------------------------------------------
6.4 500 INTERNAL SERVER ERROR
--------------------------------------------------------------------------------

# Meaning:
# Unexpected backend error.
# Example:
# - database unavailable
# - unhandled exception
# - wrong backend configuration

HTTP STATUS:
500

BACKEND RESPONSE:
{
  "error": "Internal server error",
  "detail": "Unexpected backend error"
}


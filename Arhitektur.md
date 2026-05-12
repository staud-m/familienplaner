myapp/
├── frontend/                    # React App
│   ├── public/
│   ├── src/
│   │   ├── api/                 # API-Client (fetch/axios)
│   │   │   ├── client.ts        # Basis-Client mit Auth-Header
│   │   │   ├── shopping.ts
│   │   │   ├── calendar.ts
│   │   │   ├── budget.ts
│   │   │   └── auth.ts
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── MainLayout.tsx
│   │   │   ├── shopping/
│   │   │   │   ├── ShoppingList.tsx
│   │   │   │   ├── ItemRow.tsx
│   │   │   │   └── CategoryFilter.tsx
│   │   │   ├── calendar/
│   │   │   │   ├── CalendarGrid.tsx
│   │   │   │   ├── EventForm.tsx
│   │   │   │   └── EventList.tsx
│   │   │   ├── budget/
│   │   │   │   ├── BudgetOverview.tsx
│   │   │   │   ├── TransactionForm.tsx
│   │   │   │   └── TransactionList.tsx
│   │   │   └── account/
│   │   │       ├── ProfileCard.tsx
│   │   │       └── SettingsPanel.tsx
│   │   ├── pages/
│   │   │   ├── Shopping.tsx
│   │   │   ├── Calendar.tsx
│   │   │   ├── Budget.tsx
│   │   │   └── Account.tsx
│   │   ├── store/               # Zustand (State Management)
│   │   │   ├── authStore.ts
│   │   │   ├── shoppingStore.ts
│   │   │   ├── calendarStore.ts
│   │   │   └── budgetStore.ts
│   │   ├── types/               # TypeScript-Typen
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # FastAPI App
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   ├── router.py    # Haupt-Router
│   │   │   │   ├── shopping.py  # /api/v1/shopping/...
│   │   │   │   ├── calendar.py  # /api/v1/calendar/...
│   │   │   │   ├── budget.py    # /api/v1/budget/...
│   │   │   │   └── auth.py      # /api/v1/auth/...
│   │   │   └── deps.py          # Dependency Injection (DB, Auth)
│   │   ├── core/
│   │   │   ├── config.py        # Settings (Pydantic BaseSettings)
│   │   │   ├── security.py      # JWT-Logik
│   │   │   └── database.py      # SQLAlchemy Engine + Session
│   │   ├── models/              # SQLAlchemy ORM-Modelle
│   │   │   ├── user.py
│   │   │   ├── shopping.py
│   │   │   ├── calendar.py
│   │   │   └── budget.py
│   │   ├── schemas/             # Pydantic-Schemas (Request/Response)
│   │   │   ├── user.py
│   │   │   ├── shopping.py
│   │   │   ├── calendar.py
│   │   │   └── budget.py
│   │   ├── services/            # Business Logic
│   │   │   ├── shopping_service.py
│   │   │   ├── calendar_service.py
│   │   │   └── budget_service.py
│   │   └── main.py              # FastAPI App + Middleware
│   ├── alembic/                 # DB-Migrations
│   │   ├── versions/
│   │   └── env.py
│   ├── tests/
│   │   ├── test_shopping.py
│   │   ├── test_budget.py
│   │   └── conftest.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── alembic.ini
│
├── infra/                       # AWS-Infrastruktur
│   ├── terraform/               # (optional, alternativ CDK)
│   │   ├── main.tf
│   │   ├── ecs.tf
│   │   ├── rds.tf
│   │   └── alb.tf
│   ├── ecs-task-definition.json
│   └── docker-compose.prod.yml
│
├── .github/
│   └── workflows/
│       ├── ci.yml               # Test + Lint bei PR
│       └── deploy.yml           # Build + Push + ECS Deploy bei merge
│
├── docker-compose.yml           # Lokale Entwicklung
└── README.md

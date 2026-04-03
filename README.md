# Finance Data Processing and Access Control Backend

##  Overview
This project is a backend system for managing financial records with role-based access control. It provides APIs for handling transactions, user roles, and dashboard analytics.

---

##  Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Jest + Supertest (Testing)

---

## Roles
- Viewer → Can view records & dashboard
- Analyst → Can view records & analytics
- Admin → Full access (CRUD + user management)

---

##  Features
- User Authentication (JWT)
- Role-Based Access Control
- Financial Records CRUD
- Filtering, Pagination, Search
- Dashboard Summary APIs
- Monthly Trends Analytics
- Soft Delete
- Rate Limiting
- Unit Testing

---

##  API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Records
- GET /api/records
- POST /api/records
- PUT /api/records/:id
- DELETE /api/records/:id

### Dashboard
- GET /api/dashboard
- GET /api/dashboard/monthly-trends

### Users (Admin only)
- GET /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

---

## Setup

```bash
git clone <repo-url>
cd project
npm install
### Test Environment

Create `.env.test` file:

```env
MONGO_URI_TEST=your_test_db_uri
JWT_SECRET=your_secret
PORT=5002
NODE_ENV=test

Create .env:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
PORT=5001

Run:

npm start

 Run Tests:

npm test

## Assumptions
- Each financial record is associated with a specific user (createdBy).
- Soft delete is used instead of permanent deletion to prevent data loss.
- Only admin users can create, update, or delete records.
- Analysts and viewers have read-only access based on permissions.


##  Security & Validation
- JWT-based authentication is used for secure access.
- Role-based middleware restricts unauthorized actions.
- Input validation is implemented for email, password, and records.
- Rate limiting is applied to prevent abuse.
- Sensitive data like passwords are hashed using bcrypt.

##  Future Improvements
- Weekly trends and advanced analytics
- Export reports (CSV/PDF)
- Frontend dashboard integration
- Caching for performance optimization

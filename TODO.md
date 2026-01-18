# 🎫 Ticket War Engine

A high-concurrency event ticketing system designed to handle massive traffic surges without data inconsistency (race conditions). Built with performance and scalability in mind.

## 🛠 Tech Stack

- **Runtime:** Node.js & TypeScript
- **Framework:** Fastify (Low overhead, high performance)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Message Broker:** RabbitMQ (AMQP Protocol)
- **Concurrency Control:** DB Transactions (ACID) & Asynchronous Queueing
- **Frontend:** React + Mantine UI (Vite)

---

## 🚀 Development Roadmap

### Phase 1: Foundation & Architecture

- [X] **Project Setup**: Initialize Fastify with TypeScript (Strict Mode).
- [X] **Docker Environment**: Setup `docker-compose.yml` for PostgreSQL and RabbitMQ (Management Plugin).
- [X] **Database Design**: Create Prisma Schema (Users, Events, Tickets, Transactions).
- [X] **Database Connection**: Configure Prisma Client & Run initial migration.

### Phase 2: Core Features (The MVP)

- [X] **Authentication**: Implement JWT Auth (Register/Login).
- [X] **Event Management**: CRUD APIs for Events (Create event, set quota/seat stock).
- [X] **Public View**: API to list available events and remaining seats.
- [X] **Booking System (Naive Version)**: Implement basic "Book Ticket" logic directly hitting the DB (Intentionally vulnerable to race conditions for testing).

### Phase 3: The Engineering Challenges (The "Selling Point")

- [ ] **Stress Test Simulation**: Create a script to simulate 100+ concurrent requests to buy tickets.
- [ ] **Fixing Race Conditions (Level 1)**: Implement Prisma Interactive Transactions.
- [ ] **Scaling Up (Level 2) - RabbitMQ Integration**:
  - [ ] **Setup Connection**: Create a robust RabbitMQ connection handler (handling reconnects).
  - [ ] **Producer Service**: Refactor Booking API to send `booking_request` payload to a RabbitMQ Exchange/Queue.
  - [ ] **Consumer Worker**: Create a background worker that listens to the queue, processes the order, and updates the DB.
  - [ ] **Acknowledgement (ACK)**: Implement logic to `ack` (success) or `nack` (retry) messages to ensure no order is lost.
- [ ] **Rate Limiting**: Prevent bot spam using `@fastify/rate-limit`.

### Phase 4: Frontend Client

- [ ] **Setup**: Initialize Vite + React + Mantine.
- [ ] **Event Catalog**: UI to display list of events & real-time stock.
- [ ] **Booking UX**: Button with loading state/queue status feedback.
- [ ] **My Tickets**: Page to view purchased tickets.

### Phase 5: Deployment & Final Polish

- [ ] **Documentation**: Write API documentation (Swagger/OpenAPI).
- [ ] **Deployment**: Deploy Backend (Railway/Render) & Frontend (Vercel).
- [ ] **CI/CD**: Setup basic GitHub Actions (Optional).

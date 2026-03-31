# Highway Ticket Management System

The Highway Ticket Management System is a modern, microservice-based application designed to handle highway toll operations, user management, and payment processing.

## Architecture

The system utilizes a **Spring Boot Microservices** backend architecture and a modern **React + Vite + Tailwind CSS** frontend dashboard.

### Backend Services
- **Service Registry (Eureka):** Handles microservice registration and discovery.
- **Config Server:** Centralized configuration management for all services.
- **Api-Gateway:** The single entry point for frontend requests (runs on port `8084`), routing them to appropriate microservices securely.
- **User-Service:** Manages user registrations, profiles, and NIC details.
- **Vehicle-Service:** Registers and tracks vehicles tied to user ownership.
- **Ticket-Service:** Issues and manages highway toll tickets securely.
- **Payement-Service:** Processes and records payments for specific tickets.

### Frontend Dashboard
- Located entirely within the `frontend/` directory.
- Built purely with **React**, **Vite**, and **Tailwind CSS**.
- Provides a responsive admin dashboard to intuitively manage Users, Vehicles, Tickets, and Payments via interactive data tables and dashboard analytics.
- Interacts seamlessly with the microservices by routing exclusively through the API Gateway.

---

## Prerequisites

- Java 17
- Maven 3.8+
- Node.js 18+ (for frontend operations)
- MySQL Server (for database persistence)

## Running the Backend

Start the backend microservices using your IDE or via Maven in the following recommended order:
1. `Service-Registry`
2. `Config-Server`
3. `User-Service`, `Vehicle-Service`, `Ticket-Service`, `Payement-Service`
4. `Api-Getway` (Make sure the gateway starts properly on `http://localhost:8084`)

*To build or compile any backend service manually:*
```bash
cd <service-folder>
mvn clean compile
```

## Running the Frontend

Navigate into the `frontend` folder from the root of the project to bootstrap the UI dashboard:
```bash
cd frontend
npm install
npm run dev
```
The React development server will start at `http://localhost:5173`. 
*Note: Vite proxy automatically routes all `/api/*` network requests directly to the API Gateway on `http://localhost:8084`. You do not need any additional backend CORS configurations!*

## Building for Production

To create a production-ready, minified build folder for the frontend:
```bash
cd frontend
npm run build
```
This command compiles and ships all the optimized, production-ready assets into the `frontend/dist/` directory.
# Highway_Ticket_Management_System

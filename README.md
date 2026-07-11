# Car Dealership Inventory System

A modern, full-stack web application designed for car dealerships to manage their vehicle inventory seamlessly. Built with a robust Java Spring Boot backend, a lightning-fast React frontend, and containerized using Docker for effortless deployment.

## ✨ Features

### 👨‍💼 Administrator Capabilities
- **Complete Inventory Control**: Add, edit, and remove vehicles from the dealership's fleet.
- **Stock Management**: Restock vehicles seamlessly with a single click.
- **Secure Configuration**: Dedicated settings page for platform configurations.

### 👤 Customer Capabilities
- **Dynamic Search & Filtering**: Find the perfect car by filtering through Make, Category (SUV, Sedan, Truck, etc.), and Max Price.
- **Purchase Requests**: Submit instant purchase requests for in-stock vehicles.
- **Real-Time Availability**: Instantly see if a vehicle is "In Stock" or "Out of Stock".

### 🔒 Security & Architecture
- **Role-Based Access Control**: JWT-based authentication ensuring Admins and Customers only access what they are authorized to see.
- **Pagination & Performance**: Backend pagination and sorting to handle large fleets of vehicles without slowing down the UI.
- **Automated Database Migrations**: Flyway scripts automatically spin up and version your PostgreSQL schema.

---

## 🛠️ Technology Stack

**Frontend**
- React 19 (Vite)
- Tailwind CSS V4
- Redux Toolkit (State Management)
- Lucide React (Icons)
- React Router DOM

**Backend**
- Java 21
- Spring Boot 3.x
- Spring Security (JWT Auth)
- Spring Data JPA (Hibernate)
- Flyway (Database Migrations)
- PostgreSQL

**DevOps**
- Docker & Docker Compose
- Multi-stage Docker Builds
- Nginx (Reverse Proxy & Static Hosting)

---

## 🚀 Getting Started

The entire application is containerized, meaning you don't need to install Java, Node, or PostgreSQL on your local machine to run it! All you need is **Docker** and **Docker Compose**.

### 1. Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 2. Build and Run
Clone this repository and run the following command in the root directory:

```bash
docker-compose up --build -d
```

This command will:
1. Initialize the PostgreSQL database and run the Flyway migrations.
2. Build the Spring Boot backend (`.jar`) and start the API server.
3. Build the React frontend (`dist/`) and serve it using Nginx.

### 3. Access the Application
Once the containers are successfully running, open your web browser and navigate to:
**http://localhost**

*(Note: Nginx automatically routes `/api/v1/*` requests to the backend container, eliminating any CORS issues).*

### 4. Default Admin Credentials
A default Admin account is automatically seeded into the database upon startup:
- **Email:** `admin@dealership.com` (or use your custom registered Admin email)
- **Password:** `admin123`

---

## 🛑 Stopping the Application
To shut down the servers and remove the containers, run:
```bash
docker-compose down
```
*(Your database data will persist safely in a Docker volume named `pgdata`)*.

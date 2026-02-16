

# 🛒 E-Commerce API Demo

This project is an end-to-end API development demonstration focusing on **Design-First development**, **Self-hosted Mocking**, and **Automated Testing** using Insomnia and Kong.

---

## Getting Started

### Prerequisites

* **Docker Desktop**
  Must be running to host the mock services.

* **Insomnia**
  Used for API design, Git synchronization, and running test suites.

* **Node.js**
  Required to run the live local server implementation.

---

## Infrastructure Setup

This project uses **Self-hosted Mocking** to allow parallel development of services without depending on backend uptime.

### 1️⃣ Start the Mock Engine

To spin up the Mockbin and Redis containers required for the mock server, run:

```bash
docker compose up -d
```

The mock server will be available at:

```
http://localhost:8080
```

---

### 2️⃣ Run the Live Backend

To test against the actual implementation:

```bash
node server.js
```

The live server runs on:

```
http://localhost:3000
```

---

## API Mocking Workflow

This project follows the Insomnia Self-hosted Mocking workflow:

1. **Generate Mocks**
   Live responses from the local server are captured in Insomnia.

2. **Populate Routes**
   Captured data is used to seed the mock routes in the self-hosted Mockbin instance.

3. **Activate Routes**
   Each route is tested within the Insomnia Mock tab to store the response in the local Redis database.

---

## Testing

The Insomnia collection includes a suite of automated tests for the Checkout Flow:

* **GET `/products`**
  Validates the product list structure and property types.

* **POST `/cart`**
  Ensures items are added correctly with valid JSON bodies.

### Test Scripts

High-level scripts capture dynamic variables (e.g., `dynamic_product_id`) to ensure sequential tests pass without manual intervention.

---

## 📂 Repository Structure

```text
server.js                # Node.js implementation of the E-commerce API
docker-compose.yaml      # Configuration for the local Mockbin/Redis stack
my_design_document.yaml  # OpenAPI 3.0 specification for the API
my_mock_server.yaml      # Version-controlled mock route definitions
```


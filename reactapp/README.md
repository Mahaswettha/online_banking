# Online Banking Dashboard

A full-stack web application that provides a simplified online banking system where users can create accounts, perform transactions, and view transaction history.  
The backend is developed using **Spring Boot**, and the frontend is built with **React.js**. The system ensures data consistency and atomicity across all banking operations.

---

## 📌 Features

- Create bank accounts with validations
- View all accounts and account details
- Deposit money
- Withdraw money with minimum balance validation
- Transfer money between accounts
- View complete transaction history
- Atomic and consistent transaction handling
- User-friendly React-based UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- HTML5, CSS3
- JavaScript

### Backend
- Spring Boot
- Spring Data JPA
- Hibernate
- RESTful APIs

### Database
- MySQL

### Tools
- Maven
- Node.js
- VS Code / IntelliJ
- Postman

---


## 🔗 API Endpoints

### Account Management

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/accounts` | Create a new account |
| GET | `/api/accounts` | Get all accounts |
| GET | `/api/accounts/{accountId}` | Get account details |

### Transaction Management

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/transactions/deposit` | Deposit money |
| POST | `/api/transactions/withdraw` | Withdraw money |
| POST | `/api/transactions/transfer` | Transfer money |
| GET | `/api/transactions/account/{accountId}` | Transaction history |

---

## 📋 Validations

### Account
- Account number must be **10 digits and unique**
- Account holder name cannot be empty
- Minimum balance must be **₹500**
- Account type must be **Savings** or **Checking**

### Transactions
- Amount must be greater than 0
- Account must exist
- Minimum balance of ₹500 must be maintained
- Cannot transfer to the same account

---

## ▶️ How to Run the Application

### Backend (Spring Boot)

```bash
cd springapp
mvn spring-boot:run

mvn spring-boot:run
Backend will run on http://localhost:8080

Frontend (React)

cd reactapp
npm install
npm start
Frontend will run on http://localhost:8081


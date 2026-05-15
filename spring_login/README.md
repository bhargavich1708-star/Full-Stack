# Spring Login Form

A modern Full-Stack Authentication System built with Spring Boot and React.

## 🚀 Features

- **Secure Authentication**: Backend protection using Spring Security.
- **Modern Frontend**: Built with React 19, TypeScript, and Vite for optimal performance.
- **CORS Configured**: Pre-configured for seamless integration between frontend and backend.
- **Professional Structure**: Organized directory layout for backend and frontend codebases.

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot
- **Security**: Spring Security
- **Language**: Java
- **Build Tool**: Maven

### Frontend
- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Modern CSS

## 📋 Prerequisites

- **Java**: 17 or higher
- **Node.js**: 18.x or higher
- **Maven**: 3.x or higher

## 🏃 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/OP-Tony/FullStackDevelpmentClg.git
cd "Backend/spring login form"
```

### 2. Run the Backend
Navigate to the `backend` folder and run:
```bash
./mvnw spring-boot:run
```

### 3. Run the Frontend
Navigate to the `frontend` folder and run:
```bash
npm install
npm run dev
```

### 4. Fast Start
Alternatively, use the provided `start.bat` script in the root of the project to launch both services simultaneously.

## 🔒 Security Configuration
The backend is configured to allow requests from `http://localhost:5173` (default Vite port) and permits access to `/api/login` and `/api/signup` endpoints. All other requests require authentication.

---
Developed as part of the Full Stack Development curriculum.

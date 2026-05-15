# Area of a Square - Full Stack Application

A user-friendly web application to calculate and visualize the area of a square. Built with a **Spring Boot** backend and a **React (TypeScript)** frontend.

## 🚀 Features

- **Interactive Calculation:** Enter a side length or use the slider to calculate the area instantly.
- **Dynamic Visualization:** See the square grow or shrink in real-time as you change the side length.
- **Responsive Design:** A modern, clean UI that works across different screen sizes.
- **Visual Scale:** A Google Maps-style scale bar to help understand the relative dimensions.

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.5**
- **Spring Web** (REST API)
- **Maven** (Build Tool)

### Frontend
- **React 18**
- **TypeScript**
- **Vite** (Build Tool)
- **Vanilla CSS** (Custom Styling)

## 🏃 How to Run

### Prerequisites
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or higher
- [Node.js](https://nodejs.org/) (v18+)
- [Maven](https://maven.apache.org/download.cgi)

### 1. Start the Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start at `http://localhost:8080`.

### 2. Start the Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at the URL shown in your terminal (usually `http://localhost:5173`).

### Shortcut (Windows)
If you are on Windows, you can use the provided `run.bat` file in the root directory to start both the backend and frontend simultaneously.

## 📁 Project Structure

- `backend/`: Spring Boot source code and configuration.
- `frontend/`: React + TypeScript frontend application.
- `README.md`: This documentation.

---
Developed as part of the Full Stack Development course.

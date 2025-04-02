# Mega Mind E Library

```
░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░
░▒▓███████▓▒░░▒▓██████▓▒░  ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░
░▒▓███████▓▒░░▒▓████████▓▒░  ░▒▓█▓▒░    ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░
                                                                                                
                                                                                                
```

## Project Setup Instructions

### Backend Setup

1. Open the terminal and navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Rename `.env.example` to `.env`:
   ```sh
   mv .env.example .env
   ```
4. Fill out the required environment variables in `.env`.
5. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Rename `.env.example` to `.env.local`:
   ```sh
   mv .env.example .env.local
   ```
4. Fill out the required environment variables, notably the backend URL.
5. Start the frontend development server:
   ```sh
   npm run dev
   ```
6. The application will be available at:
   ```
   http://localhost:3000
   ```

## Backend Folder Structure

The backend is structured as follows:

```
backend/
├── src/
│   ├── models/        # Mongoose models
│   ├── controllers/   # Route controllers
│   ├── routes/        # Express routes
├── server.js         # Entry point of the backend application
├── .env.example      # Environment variable example file
├── package.json      # Dependencies and scripts
├── README.md         # Documentation
```

## Frontend Folder Structure

The frontend is a Next.js application with the following structure:

```
frontend/
├── pages/           # Next.js pages
├── components/      # Reusable components
├── public/         # Static files
├── styles/         # Global styles
├── .env.example    # Environment variable example file
├── package.json    # Dependencies and scripts
├── README.md       # Documentation
```

## Tech Stack

* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **Frontend:** Next.js, React, Tailwind CSS
* **Database:** MongoDB

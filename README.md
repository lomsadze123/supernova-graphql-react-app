# Supernova GraphQL React App

## Overview

GraphQL React App is a React-based web application that utilizes GraphQL for data fetching and Apollo Client for state management. The application includes authentication features, a dashboard, and error handling. It is designed with lazy loading, context usage, and token expiration management. The live demo includes a sign-in feature to demonstrate the authentication process. Additionally, this app tracks user sign-ins globally and privately through live streaming with subscriptions and WebSockets.

## Features

- User Authentication (Login/Logout)
- Home Page
- Dashboard with user-specific data
- Error Handling for undefined routes
- Token expiration management
- Responsive UI

## Tech Stack

- **Frontend**: React, React Router, React Context, Tailwind CSS, Custom Hook
- **Backend**: GraphQL, Apollo Client, Express
- **WebSockets**: Apollo WebSocket Link for subscriptions
- **Validation**: Zod
- **Notifications**: React Toastify

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lomsadze123/supernova-graphql-react-app.git
   cd supernova-graphql-react-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root of the project and add your environment variables:

   ```env
   PORT=your_port
   SECRET_KEY=your_secret_key
   DATABASE_URL=your_db_url
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- `src/components`: Reusable UI components
  - `Header.tsx`: Header component
  - `Dashboard.tsx`: Dashboard component
- `src/context`: React context for user state management
  - `UserContext.tsx`: User context provider
- `src/pages`: Page-level components
  - `Home.tsx`: Home page component
  - `Auth.tsx`: Auth page component
  - `ErrorPage.tsx`: Custom error page component
- `src/utils`: Utility functions (e.g., token management, validation)
  - `token.tsx`: Token management utilities
  - `validation.tsx`: Validation utilities
- `src/App.tsx`: Main application component
- `src/apolloClient.tsx`: Apollo Client setup

## Usage

- **Authentication**: Users can log in with their credentials. If the token is expired, they will be logged out automatically.
- **Home**: The home page is accessible after login.
- **Dashboard**: Displays user-specific information and is only accessible to authenticated users.
- **Error Handling**: Redirects to a custom error page for undefined routes.

## Acknowledgments

- React
- GraphQL
- Apollo Client
- React Router
- Tailwind CSS
- React Toastify
- Prisma
- SQLite3

## Contact

If you have any questions, feel free to reach out at beka.lomsadze.1@btu.edu.ge

## Live Demo

Check out the live demo of the project [here](https://supernova-graphql-react-app.vercel.app/).

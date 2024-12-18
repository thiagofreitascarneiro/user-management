# React User Management System

This project is a technical challenge to create a back-office user-management system using React, Vite, and Docker. The application fulfills all the requirements specified in the challenge, including authentication, user management, theme customization, and testing.

## Features

1. **Sign-up / Sign-in System**:

   - Users can register and log in.
   - Password validation ensures that the user inputs matching passwords during registration.
   - Active sessions are maintained using tokens.
   - Welcome page displays personalized greetings for logged-in users.

2. **User Management Dashboard**:

   - List users with pagination (6 users per page).
   - Create new users.
   - Update user information (excluding avatar updates).
   - Delete users.
   - Simulates data changes locally without persisting changes on page refresh.

3. **Theme Customization**:

   - Supports light and dark themes.
   - Theme preference is saved and persists even after closing the application.

4. **Testing**:

   - Automated tests implemented using Cypress to validate critical functionalities.

5. **Dockerized Deployment**:
   - Configured Dockerfile for easy setup and deployment.

## Tech Stack

- **React**: Front-end framework.
- **Vite**: Development environment (version: `^6.0.1`).
- **TailwindCSS**: For styling.
- **Cypress**: Testing framework.
- **Axios**: For API requests.
- **Node.js**: Version `20`.
- **Docker**: For containerization.

## Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- A code editor (e.g., VS Code)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd react-user-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173/`.

## Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t user-management-system .
   ```

2. Run the container:

   ```bash
   docker run -p 5173:5173 user-management-system
   ```

   The application will be available at `http://localhost:5173/`.

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the production build locally.
- **`npm run cypress`**: Run automated tests using Cypress.

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/             # Page components for routing
├── styles/            # TailwindCSS configuration and styles
├── types/             # TypeScript type definitions
├── routes/            # Application route definitions
├── services/          # API calls and service logic
├── context/           # Context API for global state management
├── assets/            # Static assets like images and icons
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## How to Use

1. **Sign Up / Sign In**:

   - Navigate to the registration or login page.
   - Use `https://reqres.in` mock API for user authentication.

2. **Dashboard**:

   - Access the dashboard after logging in.
   - Manage users by creating, updating, or deleting records.

3. **Theme Customization**:

   - Toggle between light and dark themes using the provided switch.

4. **Testing**:

   - Run automated tests with:
     ```bash
     npm run cypress
     ```

5. **Docker Deployment**:
   - Follow the Docker instructions to deploy the application.

## Future Improvements

- Implement real authentication for production.
- Add more robust error handling and validation.
- Enhance UI/UX for better user experience.

## Author

This project was developed as part of a technical challenge, adhering to best practices and professional workflows.

---

Enjoy using the User Management System! If you encounter any issues, feel free to raise them in the repository or contact the author directly.

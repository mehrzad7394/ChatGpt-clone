AI ChatGPT Clone

This is a full-stack application that replicates the functionalities of ChatGPT using Google Generative AI. The project includes a frontend built with Vite and a backend using Node.js and Express.

Features

AI-powered chatbot using Google Generative AI

User authentication powered by Clerk

Image handling via ImageKit

Seamless integration of React, React Query, and Tailwind CSS

Backend services including user authentication and database management with MongoDB

Table of Contents

Prerequisites

Installation

Environment Variables

Usage

Technologies Used

Prerequisites

Before starting, ensure you have the following installed:

Node.js (v16+)

npm or yarn

MongoDB instance (local or cloud-based)

Installation

1. Clone the Repository

git clone <repository-url>
cd <repository-folder>

2. Install Dependencies

Frontend

cd frontend
npm install

Backend

cd backend
npm install

Environment Variables

You must create .env files in both the frontend and backend directories to configure environment variables.

Frontend .env Variables:

VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_IMAGE_KIT_ENDPOINT=<your-image-kit-endpoint>
VITE_IMAGE_KIT_PUBLICKEY=<your-image-kit-public-key>
VITE_GEMINI_PUBLICKEY=<your-gemini-public-key>
VITE_API_URL=<backend-api-url>

Backend .env Variables:

IMAGE_KIT_ENDPOINT=<your-image-kit-endpoint>
IMAGE_KIT_PUBLICKEY=<your-image-kit-public-key>
IMAGE_KIT_PRIVATEKEY=<your-image-kit-private-key>
CLIENT_URL=<frontend-url>
MONGO=<your-mongodb-connection-string>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>

Usage

1. Start the Backend

Navigate to the backend directory and run:

npm run start

2. Start the Frontend

Navigate to the frontend directory and run:

npm run dev

The frontend will typically run at http://localhost:5173 and the backend at http://localhost:3000.

Technologies Used

Frontend:

Framework: Vite

Libraries:

React (19.x)

React Router DOM (7.x)

@tanstack/react-query (5.x)

@clerk/clerk-react

Tailwind CSS

React Markdown

React Toastify

React Type Animation

Backend:

Framework: Express.js

Libraries:

@clerk/backend

@clerk/express

Cookie Parser

CORS

Dotenv

ImageKit

Mongoose

Deployment

Frontend Deployment

Deploy the frontend using platforms like Vercel, Netlify, or any static hosting provider.
Ensure the .env variables are configured correctly in your deployment environment.

Backend Deployment

Deploy the backend using Heroku, AWS, or Vercel Functions. Ensure to:

Set the correct .env variables.

Configure your MongoDB and Clerk keys appropriately.

Contributing

Contributions are welcome! If you’d like to improve the project:

Fork the repository.

Create a feature branch.

Commit your changes.

Push your branch and open a Pull Request.

License

This project is licensed under the MIT License.

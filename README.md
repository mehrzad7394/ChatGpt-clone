# Build Your Own Full-Stack ChatGPT App

🚀 **Create a powerful AI-driven chatbot application for free!**

This project demonstrates how to build a **full-stack AI-powered chat application** using modern web development tools and Google Generative AI.

---

## ✨ Features

- 🌐 **React Front-End**: Interactive user interface for engaging conversations.
- 🖥️ **Express Back-End**: Robust API for handling requests.
- 🗂️ **MongoDB**: Scalable database design for storing chat history.
- 🤖 **Google Generative AI**: Deliver intelligent, conversational responses.
- ⚡ **Full-Stack Integration**: Seamlessly connects the front-end, back-end, and AI.
- 🔐 **Clerk Authentication**: Secure user authentication and session management.
- 🖼️ **ImageKit**: Efficient image handling and optimization.
- 🎨 **Tailwind CSS**: Modern, responsive design system.

---

## 🛠️ Technologies Used

### Frontend:

- **React**: Front-end framework for building dynamic user interfaces.
- **Vite**: Lightning-fast development build tool.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **React Router DOM**: Client-side routing.
- **React Query**: Data fetching and state management.
- **React Toastify**: Toast notifications.
- **React Type Animation**: Animated typing effects.

### Backend:

- **Express.js**: Minimal and flexible Node.js web application framework.
- **MongoDB**: NoSQL database for scalable data storage.
- **Clerk**: Authentication library for managing users securely.
- **ImageKit**: Image storage and optimization solution.

---

## 📂 Project Structure

- **Frontend**: Located in the `frontend` folder, built with React and Vite.
- **Backend**: Located in the `backend` folder, powered by Node.js and Express.

---

## 🛠️ Installation and Setup

### Prerequisites:

- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or cloud-based)

### 1. Clone the Repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies:

#### Frontend:

```bash
cd frontend
npm install
```

#### Backend:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables:

#### Frontend `.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_IMAGE_KIT_ENDPOINT=<your-image-kit-endpoint>
VITE_IMAGE_KIT_PUBLICKEY=<your-image-kit-public-key>
VITE_GEMINI_PUBLICKEY=<your-gemini-public-key>
VITE_API_URL=<backend-api-url>
```

#### Backend `.env`:

```env
IMAGE_KIT_ENDPOINT=<your-image-kit-endpoint>
IMAGE_KIT_PUBLICKEY=<your-image-kit-public-key>
IMAGE_KIT_PRIVATEKEY=<your-image-kit-private-key>
CLIENT_URL=<frontend-url>
MONGO=<your-mongodb-connection-string>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
```

---

## 🚀 Usage

### Start the Backend:

```bash
cd backend
npm run start
```

### Start the Frontend:

```bash
cd frontend
npm run dev
```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## 🛡️ Deployment

### Frontend:

Deploy the frontend using platforms like **Vercel** or **Netlify**. Ensure the `.env` variables are properly configured in your deployment environment.

### Backend:

Deploy the backend using **Heroku**, **AWS**, or **Railway**. Set up environment variables and ensure your MongoDB instance is accessible.

---



## 📜 License

This project is licensed under the MIT License.


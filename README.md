# Quantum Verse - Social Media Application

A modern, full-stack social media platform built with React, Redux, and Node.js. ConnectHub enables users to connect, share, and engage with a vibrant community through a feature-rich, responsive interface.

## 🌟 Features

### Core Features
- **Authentication & Authorization**
  - Secure user registration and login
  - Protected routes for authenticated users
  - JWT-based authentication

- **Post Management**
  - Create, edit, and delete posts
  - Rich text content support
  - Media upload capability
  - Like and bookmark functionality

- **User Profiles**
  - Customizable user profiles
  - Profile picture and bio
  - View other users' profiles and posts
  - Follow/unfollow system

- **Social Interaction**
  - Interactive feed with real-time updates
  - Post engagement (likes, comments)
  - Bookmark favorite posts
  - Explore page for discovering content

### User Experience
- Responsive design for all devices
- Intuitive navigation with React Router
- Bootstrap-based modern UI
- Real-time updates using Redux

## 🚀 Tech Stack

### Frontend
- **Core:**
  - React 18
  - Vite (Build tool)
  - Redux Toolkit with RTK Query
  - React Router v6

- **Styling & UI:**
  - Bootstrap 5
  - React Bootstrap
  - Bootstrap Icons

- **API Communication:**
  - Axios
  - RTK Query for data fetching

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary (for media storage)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Git

### Frontend Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/connecthub.git
cd connecthub/Frontend/social_Media_app
```

2. Install dependencies
```bash
npm install
```

3. Create .env file in the frontend directory
```env
VITE_API_URL=your_backend_url
```

4. Start development server
```bash
npm run dev
```

### Backend Setup
1. Navigate to backend directory
```bash
cd ../../Backend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file in the backend directory
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the server
```bash
npm start
```

## 📁 Project Structure

```
Frontend/
├── social_Media_app/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js

Backend/
├── Models/
├── db/
├── public/
├── uploads/
├── index.js
├── cloudinaryConfig.js
└── package.json
```

## 🔐 Environment Variables

### Frontend
```env
VITE_API_URL=backend_api_url
```

### Backend
```env
MONGODB_URI=mongodb_connection_string
JWT_SECRET=jwt_secret_key
CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
CLOUDINARY_API_KEY=cloudinary_api_key
CLOUDINARY_API_SECRET=cloudinary_api_secret
```

## 📱 Available Routes

- `/` - Home feed (Protected)
- `/login` - Login page
- `/register` - Registration page
- `/profile/:name` - User profile page
- `/explore` - Explore page
- `/bookmarks` - Bookmarked posts


---

Made with ❤️ by Malaya Tiwari

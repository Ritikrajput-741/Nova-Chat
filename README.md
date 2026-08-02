# Nova Chat

Nova Chat is a full-stack real-time chat application built with the MERN Stack. It provides secure authentication, real-time messaging, scalable backend architecture, and modern frontend development practices. The project is designed to demonstrate production-ready application development using modern JavaScript technologies.

## Overview

Nova Chat allows users to register, authenticate securely, and communicate instantly through real-time messaging. The application follows a client-server architecture and is built with scalability, maintainability, and performance in mind.

## Features

* User Registration and Authentication
* Secure JWT-Based Authentication
* Protected Routes
* Real-Time Messaging using Socket.IO
* Online and Offline User Presence
* Persistent Chat Storage
* Responsive User Interface
* RESTful API Architecture
* Redux Toolkit State Management
* Cookie-Based Authentication
* Environment Variable Configuration
* Redis Integration for Performance Optimization
* Docker and Docker Compose Support
* Modular Folder Structure
* Error Handling and API Validation

## Tech Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* Tailwind CSS
* Redux Toolkit
* React Router DOM
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT (JSON Web Token)
* bcrypt.js
* Redis
* Cookie Parser
* CORS
* dotenv

### DevOps & Tools

* Docker
* Docker Compose
* Git
* GitHub
* VS Code
* Postman
* npm

## Project Structure

```text
Nova-Chat/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Installation

Clone the repository

```bash
git clone https://github.com/Ritikrajput-741/Nova-Chat.git
```

Move into the project directory

```bash
cd Nova-Chat
```

## Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd ../frontend
npm install
```

## Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_connection
CLIENT_URL=http://localhost:5173
```

## Running the Project

Start Backend

```bash
cd backend
npm run dev
```

Start Frontend

```bash
cd frontend
npm run dev
```

## Docker

Build and start the application

```bash
docker compose up --build
```

Run in detached mode

```bash
docker compose up -d
```

Stop containers

```bash
docker compose down
```

## API Modules

* Authentication
* User Management
* Chat Management
* Message Management
* Socket Events

## Technologies Used

* React.js
* Vite
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Redis
* JWT
* Redux Toolkit
* Tailwind CSS
* Docker
* Docker Compose
* REST API
* Axios
* Git

## Future Improvements

* Group Chat
* Image and File Sharing
* Voice Messages
* Video Calling
* Read Receipts
* Push Notifications
* Message Search
* User Profile Management
* Friend Requests
* Dark Mode
* Multi-Device Support

## Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request for improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Author

Ritik Rajput

MERN Stack Developer interested in building scalable full-stack applications using React, Node.js, Express.js, MongoDB, Redis, Docker, Socket.IO, and modern web technologies.

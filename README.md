# Event Management Platform

This is a full-stack event management platform built with React.js for the frontend and Node.js with Express and MongoDB for the backend. The platform allows users to create, update, and join events, as well as view event details and filter events by category and date.

Live👉: https://eventify-lac-delta.vercel.app/

## Features

- User authentication and authorization
- Create, update, and delete events
- Join events and view attendees
- Filter events by category and date
- Real-time updates for event attendees
- Responsive design

## Technologies Used

### Frontend

- React.js
- Axios
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Socket.io

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/event-management-platform.git
   cd event-management-platform/backend

2. Install dependencies:
    Install dependencies:

3. Create a .env file in the backend directory and add the following environment variables:
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
4. Start the backend server:

### Frontend Setup
 
1.  Navigate to the frontend directory:
    cd ../frontend

2. Install dependencies:
   npm install

3. Create a .env file in the frontend directory and add the following environment variable:
   REACT_APP_BASE_URL=http://localhost:5000

4.Start the frontend development server:
   npm start

Here is a complete `README.md` file for your Event Management Platform project:

```markdown
# Event Management Platform

This is a full-stack event management platform built with React.js for the frontend and Node.js with Express and MongoDB for the backend. The platform allows users to create, update, and join events, as well as view event details and filter events by category and date.

## Features

- User authentication and authorization
- Create, update, and delete events
- Join events and view attendees
- Filter events by category and date
- Real-time updates for event attendees
- Responsive design

## Technologies Used

### Frontend

- React.js
- Axios
- React Router
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Socket.io

## Installation

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/event-management-platform.git
   cd event-management-platform/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following environment variables:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the following environment variable:

   ```env
   REACT_APP_BASE_URL=http://localhost:5000
   ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with an existing account.
3. Create, update, and delete events as an admin user.
4. Join events and view event details as a regular user.
5. Filter events by category and date.

## API Endpoints

### Authentication

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Log in a user

### Events

- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event (Admin only)
- `GET /api/events/myevents` - Get events created by the logged-in user
- `GET /api/events/query` - Get events filtered by category and date
- `GET /api/events/:id` - Get event details by ID
- `PUT /api/events/:id` - Update an event by ID (Admin only)
- `DELETE /api/events/:id` - Delete an event by ID (Admin only)
- `POST /api/events/:id/join` - Join an event by ID

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.io](https://socket.io/)
```

This `README.md` file provides an overview of the project, installation instructions, usage guidelines, API endpoints, and other relevant information. Adjust the content as needed to fit your specific project details.

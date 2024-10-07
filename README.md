# Refugee Shelter Application Backend

This repository contains the backend API for the Refugee Shelter application, a volunteer-driven project aimed at improving the process of managing bed and room assignments in a shelter for Ukrainian refugees.

## Overview

The backend is a Node.js application that provides the necessary APIs for managing room and bed allocations in real-time, tracking the number of people in the shelter, and recording the total number of individuals who have passed through since the shelter’s opening. It enables both HTTP and WebSocket communications to facilitate seamless interaction between the frontend and backend, allowing multiple volunteers to update and view shelter status in real-time.

This system helps volunteers to easily manage space allocation, as well as plan meals by providing an accurate count of people staying at the shelter at any given time.

## Technologies

- **Node.js**: Backend runtime environment.
- **Express.js**: For building the API.
- **Socket.IO**: For enabling real-time communication with the frontend.
- **MongoDB**: For storing shelter data.
- **Swagger**: For API documentation.
- **Deployment**: The backend is deployed on Render.

## Frontend

The frontend of this project is built with React and communicates with this backend through HTTP requests and WebSocket connections. The frontend repository can be found [here](https://github.com/jackavryashnik/hope-shelter-room-check).

## API Documentation

The Swagger documentation for the API can be accessed at `/api-docs` after running the backend. This provides detailed information on all available endpoints and their usage.

## Running the Project Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/jackavryashnik/hope-shelter-backend.git

2. Install dependencies:

   ```bash
   npm install

3. Set up environment variables:

   Create a .env file in the root directory and configure the necessary environment variables for your MongoDB connection and other settings.

4. Start the development server:

   ```bash
   npm start

5. The app will be available at http://localhost:5000.

## Deployment

The backend is deployed on Render. You can access the live backend API [here](hope-shelter-api.onrender.com/api/stats).

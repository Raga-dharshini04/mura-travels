🪷 MURA Travels

A full-stack South India tourism web application built with the MERN stack.

 ## Features
- Browse destinations across South India
- View upcoming curated trip plans
- Customer booking form with automated email confirmation
- JWT-secured admin dashboard
- Full CRUD for destinations and trip plans

## Tech Stack
MongoDB · Express.js · React · Vite · Node.js · JWT · Bcryptjs · Nodemailer · Tailwind CSS

## Setup

### Server
cd server
npm install
npm run dev

### Client
cd client
npm install
npm run dev

## Environment Variables
Create a `.env` file in `/server` with:
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_secret
ADMIN_EMAIL=your_gmail
ADMIN_PASSWORD=your_app_password
EMAIL_FROM=your_gmail

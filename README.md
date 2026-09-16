# MRN XPress Frontend

Frontend application for **MRN XPress**, a full-stack food delivery application developed as part of the Full Stack Web Development Capstone Project.

## Features

- Browse available restaurants
- Restaurant filtering, sorting and pagination
- View restaurant details and menu items
- Add menu items to the shopping cart
- Increase or decrease item quantities
- Remove individual items or clear the cart
- Review the order before checkout
- Checkout and order confirmation flow
- User registration and login
- JWT-based authentication
- User profile page
- Protected profile access for authenticated users
- Responsive navigation and interface
- Integration with the deployed MRN XPress backend API

## Technologies Used

- React
- Vite
- React Router
- React Bootstrap
- Bootstrap
- Axios
- JavaScript
- HTML
- CSS

## Live Application

The frontend is deployed on Render:

https://mrn-xpress-frontend.onrender.com

## Backend API

The application connects to the MRN XPress backend:

https://mrn-xpress-backend.onrender.com

Backend health check:

https://mrn-xpress-backend.onrender.com/health

## Application Flow

The main food-ordering flow is:

`Restaurants → Restaurant Details → Menu → Cart → Review Order → Checkout → Order Confirmation`

Users can also register, log in, view their profile and log out.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Production Build

Create a production build with:

```bash
npm run build
```

## Project

**MRN XPress – Food Delivery Application**

Full Stack Web Development Capstone Project

Frontend: React + Vite  
Backend: Node.js + Express  
Database: MongoDB
# E-commerce Website Test Task

This is a simple e-commerce website built with ReactJS for the frontend and NodeJS for the backend. The website allows users to view a list of products, add products to their cart, and place orders. User details are required to place an order.

## Features

### Frontend
1. **Product Listing Page**
   - Displays a grid of products.
   - Each product card includes:
     - Product image
     - Product name
     - Product description
     - Product price
     - "Add to Cart" button

2. **Cart Page**
   - Accessible via a "Cart" button in the header.
   - Displays products added to the cart with their names, prices, and a quantity field.
   - Calculates and displays the total price.
   - Includes a form to collect user details:
     - First name (required)
     - Last name (required)
     - Address (required)

3. **Order Placement**
   - "Place Order" button on the cart page.
   - Validates that the first name, last name, and address are provided before processing the order.
   - Displays a success message upon successful order placement.

### Backend
1. **Product Data API**
   - Endpoint to fetch a list of products.
   - Products include attributes: name, image, description, and price.
   - Product data stored in an in-memory array.

2. **Place Order API**
   - Endpoint to place an order.
   - Validates the first name, last name, and address in the request.
   - Simulates order placement by printing order details to the console.
   - Responds with a success message.

## Getting Started

### Prerequisites

- Node.js installed
- npm (Node Package Manager) installed

### Installation

1. Clone the repository:
2.Install dependencies for both Client and Server
cd Client
npm install
cd Server
npm install
To start the backend server, navigate to the Server directory and run:
npm run dev
To start the frontend development server, navigate to the Client directory and run:
npm start



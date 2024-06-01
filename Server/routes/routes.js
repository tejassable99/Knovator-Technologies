// backend/routes/products.js
const express = require('express');
const router = express.Router();
const products = require('../data/products.js');

// Get all products
router.get('/products', (req, res) => {
  res.json(products);
});

// Place an order
router.post('/order', (req, res) => {
    const { userDetails, cartItems } = req.body;
    const { firstName, lastName, address } = userDetails;
  
    if (!firstName || !lastName || !address ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    console.log('Order placed:', { userDetails, cartItems });
    res.status(200).json({ message: 'Order placed successfully' });
  });
  
module.exports = router;

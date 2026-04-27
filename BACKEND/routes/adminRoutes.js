const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  deleteUser, 
  getAllProductsAdmin, 
  deleteProductAdmin 
} = require('../controllers/adminController');

// User පාලනය
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Product පාලනය
router.get('/products', getAllProductsAdmin);
router.delete('/products/:id', deleteProductAdmin);

module.exports = router;
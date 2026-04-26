const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/add', addProduct);

//http://localhost:5000/api/products/update/2
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);



module.exports = router;
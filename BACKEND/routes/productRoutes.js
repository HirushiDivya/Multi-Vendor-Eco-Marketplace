const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getProductsBySeller } = require('../controllers/productController');


// නිශ්චිත Seller කෙනෙකුගේ බඩු බැලීමට (උදා: /api/products/seller/uuid-වැලියු-එක)

router.post('/add', addProduct);

//http://localhost:5000/api/products/update/2
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/seller/:sellerId', getProductsBySeller);



module.exports = router;
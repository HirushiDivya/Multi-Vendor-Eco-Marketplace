const supabase = require('../config/supabaseClient');

const addProduct = async (req, res) => {
  const { title, description, price, category, stock_quantity, seller_id } = req.body;

  // මෙතනදී 'products' කියන්නේ අපේ SQL Table එකේ නමයි
  const { data, error } = await supabase
    .from('products') 
    .insert([
      { 
        title, 
        description, 
        price, 
        category, 
        stock_quantity, 
        seller_id // මේක අනිවාර්යයෙන්ම Login එකෙන් ලැබුණු UUID එක වෙන්න ඕනේ
      }
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });

  res.status(201).json({ message: 'Product added!', data });
};


// 1. නිෂ්පාදනයක් යාවත්කාලීන කිරීම (Update Product)
const updateProduct = async (req, res) => {
  const { id } = req.params; // URL එකෙන් Product ID එක ලබාගනී
  const updates = req.body;  // වෙනස් කළ යුතු දත්ත Body එකෙන් ලබාගනී

  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id) // අදාළ ID එක ඇති නිෂ්පාදනය පමණක් තෝරාගනී
    .select();

  if (error) return res.status(400).json({ error: error.message });
  
  res.status(200).json({ message: 'Product updated successfully!', data });
};

// 2. නිෂ්පාදනයක් මකා දැමීම (Delete Product)
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Product deleted successfully!' });
};

// මේවා export කිරීමට අමතක කරන්න එපා
module.exports = { addProduct, updateProduct, deleteProduct };

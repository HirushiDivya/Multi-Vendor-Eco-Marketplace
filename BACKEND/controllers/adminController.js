const supabase = require('../config/supabaseClient');

// --- User Management ---

// 1. සියලුම Users ලා බැලීම
const getAllUsers = async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

// 2. User කෙනෙක්ව මකා දැමීම (Profile and Auth)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  // සටහන: මෙහිදී admin.deleteUser පාවිච්චි කරන්නේ Auth එකෙන් අයින් කරන්නයි
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'User deleted successfully from system!' });
};

// --- Product Management ---

// 3. සියලුම Products බැලීම (දැනටමත් productController හි තිබේ නම් එය මෙහිදීත් පාවිච්චි කළ හැක)
const getAllProductsAdmin = async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(full_name)'); // Seller ගේ නමත් එක්කම ගමු

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};

// 4. ඕනෑම Product එකක් මකා දැමීම
const deleteProductAdmin = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Product removed by Admin!' });
};

module.exports = { getAllUsers, deleteUser, getAllProductsAdmin, deleteProductAdmin };
const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabaseClient');

const app = express();

const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());




app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', productRoutes);
// සියලුම නිෂ්පාදන ලබා ගැනීම (Read Products)
app.get('/api/products', async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
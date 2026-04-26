const supabase = require('../config/supabaseClient');

// 1. User Register (ගිණුමක් සෑදීම)

const registerUser = async (req, res) => {
  const { email, password, full_name, role } = req.body;

  // 1. Auth User කෙනෙක් සෑදීම
  const { data, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role }
  });

  if (authError) return res.status(400).json({ error: authError.message });

  const userId = data.user.id;

  // 2. Profiles Table එකට එම විස්තරම ඇතුළත් කිරීම (වැදගත්ම පියවර)
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      { id: userId, full_name, role: role || 'buyer' }
    ]);

  if (profileError) return res.status(400).json({ error: profileError.message });

  res.status(201).json({ message: 'User and Profile created!', user: data.user });
};

// 2. User Login (පද්ධතියට ඇතුළු වීම)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  res.status(200).json({ message: 'Login Successful!', session: data.session });
};

module.exports = { registerUser, loginUser };
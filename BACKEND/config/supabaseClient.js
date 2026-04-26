/* const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
*/

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Admin Client එක (Auth සීමාවන් මඟහරින්න)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // මෙතනට අලුත් key එක දෙන්න
);

module.exports = supabaseAdmin;
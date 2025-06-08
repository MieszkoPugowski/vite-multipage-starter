import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qdvphbpepwevhonxmuil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdnBoYnBlcHdldmhvbnhtdWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTMzNTksImV4cCI6MjA2MzIyOTM1OX0.6xTffFPl2eeBgLGRtBccnE2zcjqxyzNh89d088G3xAU';

const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('error-msg');

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    errorMsg.textContent = 'Niepoprawny email lub hasło';
    errorMsg.classList.remove('hidden');
  } else {
    window.location.href = '../index.html';
  }
});
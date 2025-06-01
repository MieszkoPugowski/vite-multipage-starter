import { createClient } from '@supabase/supabase-js'

(async () => {
const supabaseUrl = 'https://lduhqenzaumaxqaufjlf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdWhxZW56YXVtYXhxYXVmamxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MDA3MjYsImV4cCI6MjA2MzE3NjcyNn0.i_CJ9JKHE2jOmDqZzuXESHBqUxbHxjJdGq-un_Hd0Ys';

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const { data } = await supabase.from('article').select();

console.log(data);
})();

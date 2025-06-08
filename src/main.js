import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qdvphbpepwevhonxmuil.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdnBoYnBlcHdldmhvbnhtdWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NTMzNTksImV4cCI6MjA2MzIyOTM1OX0.6xTffFPl2eeBgLGRtBccnE2zcjqxyzNh89d088G3xAU';
const supabase = createClient(supabaseUrl, supabaseKey);

let currentUser = null;

async function checkUser() {
  const { data } = await supabase.auth.getSession();
  currentUser = data.session?.user ?? null;

  const logoutBtn = document.getElementById('logout-btn');
  if (currentUser) {
    logoutBtn.classList.remove('hidden');
  } else {
    logoutBtn.classList.add('hidden');
  }

  const loginBtn = document.getElementById('login-btn');
  if (currentUser) {
    loginBtn.classList.add('hidden');
  } else {
    loginBtn.classList.remove('hidden');
  }

  const addBtn = document.getElementById('add-article-btn');
  if (currentUser) {
    addBtn.classList.remove('hidden');
  } else {
    addBtn.classList.add('hidden');
  }
}

async function displayArticles() {
  const container = document.getElementById('articles-container');
  const sortSelect = document.getElementById('sort-select');
  const sortValue = sortSelect ? sortSelect.value : 'created_at.desc';
  const [column, direction] = sortValue.split('.');

  const { data: articles, error } = await supabase
    .from('article')
    .select('*')
    .order(column, { ascending: direction === 'asc' });

  container.innerHTML = articles.map(article => `
    <div class="bg-white p-4 rounded shadow">
      <h3 class="text-lg font-bold">${article.title}</h3>
      <p class="italic">${article.subtitle}</p>
      <p class="text-sm">Autor: ${article.author}</p>
      <p class="text-sm">Data: ${article.created_at}</p>
      <p class="mt-2">${article.content}</p>
      ${currentUser ? `
        <div class="mt-2 space-x-2">
          <button class="edit-btn bg-yellow-400 px-2 py-1 rounded" data-id="${article.id}">Edytuj</button>
          <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded" data-id="${article.id}">Usuń</button>
        </div>` : ''}
    </div>
  `).join('');

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.id));
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      await supabase.from('article').delete().eq('id', btn.dataset.id);
      displayArticles();
    });
  });
}

function openModal(id = null) {
  const modal = document.getElementById('modal');
  const form = document.getElementById('article-form');
  document.getElementById('modal-title').textContent = id ? 'Edytuj artykuł' : 'Nowy artykuł';

  if (id) {
    supabase.from('article').select('*').eq('id', id).single().then(({ data }) => {
      form.title.value = data.title;
      form.subtitle.value = data.subtitle;
      form.author.value = data.author;
      form.content.value = data.content;
      form['article-id'].value = id;
    });
  } else {
    form.reset();
    form['article-id'].value = '';
  }

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', async () => {
  await checkUser();
  await displayArticles();

  document.getElementById('sort-select').addEventListener('change', displayArticles);

  document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = `${import.meta.env.BASE_URL}login/index.html`;
});

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload();
  });

  document.getElementById('add-article-btn').addEventListener('click', () => openModal());

  document.getElementById('cancel-btn').addEventListener('click', () => closeModal());

  document.getElementById('article-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const subtitle = form.subtitle.value;
    const author = form.author.value;
    const content = form.content.value;
    const id = form['article-id'].value;

    const payload = {
      title,
      subtitle,
      author,
      content,
      created_at: new Date().toISOString(),
    };

    if (id) {
      await supabase.from('article').update(payload).eq('id', id);
    } else {
      await supabase.from('article').insert([payload]);
    }

    closeModal();
    displayArticles();
  });
});

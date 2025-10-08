// Получить и отсортировать посты по длине title
async function getPostsByTitleLen() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!resp.ok) throw new Error('Статус ' + resp.status);
  const arr = await resp.json();
  return arr.slice().sort((a, b) => b.title.length - a.title.length);
}

async function printPostsByTitleLen() {
  try {
    const sorted = await getPostsByTitleLen();
    console.log('Посты, отсортированные по длине title:', sorted);
  } catch (err) {
    console.error('Ошибка при получении постов:', err);
  }
}

printPostsByTitleLen();


// Получить и отсортировать комментарии по email
async function getCommentsByEmail() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/comments');
  if (!resp.ok) throw new Error('Статус ' + resp.status);
  const list = await resp.json();
  return list.slice().sort((x, y) => x.email.localeCompare(y.email));
}

async function printCommentsByEmail() {
  try {
    const sorted = await getCommentsByEmail();
    console.log('Комментарии, отсортированные по email:', sorted);
  } catch (err) {
    console.error('Ошибка при получении комментариев:', err);
  }
}

printCommentsByEmail();


// Взять пользователей и оставить нужные поля
function getUsersShort() {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(r => {
      if (!r.ok) throw new Error('Статус ' + r.status);
      return r.json();
    })
    .then(users => users.map(u => ({
      id: u.id,
      name: u.name,
      nick: u.username,
      mail: u.email,
      phone: u.phone
    })));
}

getUsersShort()
  .then(list => console.log('Отфильтрованные пользователи:', list))
  .catch(err => console.error('Ошибка при получении пользователей:', err));


// Взять только невыполненные задачи
function getPendingTodos() {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(r => {
      if (!r.ok) throw new Error('Статус ' + r.status);
      return r.json();
    })
    .then(all => all.filter(t => t.completed === false));
}

getPendingTodos()
  .then(open => {
    console.log('Невыполненные задачи:', open);
    console.log('Найдено ' + open.length + ' невыполненных задач');
  })
  .catch(err => console.error('Ошибка при получении задач:', err));


// Callback: загрузить посты и отсортировать по длине title
function fetchPostsCb(cb) {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(r => r.json())
    .then(data => cb(null, data))
    .catch(e => cb(e));
}

function onPostsLoaded(err, data) {
  if (err) {
    console.error('Ошибка загрузки постов:', err);
    return;
  }
  const sorted = data.slice().sort((p1, p2) => p2.title.length - p1.title.length);
  console.log('Посты (callback), отсортированные по длине title:', sorted);
}

fetchPostsCb(onPostsLoaded);


// Callback: загрузить комментарии и отсортировать по email
function fetchCommentsCb(cb) {
  fetch('https://jsonplaceholder.typicode.com/comments')
    .then(r => r.json())
    .then(items => cb(null, items))
    .catch(e => cb(e));
}

function onCommentsLoaded(err, items) {
  if (err) {
    console.error('Ошибка загрузки комментариев:', err);
    return;
  }
  const sorted = items.slice().sort((a, b) => a.email.localeCompare(b.email));
  console.log('Комментарии (callback), отсортированные по email:', sorted);
}

fetchCommentsCb(onCommentsLoaded);

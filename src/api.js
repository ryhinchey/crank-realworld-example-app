const API_ROOT = 'https://conduit.productionready.io/api';

let token;
const getHeaders = (headers = {}) => {
  if (token) {
    return {
      ...headers,
      Authorization: `Token ${token}`
    }
  }

  return headers;
}

const getResponseJson = res => res.json();

const requests = {
  delete: url =>
    fetch(`${API_ROOT}${url}`, { method: 'DELETE', headers: getHeaders() }).then(getResponseJson),
  get: url =>
   fetch(`${API_ROOT}${url}`, { method: 'GET', headers: getHeaders()}).then(getResponseJson),
  put: (url, body) =>
    fetch(`${API_ROOT}${url}`, {method: 'PUT', headers: getHeaders(), body: JSON.stringify(body)}).then(getResponseJson),
  post: (url, body) =>
    fetch(`${API_ROOT}${url}`, {method: 'POST',headers: getHeaders(), body: JSON.stringify(body)}).then(getResponseJson)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  all: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encodeURIComponent(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encodeURIComponent(tag)}&${limit(10, page)}`),
  delete: slug =>
    requests.delete(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encodeURIComponent(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.delete(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.delete(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.delete(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: _token => { token = token }
};

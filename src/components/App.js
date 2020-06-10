import { Router, Route, routeTo } from './Router';
import Header from './Header';
import Home from './Home';
import Article from './Article';
import Login from './Login';
import Register from './Register';
import api from '../api';
import { Link } from './Router';
import Suspense from './Suspense';
import { setAuthToken, getAuthToken } from '../local-storage';

function NotFound() {
  return (
    <main class="container page">
      <h1>🔍 we can't find that page</h1>
      <Link href="/">Click here to go home</Link>
    </main>
  )
}

async function *App() {
  const handleAuthentication = (e) => {
    const authResponse = e.detail.authResponse;
    setAuthToken(authResponse.user.token)
    routeTo('/');
    this.refresh();
  }

  this.addEventListener('login', handleAuthentication);
  this.addEventListener('register', handleAuthentication);

  for await (const _ of this) {
    const token = getAuthToken();
    if (token && !this.get('currentUser')) {
      const data = await api.Auth.current();
      const currentUser = data.user;
      this.set('currentUser', currentUser);
    }
    yield (
      <Router>
        <Header />
        <Route path="/"><Home/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/article/:id">
          <Suspense><Article/></Suspense>
        </Route>
        <Route default>
          <NotFound/>
        </Route>
      </Router>
    )
  }
}

export default App;

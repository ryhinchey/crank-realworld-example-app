import { Fragment } from '@bikeshaving/crank';
import { Link } from './Router';

function LoggedOutView({ currentUser }) {
  if (!currentUser) {
    return (
      <Fragment>
        <li class="nav-item">
          <Link href="/login" class="nav-a">
            Sign in
          </Link>
        </li>

        <li class="nav-item">
          <Link href="/register" class="nav-a">
            Sign up
          </Link>
        </li>
      </Fragment>
    );
  }
  return null;
};

function LoggedInView({ currentUser }) {
  if (currentUser) {
    return (
      <Fragment>
        <li class="nav-item">
          <Link href="/editor" class="nav-a">
            <i class="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li class="nav-item">
          <Link href="/settings" class="nav-a">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li class="nav-item">
          <Link
            href={`/@${currentUser.username}`}
            class="nav-a">
            {currentUser.username}
          </Link>
        </li>
      </Fragment>
    );
  }
  return null;
};

function Header() {
  const currentUser = this.get('currentUser');
  return (
    <nav class="navbar navbar-light">
      <div class="container">
        <Link href="/" class="navbar-brand">Conduit</Link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <Link href="/" class="nav-a">
              Home
            </Link>
          </li>
          <LoggedOutView currentUser={currentUser} />
          <LoggedInView currentUser={currentUser} />
        </ul>
      </div>
    </nav>
  );
}

export default Header;

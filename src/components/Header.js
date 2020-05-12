import {createElement} from '@bikeshaving/crank';
import { RouterSymbol, Router } from './Router';
import { Link } from './Router';

function LoggedOutView(props) {
  if (!props.currentUser) {
    return (
      <ul class="nav navbar-nav pull-xs-right">

        <li class="nav-item">
          <Link href="/" class="nav-a">
            Home
          </Link>
        </li>

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

      </ul>
    );
  }
  return null;
};

function LoggedInView(props) {
  if (props.currentUser) {
    return (
      <ul class="nav navbar-nav pull-xs-right">

        <li class="nav-item">
          <Link href="/" class="nav-a">
            Home
          </Link>
        </li>

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
            href={`/@${props.currentUser.username}`}
            class="nav-a">
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
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
        <LoggedOutView currentUser={currentUser} />
        <LoggedInView currentUser={currentUser} />
      </div>
    </nav>
  );
}

export default Header;
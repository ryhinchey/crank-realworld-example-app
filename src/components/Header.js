import {createElement} from '@bikeshaving/crank';
import { Link } from './Router';

const LoggedOutView = props => {
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

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul class="nav navbar-nav pull-xs-right">

        <li class="nav-item">
          <Link href="/" class="nav-a">
            Home
          </Link>
        </li>

        <li class="nav-item">
          <Link href="/edihrefr" class="nav-a">
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
            <img src={props.currentUser.image} class="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

const Header = (props) => (
  <nav class="navbar navbar-light">
    <div class="container">
      <Link href="/" class="navbar-brand">Conduit</Link>
      <LoggedOutView currentUser={props.currentUser} />
      <LoggedInView currentUser={props.currentUser} />
    </div>
  </nav>
);

export default Header;
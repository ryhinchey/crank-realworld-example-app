import {createElement} from '@bikeshaving/crank';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul class="nav navbar-nav pull-xs-right">

        <li class="nav-item">
          <a href="/" class="nav-a">
            Home
          </a>
        </li>

        <li class="nav-item">
          <a href="/login" class="nav-a">
            Sign in
          </a>
        </li>

        <li class="nav-item">
          <a href="/register" class="nav-a">
            Sign up
          </a>
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
          <a href="/" class="nav-a">
            Home
          </a>
        </li>

        <li class="nav-item">
          <a href="/edihrefr" class="nav-a">
            <i class="ion-compose"></i>&nbsp;New Post
          </a>
        </li>

        <li class="nav-item">
          <a href="/settings" class="nav-a">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>

        <li class="nav-item">
          <a
            href={`/@${props.currentUser.username}`}
            class="nav-a">
            <img src={props.currentUser.image} class="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </a>
        </li>

      </ul>
    );
  }

  return null;
};

const Header = (props) => (
  <nav class="navbar navbar-light">
    <div class="container">
      <a href="/" class="navbar-brand">Conduit</a>
      <LoggedOutView currentUser={props.currentUser} />
      <LoggedInView currentUser={props.currentUser} />
    </div>
  </nav>
);

export default Header;
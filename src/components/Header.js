import {createElement} from '@bikeshaving/crank';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <a href="/" className="nav-a">
            Home
          </a>
        </li>

        <li className="nav-item">
          <a href="/login" className="nav-a">
            Sign in
          </a>
        </li>

        <li className="nav-item">
          <a href="/register" className="nav-a">
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
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <a href="/" className="nav-a">
            Home
          </a>
        </li>

        <li className="nav-item">
          <a href="/edihrefr" className="nav-a">
            <i className="ion-compose"></i>&nbsp;New Post
          </a>
        </li>

        <li className="nav-item">
          <a href="/settings" className="nav-a">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </a>
        </li>

        <li className="nav-item">
          <a
            href={`/@${props.currentUser.username}`}
            className="nav-a">
            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
            {props.currentUser.username}
          </a>
        </li>

      </ul>
    );
  }

  return null;
};

const Header = (props) => (
  <nav className="navbar navbar-light">
    <div className="container">
      <a href="/" className="navbar-brand">Conduit</a>
      <LoggedOutView currentUser={props.currentUser} />
      <LoggedInView currentUser={props.currentUser} />
    </div>
  </nav>
);

export default Header;
import { createElement } from '@bikeshaving/crank';
import { Link } from './Router';
import api from '../api';


function* Login() {
  let inProgress = false;
  let email = '';
  let password = '';

  const onEmailChange = e => {
    email = e.target.value;
  }

  const onPasswordChange= e => {
    password = e.target.value;
  }

  const onSubmit = e => {
    e.preventDefault();
    console.log(email, password)
  }

  while (true) {
    yield (
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign In</h1>
              <p class="text-xs-center">
                <Link href="/register">
                  Need an account?
                </Link>
              </p>
              {/* <ListErrors errors={this.props.errors} /> */}
              <form onsubmit={onSubmit}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      oninput={onEmailChange}
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      oninput={onPasswordChange}
                    />
                  </fieldset>
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}>
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
export default Login;
import { Link, routeTo } from './Router';
import ListErrors from './ListErrors';
import api from '../api';

function* Register() {
  let inProgress = false;
  let formData = {
    email: '',
    password: '',
    username: ''
  }
  let errors;

  const changeFormData = (type, value) => {
    formData[type] = value;
    this.refresh();
  }

  const submitForm = async e => {
    e.preventDefault();

    inProgress = true;
    this.refresh();

    const { username, email, password } = formData;
    const authResponse = await api.Auth.register(username, email, password);

    if (authResponse.errors) {
      errors = authResponse.errors;
      formData = { email: '', password: '', username: ''}
      inProgress = false;
      return this.refresh();
    }

    this.dispatchEvent(new CustomEvent('register', { bubbles: true, detail: { authResponse } }))
  }

  while (true) {
    yield (
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign Up</h1>
              <p class="text-xs-center">
                <Link href="/login">
                  Have an account?
                </Link>
              </p>
              <ListErrors errors={errors} />
              <form onsubmit={submitForm}>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={formData.username}
                      oninput={e => changeFormData('username', e.target.value)} />
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      oninput={e => changeFormData('email', e.target.value)} />
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      oninput={e => changeFormData('password', e.target.value)} />
                  </fieldset>

                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}>
                    Sign up
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

export default Register;

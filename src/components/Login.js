import { Link } from './Router';
import ListErrors from './ListErrors';
import api from '../api';

function LoginForm({onSubmit, changeFormData, formData, inProgress, errors}) {
  return (
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
            <ListErrors errors={errors} />
            <form onsubmit={onSubmit}>
              <fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    oninput={e => changeFormData('email', e.target.value)}
                    value={formData.email}
                  />
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    oninput={e => changeFormData('password', e.target.value)}
                    value={formData.password}
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

const initialFormData = {
  email: '',
  password: ''
};

function* Login() {
  let inProgress = false;
  let formData = initialFormData;
  let errors;

  const changeFormData = (type, value) => {
    formData[type] = value;
  }

  const onSubmit = async e => {
    e.preventDefault();

    inProgress = true;
    this.refresh();

    const authResponse = await api.Auth.login(formData.email, formData.password);

    if (authResponse.errors) {
      errors = authResponse.errors;
      formData = initialFormData;
      inProgress = false;
      return this.refresh();
    }

    this.dispatchEvent(new CustomEvent('login', { bubbles: true, detail: { authResponse } }))
  }

  while (true) {
    yield (
      <LoginForm
        onSubmit={onSubmit}
        errors={errors}
        changeFormData={changeFormData}
        formData={formData}
        inProgress={inProgress}
      />
    );
  }
}
export default Login;

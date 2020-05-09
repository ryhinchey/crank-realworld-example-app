import {createElement, Fragment} from '@bikeshaving/crank';
import { Router, Link, Route } from './Router';
import Header from './Header';
import Home from './Home';

function App() {
  return (
    <Fragment>
      <Header />
      <Router>
        <Route path="/">
          <Home/>
        </Route>
      </Router>
    </Fragment>
  )
}

export default App;
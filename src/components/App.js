import {createElement, Fragment} from '@bikeshaving/crank';
import { Router, Link, Route } from './Router';
import Header from './Header';
import Home from './Home';
import Article from './Article';
import Login from './Login';

function App() {
  return (
    <Fragment>
      <Router>
        <Header />
        <Route path="/"><Home/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/article/:id"><Article/></Route>
      </Router>
    </Fragment>
  )
}

export default App;
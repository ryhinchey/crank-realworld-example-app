import {createElement} from "@bikeshaving/crank";
import { createBrowserHistory } from 'history';
import { pathToRegexp, match } from "path-to-regexp";


const history = createBrowserHistory();

export function Link({to, children, ...props}) {
  const onclick = (e) => {
    e.preventDefault();
    history.push(to);
  };

  return <a onclick={onclick} href={to} {...props}>{children}</a>
}

export function *Router({children}) {
  this.set('route', {pathname: history.location.pathname});
  let unlisten;

  try {
    unlisten = history.listen((location) => {
      this.set('route', {pathname: location.pathname});
      this.refresh();
    });

    while(true) {
      yield children; 
    }
  } finally {
    unlisten();
  }
}

export function Route({children, path}) {
  const pathname = this.get('route').pathname;
  const pathRegex = pathToRegexp(path);
  const shouldRender = pathRegex.exec(pathname);

  if (!shouldRender) {
    return null;
  }

  const paramsMatcher = match(path);
  const params = paramsMatcher(pathname);
  this.set('route', {pathname, params: params });
  return children;
}

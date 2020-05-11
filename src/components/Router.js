import {createElement} from "@bikeshaving/crank";
import { createBrowserHistory } from 'history';
import { pathToRegexp, match } from "path-to-regexp";


const history = createBrowserHistory();
export const RouterContext = Symbol('crank-router-context');

export function Link({href, children, ...props}) {
  const onclick = (e) => {
    e.preventDefault();
    history.push(href);
  };

  return <a onclick={onclick} href={href} {...props}>{children}</a>
}

export function *Router({children}) {
  this.set(RouterContext, {pathname: history.location.pathname});
  let unlisten;

  try {
    unlisten = history.listen((location) => {
      this.set(RouterContext, {pathname: location.pathname});
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
  const pathname = this.get(RouterContext).pathname;
  const pathRegex = pathToRegexp(path);
  const shouldRender = pathRegex.exec(pathname);

  if (!shouldRender) {
    return null;
  }

  const paramsMatcher = match(path);
  const {params} = paramsMatcher(pathname);
  this.set(RouterContext, {pathname, params });
  return children;
}

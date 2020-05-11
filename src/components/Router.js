import {createElement, Context} from "@bikeshaving/crank";
import { pathToRegexp, match } from "path-to-regexp";

export const RouterSymbol = Symbol();
const routeChangeEvent = 'crankroutechangeevent';

const context = new Context();

export function routeTo(href) {
  context.dispatchEvent(new CustomEvent(routeChangeEvent, {bubbles: true, detail: { href }}));
}

export function Link({href, children, ...props}) {
  const onclick = (e) => {
    e.preventDefault();
    routeTo(href);
  };

  return <a onclick={onclick} href={href} {...props}>{children}</a>
}

export function *Router({children}) {
  this.set(RouterSymbol, {pathname: document.location.pathname});

  window.addEventListener('popstate', e => {
    this.set(RouterSymbol, {pathname: document.location.pathname});
    this.refresh(); 
  })
  
  context.addEventListener(routeChangeEvent, e => {
    history.pushState(null, null, e.detail.href);
    this.set(RouterSymbol, {pathname: e.detail.href});
    this.refresh();
  });

  while(true) {
    yield children; 
  }
}

export function Route({children, path}) {
  const pathname = this.get(RouterSymbol).pathname;
  const pathRegex = pathToRegexp(path);
  const shouldRender = pathRegex.exec(pathname);

  if (!shouldRender) {
    return null;
  }

  const paramsMatcher = match(path);
  const {params} = paramsMatcher(pathname);
  this.set(RouterSymbol, {pathname, params });
  return children;
}

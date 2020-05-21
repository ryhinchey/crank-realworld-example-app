import { createElement, Context } from "@bikeshaving/crank";
import { pathToRegexp, match } from "path-to-regexp";

export const RouteData = Symbol();
const routeChangeEvent = 'crankroutechange';

const context = new Context();

export function routeTo(href) {
  context.dispatchEvent(new CustomEvent(routeChangeEvent, { bubbles: true, detail: { href } }));
}

export function Link({ href, children, class: className, ...props }) {
  const onclick = (e) => {
    e.preventDefault();
    routeTo(href);
  };

  const activePath = this.get(RouteData).pathname;
  const activeClass = activePath === href ? 'active' : '';
  return <a class={`${className} ${activeClass}`} onclick={onclick} href={href} {...props}>{children}</a>
}

export function* Router() {
  let pathname = document.location.pathname;

  window.addEventListener('popstate', e => {
    pathname = document.location.pathname;
    this.refresh();
  })

  context.addEventListener(routeChangeEvent, e => {
    history.pushState(null, null, e.detail.href);
    pathname = e.detail.href;
    this.refresh();
  });

  for (let { children } of this) {
    if (!children) {
      yield null;
    }
   
    if (!Array.isArray(children)) children = [children];
    
    this.set(RouteData, { pathname });
    this.set('routerMatch', false);
    
    for (let child of children) {
      if (child.tag && child.tag === Route && !child.props.default) {
        const pathRegex = pathToRegexp(child.props.path);
        const shouldRender = pathRegex.exec(pathname);
        if (shouldRender) {
          this.set('routerMatch', true);
          break;
        }
      }
    }
    yield children;
  }
}

export function Route({ children, path = '', ...props }) {
  const routeData = this.get(RouteData);
  const routerMatch = this.get('routerMatch');
  const pathname = routeData.pathname;
  const pathRegex = pathToRegexp(path);
  const shouldRender = pathRegex.exec(pathname);

  if (props.default && !routerMatch) {
    return children;
  }

  if (!shouldRender || props.default) {
    return null;
  }

  const paramsMatcher = match(path);
  const { params } = paramsMatcher(pathname);
  this.set(RouteData, { ...routeData, params });

  return children;
}
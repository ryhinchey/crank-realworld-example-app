import { createElement } from '@bikeshaving/crank';

async function Fallback({timeout = 0, children}) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
  return children;
}

export default async function *Suspense({timeout, fallback, children}) {
  for await ({timeout, fallback, children} of this) {
    yield <Fallback timeout={timeout}>{fallback}</Fallback>;
    yield children; 
  }
}
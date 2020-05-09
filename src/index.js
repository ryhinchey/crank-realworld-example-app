import { createElement } from '@bikeshaving/crank';
import { renderer } from '@bikeshaving/crank/dom';

import App from './components/App';

renderer.render(<App />, document.getElementById('root'));
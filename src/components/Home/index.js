import { createElement } from '@bikeshaving/crank';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import Suspense from '../Suspense';

function Home() {  
  return (
    <div class="home-page">
      <Banner />
      <main class="container page">
        <div class="row">
          <MainView  />
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              <Suspense fallback={<div>Loading Tags...</div>} timeout={300}>
                <Tags />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;
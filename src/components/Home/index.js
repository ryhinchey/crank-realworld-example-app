import { createElement } from '@bikeshaving/crank';
import Banner from './Banner';
import MainView from './MainView';
import api from '../../api';


async function Home() {
  const {articles} = await api.Articles.all();
  
  return (
    <div class="home-page">
      <Banner />
      <main class="container page">
        <div class="row">
          <MainView articles={articles} />
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>
              {/* <Tags
              tags={this.props.tags}
              onClickTag={this.props.onClickTag} /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;
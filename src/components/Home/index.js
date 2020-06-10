import Banner from './Banner';
import MainView from './MainView';
import Suspense from '../Suspense';

function Home() {
  return (
    <div class="home-page">
      <Banner />
      <main class="container page">
        <div class="row">
          <MainView  />
        </div>
      </main>
    </div>
  )
}

export default Home;

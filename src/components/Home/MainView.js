import { RouteData } from '../Router';
import ArticleList from '../ArticleList';
import Suspense from '../Suspense';

function GlobalFeedTab(props) {
  return (
    <li class="nav-item">
      <button
        class={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
      >
        Global Feed
      </button>
    </li>
  );
};

function TagFilterTab(props) {
  if (!props.tag) {
    return null;
  }

  return (
    <li class="nav-item">
      <button class="nav-link active">
        <i class="ion-pound"></i> {props.tag}
      </button>
    </li>
  );
};

function YourFeedTab({currentUser, activeTab}) {
  if (currentUser) {
    return (
      <li class="nav-item">
        <button class={ activeTab === 'feed' ? 'nav-link active' : 'nav-link' }>
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

function MainView(props) {
  const currentUser = this.get('currentUser');
  return (
    <div class="col-md-9">
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          <YourFeedTab currentUser={currentUser} />
          <GlobalFeedTab />
          <TagFilterTab />
        </ul>
      </div>
      <Suspense fallback={<div class="article-preview">Loading...</div>} timeout={200}>
        <ArticleList />
      </Suspense>
    </div>
  );
};

export default MainView;

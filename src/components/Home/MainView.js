import { Fragment, Copy } from '@bikeshaving/crank';
import api from '../../api';
import ArticleList from '../ArticleList';
import Suspense from '../Suspense';

function GlobalFeedTab({ setArticlesFor, articlesFor }) {
  return (
    <li class="nav-item">
      <button
        onclick={() => setArticlesFor('all')}
        class={articlesFor === 'all' ? 'nav-link active' : 'nav-link'}
      >
        Global Feed
      </button>
    </li>
  );
};

function TagFilterTab({ articlesFor}) {
  if (articlesFor === 'all' || articlesFor == 'feed') {
    return null;
  }

  return (
    <li class="nav-item">
      <button class='nav-link active'>
        <i class="ion-pound"></i> {articlesFor}
      </button>
    </li>
  );
};

function YourFeedTab({ setArticlesFor, currentUser, articlesFor }) {
  if (currentUser) {
    return (
      <li class="nav-item">
        <button
          onclick={() => setArticlesFor('feed')}
          class={articlesFor === 'feed' ? 'nav-link active' : 'nav-link'}
        >
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};


function Tags({tags, setArticlesFor}) {
  return (
    <div class="tag-list">
      {tags.map(tag => <Tag onClick={() => setArticlesFor(tag)} tag={tag} />)}
    </div>
  )
}

function Tag({ tag, onClick }) {
  return (
    <button onclick={onClick} class="tag-default tag-pill" key={tag}>
      {tag}
    </button>
  )
}

async function* MainView() {
  const currentUser = this.get('currentUser');
  let articlesFor = 'all';

  const setArticlesFor = tab => {
    articlesFor = tab;
    this.refresh();
  }

  const { tags } = await api.Tags.all();

  for await (let _ of this) {
    yield (
      <Fragment>
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <YourFeedTab setArticlesFor={setArticlesFor} articlesFor={articlesFor} currentUser={currentUser} />
              <GlobalFeedTab setArticlesFor={setArticlesFor} articlesFor={articlesFor} />
              <TagFilterTab articlesFor={articlesFor} />
            </ul>
          </div>
          <Suspense fallback={<div class="article-preview">Loading...</div>} timeout={200}>
            <ArticleList articlesFor={articlesFor} />
          </Suspense>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <Tags tags={tags} setArticlesFor={setArticlesFor} />
          </div>
        </div>
      </Fragment>
    )
  }
};

export default MainView;

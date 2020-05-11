import { createElement } from '@bikeshaving/crank';
import ArticleList from '../ArticleList';

const GlobalFeedTab = props => {
  return (
    <li class="nav-item">
      <a
        href=""
        class={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
      >
        Global Feed
      </a>
    </li>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li class="nav-item">
      <a href="" class="nav-link active">
        <i class="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};


const MainView = () => {
  return (
    <div class="col-md-9">
      <div class="feed-toggle">
        <ul class="nav nav-pills outline-active">
          <GlobalFeedTab />
          <TagFilterTab />
        </ul>
      </div>

      <ArticleList />
    </div>
  );
};

export default MainView;
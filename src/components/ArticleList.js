import { createElement, Fragment } from '@bikeshaving/crank';
import ArticlePreview from './ArticlePreview';
import api from '../api';

const ListPagination = ({setPage, articlesCount, currentPage}) => {
  if (articlesCount <= 10) {
    return null;
  }

  let range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {range.map(v => {
          const isCurrent = v === currentPage;
          return (
            <li class={ isCurrent ? 'page-item active' : 'page-item' }>
              <button
                class="page-link"
                onclick={() => setPage(v)}
                crank-key={v.toString()}>
                {v + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};


function withPagination(Component) {
  return function *(props) {
    let page = 0;

    const setPage = p => {
      page = p;
      this.refresh();
    };

    while (true) (
      yield <Component {...props} page={page} setPage={setPage} />
    )
  }
}

async function *ArticleList({page, setPage}) {
  for await ({page, setPage} of this) {
    const { articles, articlesCount} = await api.Articles.all(page);

    if (articles.length === 0) {
      yield (
        <div class="article-preview">
          No articles are here... yet.
        </div>
      );
    }

    yield (
      <Fragment>
        {articles.map(article => (
          <ArticlePreview article={article} key={article.slug} />
        ))}
        <ListPagination setPage={setPage} currentPage={page} articlesCount={articlesCount} />
      </Fragment>
    )
  }
}

export default withPagination(ArticleList);
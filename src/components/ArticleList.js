import { createElement } from '@bikeshaving/crank';
import ArticlePreview from './ArticlePreview';

const ArticleList = ({articles}) => {
  if (!articles) {
    return (
      <div class="article-preview">Loading...</div>
    );
  }

  if (articles.length === 0) {
    return (
      <div class="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }
    </div>
  );
};

export default ArticleList;
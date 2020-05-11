import { createElement } from '@bikeshaving/crank';
import ArticlePreview from './ArticlePreview';
import api from '../api';

async function ArticleList() {
  const { articles } = await api.Articles.all();
  if (articles.length === 0) {
    return (
      <div class="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {articles.map(article => (
        <ArticlePreview article={article} key={article.slug} />
      ))}
    </div>
  )
}

export default ArticleList;
import { createElement } from '@bikeshaving/crank';
import ArticlePreview from './ArticlePreview';
import api from '../api';

async function *ArticleList() {

  for await (const _ of this) {
    yield <div class="article-preview">Loading...</div>;
    
    const { articles } = await api.Articles.all();

    if (articles.length === 0) {
      return (
        <div class="article-preview">
          No articles are here... yet.
        </div>
      );
    }
    
    yield (
      <div>
      {
        articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }
    </div>
    )
  }
};

export default ArticleList;
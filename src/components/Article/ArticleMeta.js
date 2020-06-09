import ArticleActions from './ArticleActions';
import { Link } from '../Router';

function ArticleMeta({article, canModify}) {
  return (
    <div class="article-meta">
      <Link href={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div class="info">
        <Link href={`/@${article.author.username}`} class="author">
          {article.author.username}
        </Link>
        <span class="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;

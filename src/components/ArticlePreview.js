import { createElement } from '@bikeshaving/crank';
import { Link } from './Router';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const ArticlePreview = ({article}) => {
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  return (
    <div class="article-preview">
      <div class="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div class="info">
          <Link class="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span class="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div class="pull-xs-right">
          <button class={favoriteButtonClass}>
            <i class="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li class="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default ArticlePreview;
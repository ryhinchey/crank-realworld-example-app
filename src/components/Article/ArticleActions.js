import { Link } from '../Router';
import api from '../../api';


function ArticleActions(props) {
  const article = props.article;
  const del = () => {
    api.Articles.delete(article.slug)
  };

  if (props.canModify) {
    return (
      <span>

        <Link
          href={`/editor/${article.slug}`}
          class="btn btn-outline-secondary btn-sm">
          <i class="ion-edit"></i> Edit Article
        </Link>

        <button class="btn btn-outline-danger btn-sm" onclick={del}>
          <i class="ion-trash-a"></i> Delete Article
        </button>

      </span>
    );
  }

  return null;
};

export default ArticleActions;

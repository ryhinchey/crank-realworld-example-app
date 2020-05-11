
import { createElement, Raw } from '@bikeshaving/crank';
import ArticleMeta from './ArticleMeta';
import { RouterContext } from '../Router';
// import CommentContainer from './CommentContainer';
import api from '../../api';
import marked from 'marked';


async function Article() {
  const route = this.get(RouterContext);
  const currentUser = this.get('currenUser');
  const {article} = await api.Articles.get(route.params.id);
  // const comments = await api.Comments.forArticle(route.params.id);

  //TODO: handle error case of getting invalid article
  if (!article) {
    return null;
  }

  const markup = { __html: marked(article.body, { sanitize: true }) };

  const canModify = currentUser &&
    currentUser.username === article.author.username;

  return (
    <div class="article-page">
      <div class="banner">
        <div class="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} canModify={canModify} />
        </div>
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <Raw value={markup.__html} />
            {/* <ul class="tag-list">
              {article.tagList.map(tag => (
                <li
                  class="tag-default tag-pill tag-outline"
                  key={tag}>
                  {tag}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
        <hr />
        <div class="article-actions" />
        <div class="row">
          {/* <CommentContainer
            comments={comments || []}
            //errors={commentErrors}
            slug={route.params.id}
            currentUser={currentUser} /> */}
        </div>
      </div>
    </div>
  );
}

export default Article;
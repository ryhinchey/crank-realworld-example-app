import { createElement } from '@bikeshaving/crank';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import { Link } from '../Router';

const CommentContainer = ({currentUser, comments, slug }) => {
  if (currentUser) {
    return (
      <div class="col-xs-12 col-md-8 offset-md-2">
        <div>
          {/* <list-errors errors={props.errors}></list-errors> */}
          <CommentInput slug={slug} currentUser={currentUser} />
        </div>

        <CommentList
          comments={comments}
          slug={slug}
          currentUser={currentUser} />
      </div>
    );
  } else {
    return (
      <div class="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          comments={comments}
          slug={slug}
          currentUser={currentUser} />
      </div>
    );
  }
};

export default CommentContainer;

import api from '../../api';

function *CommentInput({slug}) {
  let body = '';

  const setBody = ev => {
    body = ev.target.value;
    this.refresh();
  };

  const createComment = async ev => {
    ev.preventDefault();
    await api.Comments.create(slug, { body });
    body = '';
    this.refresh();
  }

  while (true) {
    yield (
      <form class="card comment-form" onsubmit={createComment}>
        <div class="card-block">
          <textarea class="form-control"
            placeholder="Write a comment..."
            value={body}
            onChange={setBody}
            rows="3">
          </textarea>
        </div>
        <div class="card-footer">
          <img
            src={currentUser.image}
            class="comment-author-img"
            alt={currentUser.username} />
          <button
            class="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    )
  }
}

export default CommentInput;

import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import React from 'react';

function Comment(props) {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div class="card">
      <div class="card-block">
        <p class="card-text">{comment.body}</p>
      </div>
      <div class="card-footer">
        <Link
          href={`/@${comment.author.username}`}
          class="comment-author">
          <img src={comment.author.image} class="comment-author-img" alt={comment.author.username} />
        </Link>
        &nbsp;
        <Link
          href={`/@${comment.author.username}`}
          class="comment-author">
          {comment.author.username}
        </Link>
        <span class="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;

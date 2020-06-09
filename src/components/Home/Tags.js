import api from '../../api';

function Tag({tag}) {
  return (
    <button class="tag-default tag-pill" key={tag}>
      {tag}
    </button>
  )
}

async function Tags() {
  const { tags } = await api.Tags.all();
  return (
    <div class="tag-list">
      {tags.map(tag => <Tag tag={tag} />)}
    </div>
  );
}

export default Tags;

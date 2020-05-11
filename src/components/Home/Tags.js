import { createElement } from '@bikeshaving/crank';
import api from '../../api';

async function *Tags() {
  for await (const _ of this) {
    yield <div>Loading Tags...</div>;
    const { tags } = await api.Tags.all();
    yield (
      <div class="tag-list">
        {tags.map(tag => (
          <button class="tag-default tag-pill" key={tag}>
            {tag}
          </button>
        ))}
      </div>
    );
  }
};

export default Tags;

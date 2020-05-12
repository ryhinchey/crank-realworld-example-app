import { createElement } from '@bikeshaving/crank';

function ListErrors({errors}) {
  if (errors) {
    return (
      <ul className="error-messages">
        {Object.keys(errors).map(key => (
          <li>
            {key} {errors[key]}
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
}

export default ListErrors;
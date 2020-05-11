import { createElement } from '@bikeshaving/crank';

function Banner({ token }) {
  if (token) {
    return null;
  }
  return (
    <div class="banner">
      <div class="container">
        <h1 classd="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

export default Banner;
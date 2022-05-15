import AbstractView from '../framework/view/abstract-view.js';

const createNoMoviesTemplate = (title = 'There are no movies in our database') => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${title}</h2>
    </section>
  </section>`
);

export default class NoMoviesView extends AbstractView {
  get template() {
    return createNoMoviesTemplate();
  }
}

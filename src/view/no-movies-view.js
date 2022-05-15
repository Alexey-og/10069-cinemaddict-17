import { createElement } from '../render.js';

const createNoMoviesTemplate = (title = 'There are no movies in our database') => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${title}</h2>
    </section>
  </section>`
);

export default class NoMoviesView {
  #element = null;

  get template() {
    return createNoMoviesTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

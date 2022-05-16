import AbstractView from '../framework/view/abstract-view.js';
import { filter } from '../utils/filter.js';


const createMainNavigationTemplate = (films) => (
  `<nav class="main-navigation">
    <a href="#all" id="all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" id="watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filter.watchlist(films).length}</span></a>
    <a href="#history" id="history" class="main-navigation__item">History <span class="main-navigation__item-count">${filter.history(films).length}</span></a>
    <a href="#favorites" id="favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filter.favorites(films).length}</span></a>
  </nav>`
);

export default class MainNavigationView extends AbstractView {
  #films = null;

  constructor(films) {
    super();
    this.#films = films;
  }

  get template() {
    return createMainNavigationTemplate(this.#films);
  }
}

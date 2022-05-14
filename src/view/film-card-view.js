import { createElement } from '../render.js';
import {
  getFormatedDate,
  convertMinsToHrsMins
} from '../utils.js';

const DESCRIPTON_MAX_LENGTH = 140;


const createFilmCardTemplate = (film) => {
  const { filmInfo, userDetails } = film;

  const showDescription = (description) => (
    description.length > DESCRIPTON_MAX_LENGTH ? (description.slice(0, DESCRIPTON_MAX_LENGTH).concat('...')) : description
  );

  const isInWatchlistClass = userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const isWatchedClass = userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavoriteClass = userDetails.favorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getFormatedDate(filmInfo.release.date, 'YYYY')}</span>
        <span class="film-card__duration">${convertMinsToHrsMins(filmInfo.runtime)}</span>
        <span class="film-card__genre">${filmInfo.genre.join(', ')}</span>
      </p>
      <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${showDescription(filmInfo.description)}</p>
      <span class="film-card__comments">${film.comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isInWatchlistClass}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatchedClass}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavoriteClass}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
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

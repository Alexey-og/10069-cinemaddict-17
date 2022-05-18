import {
  render
} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class FilmPresenter {
  #filmComponent = null;

  #film = null;
  #comments = null;
  #container = null;

  constructor(film, comments, container) {
    this.#film = film;
    this.#comments = comments;
    this.#container = container;
  }

  init = () => {
    this.#filmComponent = new FilmCardView(this.#film);
    this.#filmComponent.setOpenPopupClickHandler(this.#handleOpenPopupClick);

    render(this.#filmComponent, this.#container);
  };

  #openFilmPopup = () => {
    const popupPresenter = new PopupPresenter(this.#film, this.#comments);
    popupPresenter.init();
  };

  #handleOpenPopupClick = () => {
    this.#openFilmPopup();
  };
}

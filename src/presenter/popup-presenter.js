import FilmPopupView from '../view/film-popup-view.js';

export default class PopupPresenter {
  #popupComponent = null;

  #film = null;
  #comments = null;

  #pageBodyElement = document.querySelector('body');

  constructor(film, comments) {
    this.#film = film;
    this.#comments = comments;
  }

  init = () => {
    this.#popupComponent = new FilmPopupView(this.#film, this.#comments);

    this.#pageBodyElement.classList.add('hide-overflow');
    this.#pageBodyElement.appendChild(this.#popupComponent.element);

    this.#popupComponent.setClosePopupClickHandler(this.#handleClosePopupClick);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #closeFilmPopup = () => {
    this.#pageBodyElement.classList.remove('hide-overflow');
    this.#pageBodyElement.removeChild(this.#popupComponent.element);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closeFilmPopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleClosePopupClick = () => {
    this.#closeFilmPopup();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}

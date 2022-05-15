import {
  render,
  remove
} from '../framework/render.js';

import { getRandomArrayElement } from '../utils/common.js';

import AllMoviesListView from '../view/all-movies-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import MostCommentedMoviesListView from '../view/most-commented-movies-list-view.js';
import NoMoviesView from '../view/no-movies-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import TopRatedMoviesListView from '../view/top-rated-movies-list-view.js';

const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #comments = [];
  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #allMoviesListComponent = new AllMoviesListView();
  #filmsWrapperComponent = new FilmsWrapperView();
  #mostCommentedMoviesListComponent = new MostCommentedMoviesListView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #topRatedMoviesListComponent = new TopRatedMoviesListView();

  #pageBodyElement = document.querySelector('body');
  #pageMainElement = document.querySelector('.main');
  #allMoviesContainerElement = this.#allMoviesListComponent.element.querySelector('.films-list__container');
  #topRatedMoviesContainerElement = this.#topRatedMoviesListComponent.element.querySelector('.films-list__container');
  #mostCommentedMoviesContainerElement = this.#mostCommentedMoviesListComponent.element.querySelector('.films-list__container');

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#comments = [...this.#filmsModel.comments];
    this.#films = [...this.#filmsModel.films];

    this.#renderFilms();
  };

  #handleShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderFilm = (filmCard, container = this.#allMoviesContainerElement) => {
    const filmComponent = new FilmCardView(filmCard);
    const popupComponent = new FilmPopupView(filmCard, this.#comments);

    const openFilmPopup = () => {
      this.#pageBodyElement.classList.add('hide-overflow');
      this.#pageBodyElement.appendChild(popupComponent.element);
    };

    const closeFilmPopup = () => {
      this.#pageBodyElement.classList.remove('hide-overflow');
      this.#pageBodyElement.removeChild(popupComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closeFilmPopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.setOpenPopupClickHandler(() => {
      openFilmPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    popupComponent.setClosePopupClickHandler(() => {
      closeFilmPopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, container);
  };

  #renderFilms = () => {
    if (this.#films.length === 0) {
      render(new NoMoviesView(), this.#filmsContainer);
      return;
    }

    render(new SortView(), this.#pageMainElement);
    render(this.#filmsWrapperComponent, this.#filmsContainer);
    render(this.#allMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#films[i]);
    }

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#allMoviesListComponent.element);
      this.#showMoreButtonComponent.setShowMoreClickHandler(this.#handleShowMoreButtonClick);
    }

    render(this.#topRatedMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
      this.#renderFilm(getRandomArrayElement(this.#films), this.#topRatedMoviesContainerElement);
    }

    render(this.#mostCommentedMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
      this.#renderFilm(getRandomArrayElement(this.#films), this.#mostCommentedMoviesContainerElement);
    }
  };
}

import {
  render,
  remove,
  RenderPosition
} from '../framework/render.js';

import { getRandomArrayElement } from '../utils/common.js';

import AllMoviesListView from '../view/all-movies-list-view.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import MostCommentedMoviesListView from '../view/most-commented-movies-list-view.js';
import NoMoviesView from '../view/no-movies-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import TopRatedMoviesListView from '../view/top-rated-movies-list-view.js';
import FilmPresenter from './film-presenter.js';

const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

export default class BoardPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #comments = [];
  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #allMoviesListComponent = new AllMoviesListView();
  #filmsWrapperComponent = new FilmsWrapperView();
  #mostCommentedMoviesListComponent = new MostCommentedMoviesListView();
  #noMoviesComponent = new NoMoviesView();
  #sortComponent = new SortView();
  #showMoreButtonComponent = new ShowMoreButtonView();
  #topRatedMoviesListComponent = new TopRatedMoviesListView();

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

    this.#renderFilmsPage();
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButtonComponent);
    }
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#pageMainElement, RenderPosition.AFTERBEGIN);
  };

  #renderFilm = (film, container = this.#allMoviesContainerElement, comments = this.#comments) => {
    const filmPresenter = new FilmPresenter(film, comments, container);
    filmPresenter.init();
  };

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  };

  #renderNoMovies = () => {
    render(this.#noMoviesComponent, this.#filmsContainer);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#allMoviesListComponent.element);
    this.#showMoreButtonComponent.setShowMoreClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderAllMovies = () => {
    render(this.#allMoviesListComponent, this.#filmsWrapperComponent.element);

    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderTopRatedMovies = () => {
    render(this.#topRatedMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
      this.#renderFilm(getRandomArrayElement(this.#films), this.#topRatedMoviesContainerElement);
    }
  };

  #renderMostCommentedMovies = () => {
    render(this.#mostCommentedMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
      this.#renderFilm(getRandomArrayElement(this.#films), this.#mostCommentedMoviesContainerElement);
    }
  };

  #renderFilmsList = () => {
    this.#renderAllMovies();
    this.#renderTopRatedMovies();
    this.#renderMostCommentedMovies();
  };

  #renderFilmsPage = () => {
    if (this.#films.length === 0) {
      this.#renderNoMovies();
      return;
    }

    render(this.#filmsWrapperComponent, this.#filmsContainer);
    this.#renderSort();
    this.#renderFilmsList();
  };
}

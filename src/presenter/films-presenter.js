import { render } from '../render.js';

import { getRandomArrayElement } from '../utils.js';

import AllMoviesListView from '../view/all-movies-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmPopupView from '../view/film-popup-view.js';
import FilmsWrapperView from '../view/films-wrapper-view.js';
import MostCommentedMoviesListView from '../view/most-commented-movies-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedMoviesListView from '../view/top-rated-movies-list-view.js';

const TOP_RATED_MOVIES_CARDS_COUNT = 2;
const MOST_COMMENTED_MOVIES_CARDS_COUNT = 2;

export default class FilmsPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #comments = [];
  #films = [];

  #allMoviesListComponent = new AllMoviesListView();
  #filmsWrapperComponent = new FilmsWrapperView();
  #mostCommentedMoviesListComponent = new MostCommentedMoviesListView();
  #topRatedMoviesListComponent = new TopRatedMoviesListView();

  #pageBodyElement = document.querySelector('body');
  #allMoviesContainerElement = this.#allMoviesListComponent.element.querySelector('.films-list__container');
  #topRatedMoviesContainerElement = this.#topRatedMoviesListComponent.element.querySelector('.films-list__container');
  #mostCommentedMoviesContainerElement = this.#mostCommentedMoviesListComponent.element.querySelector('.films-list__container');

  init = (filmsContainer, filmsModel) => {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#comments = [...this.#filmsModel.comments];
    this.#films = [...this.#filmsModel.films];

    render(this.#filmsWrapperComponent, this.#filmsContainer);

    render(this.#allMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      render(new FilmCardView(this.#films[i]), this.#allMoviesContainerElement);
    }

    render(new ShowMoreButtonView(), this.#allMoviesListComponent.element);

    render(this.#topRatedMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < TOP_RATED_MOVIES_CARDS_COUNT; i++) {
      render(new FilmCardView(getRandomArrayElement(this.#films)), this.#topRatedMoviesContainerElement);
    }

    render(this.#mostCommentedMoviesListComponent, this.#filmsWrapperComponent.element);

    for (let i = 0; i < MOST_COMMENTED_MOVIES_CARDS_COUNT; i++) {
      render(new FilmCardView(getRandomArrayElement(this.#films)), this.#mostCommentedMoviesContainerElement);
    }

    render(new FilmPopupView(this.#films[0], this.#comments), this.#pageBodyElement);
  };
}

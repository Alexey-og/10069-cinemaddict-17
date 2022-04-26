import FilmsWrapperView from '../view/films-wrapper-view.js';
import AllMoviesListView from '../view/all-movies-list-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedMoviesListView from '../view/top-rated-movies-list-view.js';
import MostCommentedMoviesListView from '../view/most-commented-movies-list-view.js';

import {render} from '../render.js';

const ALL_MOVIES_CARDS_COUNT = 5;
const TOP_RATED_MOVIES_CARDS_COUNT = 2;
const MOST_COMMENTED_MOVIES_CARDS_COUNT = 2;

export default class FilmsPresenter {
  filmsWrapperComponent = new FilmsWrapperView();
  allMoviesListComponent = new AllMoviesListView();
  allMoviesContainerElement = this.allMoviesListComponent.getElement().querySelector('.films-list__container');
  topRatedMoviesListComponent = new TopRatedMoviesListView();
  topRatedMoviesContainerElement = this.topRatedMoviesListComponent.getElement().querySelector('.films-list__container');
  mostCommentedMoviesListComponent = new MostCommentedMoviesListView();
  mostCommentedMoviesContainerElement = this.mostCommentedMoviesListComponent.getElement().querySelector('.films-list__container');

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmsWrapperComponent, this.filmsContainer);

    render(this.allMoviesListComponent, this.filmsWrapperComponent.getElement());
    for (let i = 0; i < ALL_MOVIES_CARDS_COUNT; i++) {
      render(new FilmCardView(), this.allMoviesContainerElement);
    }

    render(new ShowMoreButtonView(), this.allMoviesListComponent.getElement());

    render(this.topRatedMoviesListComponent, this.filmsWrapperComponent.getElement());
    for (let i = 0; i < TOP_RATED_MOVIES_CARDS_COUNT; i++) {
      render(new FilmCardView(), this.topRatedMoviesContainerElement);
    }

    render(this.mostCommentedMoviesListComponent, this.filmsWrapperComponent.getElement());
    for (let i = 0; i < MOST_COMMENTED_MOVIES_CARDS_COUNT; i++) {
      render(new FilmCardView(), this.mostCommentedMoviesContainerElement);
    }
  };
}

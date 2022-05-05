import { render } from './render.js';

import './mock/film.js';

import HeaderProfileView from './view/header-profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import SortView from './view/sort-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';

import FilmsPresenter from './presenter/films-presenter.js';

import FilmsModel from './model/films-model.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();

const filmsPresenter = new FilmsPresenter();

render(new HeaderProfileView(), pageHeaderElement);
render(new MainNavigationView(), pageMainElement);
render(new SortView(), pageMainElement);

filmsPresenter.init(pageMainElement, filmsModel);

render(new FooterStatisticsView(), pageFooterStatisticsElement);

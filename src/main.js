import { render } from './framework/render.js';

import './mock/comment.js';
import './mock/film.js';

import HeaderProfileView from './view/header-profile-view.js';
import MainNavigationView from './view/main-navigation-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageFooterStatisticsElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter(pageMainElement, filmsModel);

render(new HeaderProfileView(), pageHeaderElement);
render(new MainNavigationView(filmsModel.films), pageMainElement);

filmsPresenter.init();

render(new FooterStatisticsView(), pageFooterStatisticsElement);

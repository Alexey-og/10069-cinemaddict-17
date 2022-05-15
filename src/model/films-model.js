import { createComment } from '../mock/comment.js';
import { createFilm } from '../mock/film.js';
import { getRandomIntegerInRange } from '../utils/common.js';

const COMMENTS_MIN_QUANTITY = 0;
const COMMENTS_MAX_QUANTITY = 10;
const FILMS_MIN_QUANTITY = 4;
const FILMS_MAX_QUANTITY = 17;

const commentsQuantity = getRandomIntegerInRange(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY);
const filmsQuantity = getRandomIntegerInRange(FILMS_MIN_QUANTITY, FILMS_MAX_QUANTITY);

export default class FilmsModel {
  #comments = Array.from({length: commentsQuantity}, createComment);
  #films = Array.from({length: filmsQuantity}, createFilm);

  get comments() {
    return this.#comments;
  }

  get films() {
    return this.#films;
  }
}

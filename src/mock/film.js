import {
  getRandomNumberInRange,
  getRandomArrayElement,
  getRandomObjectValue,
  getRandomCountArrayElements,
  getRandomDate
} from '../utils.js';

const SENTENCES_MIN_QUANTITY = 1;
const SENTENCES_MAX_QUANTITY = 5;
const DESCRIPTON_MAX_LENGTH = 140;
const YEAR_FIRST_FILM = new Date(1895, 12, 28);
const MIN_FILM_RATING = 1.0;
const MAX_FILM_RATING = 9.9;
const MIN_FILM_DURATING = 60;
const MAX_FILM_DURATING = 180;
const FIRST_WATCHING_DATE = new Date(2021, 10, 20);

const films = {
  madeForEachOther: {
    title: 'Made for Each Other',
    poster: 'made-for-each-other.png',
  },
  popeyeMeetsSinbad: {
    title: 'Popeye the Sailor meets Sindbad the Sailor',
    poster: 'popeye-meets-sinbad.png',
  },
  sagebrushTrail: {
    title: 'Sagebrush trail',
    poster: 'sagebrush-trail.jpg',
  },
  santaClausConquersTheMartians: {
    title: 'Santa Claus conquers the Matrians',
    poster: 'santa-claus-conquers-the-martians.jpg',
  },
  theDanceOfLife: {
    title: 'The dance of life',
    poster: 'the-dance-of-life.jpg',
  },
  theGreatFlamarion: {
    title: 'The great flamarion',
    poster: 'the-great-flamarion.jpg',
  },
  theManWithTheGoldenArm: {
    title: 'The man with the golden arm',
    poster: 'the-man-with-the-golden-arm.jpg',
  },
};

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const ageRatings = [
  '0+',
  '6+',
  '12+',
  '18+',
  '21+'
];

const directors = [
  'Alfred Hitchcock',
  'David Lean',
  'Preston Sturges',
  'Frank Capra',
  'Billy Wilder',
  'George Cukor',
  'Michael Curtiz',
  'Fred Zinnemann',
  'Francis Ford Coppola',
  'Steven Spielberg',
];

const screenwriters = [
  'Billy Wilder',
  'Ethan Coen and Joel Coen',
  'Robert Towne',
  'Quentin Tarantino',
  'Francis Ford Coppola',
  'William Goldman',
  'Charlie Kaufman',
  'Woody Allen',
  'Oliver Stone',
  'George Lucas',
];

const actors = [
  'Marlon Brando',
  'Humphrey Bogart',
  'James Stewart',
  'Cary Grant',
  'Charles Chaplin',
  'John Wayne',
  'Fred Astaire',
  'Katharine Hepburn',
  'Marilyn Monroe',
  'Henry Fonda',
];

const countries = [
  'Canada',
  'China',
  'France',
  'Germany',
  'India',
  'Italy',
  'Japan',
  'Korea',
  'Russia',
  'Spain',
  'United Kingdom',
  'USA'
];

const genres = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Thriller',
  'Western',
];

const createDescription = () => {
  let description = '';
  for (let i = 0; i < getRandomNumberInRange(SENTENCES_MIN_QUANTITY, SENTENCES_MAX_QUANTITY); i++) {
    description += ` ${getRandomArrayElement(descriptions)}`;
  }
  if (description.length > DESCRIPTON_MAX_LENGTH) {
    return `${description.slice(0, DESCRIPTON_MAX_LENGTH)}...`;
  }
  return description;
};

const createFilm = () => {
  const randomFilm = getRandomObjectValue(films);

  return {
    id: 0,
    filmInfo: {
      title: randomFilm.title,
      alternativeTitle: randomFilm.title,
      totalRating: getRandomNumberInRange(MIN_FILM_RATING, MAX_FILM_RATING, 1),
      poster: randomFilm.poster,
      ageRating: getRandomArrayElement(ageRatings),
      director: getRandomArrayElement(directors),
      writers: getRandomCountArrayElements(screenwriters, 1, 5),
      actors: getRandomCountArrayElements(actors, 1, 5),
      release: {
        date: getRandomDate(YEAR_FIRST_FILM),
        releaseCountry: getRandomArrayElement(countries)
      },
      runtime: getRandomNumberInRange(MIN_FILM_DURATING, MAX_FILM_DURATING),
      genre: getRandomCountArrayElements(genres, 1, 2),
      description: createDescription()
    },
    userDetails: {
      watchlist: Boolean(getRandomNumberInRange(0, 1)),
      alreadyWatched: Boolean(getRandomNumberInRange(0, 1)),
      watchingDate: getRandomDate(FIRST_WATCHING_DATE),
      favorite: Boolean(getRandomNumberInRange(0, 1))
    },
    comments: [1, 2, 3, 4, 5]
  };
};


export { createFilm };

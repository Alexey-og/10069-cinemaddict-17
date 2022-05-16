const FilterType = {
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const filter = {
  [FilterType.WATCHLIST]: (films) => films.filter((film) => (film.userDetails.watchlist)),
  [FilterType.HISTORY]: (films) => films.filter((film) => (film.userDetails.alreadyWatched)),
  [FilterType.FAVORITES]: (films) => films.filter((film) => (film.userDetails.favorite)),
};


export { filter };

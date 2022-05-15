import dayjs from 'dayjs';

/**
 * Приведение даты к заданному формату
 * @param {date} date — дата в формате ISO
 * @param {string} format — формат, к которому должна быть приведена дата
 * @return {string} — строка, к которой приведена дата
 */
const getFormatedDate = (date, format) => (
  dayjs(date).format(format)
);


/**
 * Преобразование количества минут в текстовую строку в виде количестве часов плюс количество минут
 * @param {string} mins — количество минут (число)
 * @return {string} — строка "количество часов плюс количество минут"
 */
const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 1 ? '' : `${h}h `;
  if (m === 0) {
    m = '';
  } else if (m < 10) {
    m = `0${m}m`;
  } else {
    m = `${m}m`;
  }
  return `${h}${m}`;
};


export {
  getFormatedDate,
  convertMinsToHrsMins
};

import dayjs from 'dayjs';

/**
 * Получение случайного целого числа из переданного диапазона включительно.
 * Для исключения отрицательного значения числа приводятся к абсолютному значению.
 *
 * @param {number} min — нижняя граница диапазона.
 * @param {number} max — верхняя граница диапазона.
 * @return {number} — полученное случайное целое из диапазона.
 */
const getRandomIntegerInRange = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


/**
 * Получение случайного числа из переданного диапазона включительно.
 * Если аргумент "digitsAfterDecpoint" не равен нулю, но случайное число оказывается INTEGER, принудительно добавляются нули после запятой.
 * Для получения целого случайного числа указать "digitsAfterDecpoint", равным нулю.
 *
 * @param {number} min — нижняя граница диапазона
 * @param {number} max — верхняя граница диапазона
 * @param {number} digitsAfterDecpoint — количество знаков после запятой
 * @return {number} — полученное случайное целое из диапазона
 */
const getRandomNumberInRange = (min, max, digitsAfterDecpoint = 0) => {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = lower + Math.random() * (upper - lower);
  return parseFloat(result).toFixed(digitsAfterDecpoint);
};


/**
 * Перемешивание элементов массива в случайном порядке.
 *
 * @param {array} array — исходный массив.
 * @return {array} — итоговый массив.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};


/**
 * Получение случайного элемента массива.
 *
 * @param {array} array — исходный массив.
 * @return {string|number|object} — значение массива со случайным индексом.
 */
const getRandomArrayElement = (array) => (
  array[Math.floor(Math.random() * array.length)]
);


/**
 * Получение случайного элемента объекта
 * @param {object} object — исходный объект
 * @return {string|number|object} — значение объекта со случайным ключом
 */
const getRandomObjectValue = (object) => (
  object[Object.keys(object)[Math.floor(Math.random() * Object.keys(object).length)]]
);


/**
 * Получение случайного количества случайных элементов массива в указанном диапазоне.
 * По-умолчанию, нижняя граница - 1 элемент, верхняя граница - общее количество элементов массива.
 *
 * @param {array} array — исходный массив.
 * @param {number} min — нижняя граница диапазона.
 * @param {number} max — верхняя граница диапазона.
 * @return {array} — итоговый массив.
 */
const getRandomCountArrayElements = (array, min = 1, max = array.length) => (
  shuffleArray(array).slice(0, getRandomIntegerInRange(min, max))
);


/**
 * Получение случайной даты в промежутке дат
 * @param {date} start — стартовая дата промежутка
 * @param {date} end — конечная дата промежутка (по-умолчанию - текущая дата)
 * @return {date} — итоговая случайная дата
 */
const getRandomDate = (start, end = new Date()) => (
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
);


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
  getRandomIntegerInRange,
  getRandomNumberInRange,
  getRandomArrayElement,
  getRandomObjectValue,
  getRandomCountArrayElements,
  getRandomDate,
  getFormatedDate,
  convertMinsToHrsMins
};

import {
  getRandomArrayElement,
  getRandomDate
} from '../utils.js';

const FIRST_COMMENT_DATE = new Date(2022, 2, 20);

const commentEmojies = [
  'angry',
  'puke',
  'sleeping',
  'smile',
];

const commentTexts = [
  'I\'m at a loss as to how to describe this movie.',
  'TRULY FUNNY....Comedy Gold...B++++',
  'Its funny but you might feel guilty laughing and you will need a shower afterwards',
  'I would rate it 20/20 if I could....Watch it!!',
  'One of the Funniest and Most Intelligent Criticisms I Have Ever Seen in Many Years',
  'Hilarious, probably going to be addictive!',
  'Was I watching the same movie as everyone else???',
  'Wait for the DVD',
  'Don\'t waste your time.',
  'Wasted my money and time',
];

const commentAuthors = [
  'mtuspersonal',
  'markussaturn',
  'theycallmemrglass',
  'gqcpa',
  'claudio_carvalho',
  'connort01',
  'les-180',
  'ssbra',
  'farhannyc',
  'jimminysnickety',
];

let commentID = 0;

const createComment = () => (
  {
    id: commentID++,
    emoji: getRandomArrayElement(commentEmojies),
    text: getRandomArrayElement(commentTexts),
    author: getRandomArrayElement(commentAuthors),
    date: getRandomDate(FIRST_COMMENT_DATE),
  }
);


export {
  createComment,
  commentEmojies
};

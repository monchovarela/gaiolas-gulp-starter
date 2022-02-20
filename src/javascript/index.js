const _ = (el) => document.querySelector(el);
// theme colors
const colors = {
  simple: ['#000000', '#FFFFFF', '#888888'],
  simpleDark: ['#FFFFFF', '#000000', '#777777'],
  vine: ['#A4193D', '#FFDFB9', '#3333333'],
  vineDark: ['#FFDFB9', '#A4193D', '#FDFDFD'],
  green: ['#2BAE66', '#FCF6F5', '#3333333'],
  greenDark: ['#FCF6F5', '#2BAE66', '#FDFDFD'],
  red: ['#990011', '#FCF6F5', '#3333333'],
  redDark: ['#FCF6F5', '#990011', '#FDFDFD'],
};
// Generate random theme colors
const randomColors = () => {
  // create array colors names
  let arr = [];
  for (let color in colors) {
    arr.push(color);
  }
  // random array
  let rand = arr[Math.floor(Math.random() * arr.length)],
    color1 = colors[rand][0],
    color2 = colors[rand][1],
    color3 = colors[rand][2];
  console.log(`Name of color is ${rand}`);
  // set property on :root css
  document.documentElement.style.setProperty('--dark', color1);
  document.documentElement.style.setProperty('--light', color2);
  document.documentElement.style.setProperty('--txt', color3);
};
const toogleNavigation = () => {
  _('.header').classList.toggle('active');
  _('.content').classList.toggle('active');
};
document.addEventListener('DOMContentLoaded', () => {
  _('.btn-menu').addEventListener('click', toogleNavigation);
  _('.btn-close').addEventListener('click', toogleNavigation);
  randomColors();
});
"use strict";

var _ = function _(el) {
  return document.querySelector(el);
}; // theme colors


var colors = {
  simple: ['#000000', '#FFFFFF', '#888888'],
  simpleDark: ['#FFFFFF', '#000000', '#777777'],
  vine: ['#A4193D', '#FFDFB9', '#3333333'],
  vineDark: ['#FFDFB9', '#A4193D', '#FDFDFD'],
  green: ['#2BAE66', '#FCF6F5', '#3333333'],
  greenDark: ['#FCF6F5', '#2BAE66', '#FDFDFD'],
  red: ['#990011', '#FCF6F5', '#3333333'],
  redDark: ['#FCF6F5', '#990011', '#FDFDFD']
}; // Generate random theme colors

var randomColors = function randomColors() {
  // create array colors names
  var arr = [];

  for (var color in colors) {
    arr.push(color);
  } // random array


  var rand = arr[Math.floor(Math.random() * arr.length)],
      color1 = colors[rand][0],
      color2 = colors[rand][1],
      color3 = colors[rand][2];
  console.log("Name of color is ".concat(rand)); // set property on :root css

  document.documentElement.style.setProperty('--dark', color1);
  document.documentElement.style.setProperty('--light', color2);
  document.documentElement.style.setProperty('--txt', color3);
};

var toogleNavigation = function toogleNavigation() {
  _('.header').classList.toggle('active');

  _('.content').classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', function () {
  _('.btn-menu').addEventListener('click', toogleNavigation);

  _('.btn-close').addEventListener('click', toogleNavigation);

  randomColors();
});
//# sourceMappingURL=index.js.map

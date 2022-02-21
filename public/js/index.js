"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _ = function _(el) {
  return document.querySelector(el);
}; // theme colors


var colors = {
  simple: ['#000000', '#FFFFFF', '#888888'],
  vine: ['#A4193D', '#FFDFB9', '#3333333'],
  green: ['#2BAE66', '#FCF6F5', '#3333333'],
  red: ['#990011', '#FCF6F5', '#3333333']
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

  randomColors(); // simple lightbox

  var img = document.querySelectorAll('.zoom');
  Array.from(img).map(function (item) {
    return handleImages(item);
  });
}); // handle images

function handleImages(item, index) {
  item.addEventListener('click', function (evt) {
    createLightbox({
      src: evt.target.src,
      alt: evt.target.alt ? evt.target.alt : 'Unsplash'
    });
  });
} // create lightbox


function createLightbox(args) {
  document.body.style.overflow = 'hidden';
  var lightbox = createElement('section', document.body, {
    className: 'lightbox'
  }),
      lightboxBody = createElement('article', lightbox, {
    className: 'lightbox-body'
  }),
      image = createElement('img', lightboxBody, {
    src: args.src
  });
  lightboxBody.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.body.style.overflow = 'inherit';
    document.body.removeChild(lightbox);
  });
} // create elements


function createElement(element, where, args) {
  var d = document.createElement(element);
  if (args) for (var _i = 0, _Object$entries = Object.entries(args); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        k = _Object$entries$_i[0],
        v = _Object$entries$_i[1];

    d[k] = v;
  }
  where.appendChild(d);
  return d;
}
//# sourceMappingURL=index.js.map

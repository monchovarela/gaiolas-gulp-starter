const _ = (el) => document.querySelector(el);
// theme colors
const colors = {
  simple: ['#000000', '#FFFFFF', '#888888'],
  vine: ['#A4193D', '#FFDFB9', '#3333333'],
  green: ['#2BAE66', '#FCF6F5', '#3333333'],
  red: ['#990011', '#FCF6F5', '#3333333'],
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
  // simple lightbox
  let img = document.querySelectorAll('.zoom');
  Array.from(img).map((item) => handleImages(item));
});

// handle images
function handleImages(item, index) {
  item.addEventListener('click', (evt) => {
    createLightbox({
      src: evt.target.src,
      alt: evt.target.alt ? evt.target.alt : 'Unsplash',
    });
  });
}
// create lightbox
function createLightbox(args) {
  document.body.style.overflow = 'hidden';

  let lightbox = createElement('section', document.body, {
      className: 'lightbox',
    }),
    lightboxBody = createElement('article', lightbox, {
      className: 'lightbox-body',
    }),
    image = createElement('img', lightboxBody, {
      src: args.src,
    });

  lightboxBody.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.body.style.overflow = 'inherit';
    document.body.removeChild(lightbox);
  });
}
// create elements
function createElement(element, where, args) {
  let d = document.createElement(element);
  if (args) for (const [k, v] of Object.entries(args)) d[k] = v;
  where.appendChild(d);
  return d;
}

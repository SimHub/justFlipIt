import flip = require('@simhub2/justflipit');
const card = flip(document.createElement('div'), { Click: true });
card.toggle();
const Constructor = flip.FlipController;
void Constructor;

'use strict';

var header = document.querySelector('.header');
window.onscroll = function () {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 150) {
    var className = header.getAttribute('class') + ' scrolled';
    header.setAttribute('class', className);
  } else {
    var _className = header.getAttribute('class') - 'scrolled';
  }
};
//# sourceMappingURL=script.js.map

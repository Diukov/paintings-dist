import modals from './modules/modals.js';
import sliders from './modules/sliders.js';

window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  modals();
  sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
  sliders('.main-slider-item', 'vertical');
});

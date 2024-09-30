import '../style/style.scss';
import { getCurrentDateAndTime } from './dateAndTime';
import { getCurrentBgImg } from './sliderBg';

document.addEventListener("DOMContentLoaded", () => {
    getCurrentBgImg();
    getCurrentDateAndTime();
});



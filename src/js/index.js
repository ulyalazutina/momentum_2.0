import '../style/style.scss';
import { getCity } from './chooseCity';
import { getCurrentDateAndTime } from './dateAndTime';
import { getGeolocation } from './geolocation';
import { getCurrentBgImg } from './sliderBg';
import { handleAddTodo, renderTodoList } from './todoList';

document.addEventListener("DOMContentLoaded", () => {
    getCurrentBgImg();
    getCurrentDateAndTime();
    renderTodoList();
    handleAddTodo();
});

window.addEventListener('load', () => {
    getGeolocation();
    getCity();
})



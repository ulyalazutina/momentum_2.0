import '../style/style.scss';
import { getCurrentDateAndTime } from './dateAndTime';
import { getCurrentBgImg } from './sliderBg';
import {  handleAddTodo ,renderTodoList } from './todoList';

document.addEventListener("DOMContentLoaded", () => {
    getCurrentBgImg();
    getCurrentDateAndTime();
});


renderTodoList();
handleAddTodo()

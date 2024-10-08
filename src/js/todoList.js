const inputTodo = document.getElementById('input-todo');
const todoContainer = document.querySelector('.todo__items');
const blockTodo = document.querySelector('.todo');
const deleteDoneTodo = document.querySelector('.todo__delete');


function uniqleId() {
    return Date.now().toString(6) - Math.random().toString(6).slice(2, 0)
}

export const handleAddTodo = () => {
    
    inputTodo.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {

            if (inputTodo.value === "") {
                inputTodo.classList.add('error');
                inputTodo.setAttribute('placeholder', "Введите текст");
                inputTodo.classList.toggle('shake');
            } else {
                inputTodo.classList.remove('error');
                inputTodo.setAttribute('placeholder', "Новая задача");
                inputTodo.classList.remove('shake');

                const localTodo = JSON.parse(localStorage.getItem('todo')) || [];

                const currentTodoData = {
                    id: uniqleId(),
                    name: inputTodo.value.trim(),
                    done: false,
                };
    
                localTodo.push(currentTodoData);
                localStorage.setItem('todo', JSON.stringify(localTodo));
                renderTodoList();
                inputTodo.value = "";
            }

        }
    })

}

export const renderTodoList = () => {
    const storageTodo = JSON.parse(localStorage.getItem('todo'));
    if (storageTodo && storageTodo.length !== 0) {

        const todoList = storageTodo.map((item) => {
            return `
            <div class="todo__item">
                <label for="${item.id}" ${item.done && 'class="done"'}>
                <input type="checkbox" name="${item.id}" id="${item.id}" ${item.done && 'checked'}/>
                   ${item.name}
                </label>
                <button type="button" class="todo__btn" data-todo="${item.id}">
                    <svg
                        class="todo__icon"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 480 480"
                        style="enable-background: new 0 0 480 480"
                        xml:space="preserve"
                    >
                        <g>
                        <g>
                            <g>
                            <path
                                d="M424,32H300.944L287.2,4.424C285.838,1.699,283.047-0.017,280,0h-80c-3.032-0.001-5.805,1.712-7.16,4.424L179.056,32H56 c-4.418,0-8,3.582-8,8v48c0,4.418,3.582,8,8,8h16.936l47.128,376.992c0.5,4.003,3.902,7.007,7.936,7.008h224 c4.034-0.001,7.436-3.005,7.936-7.008L407.064,96H424c4.418,0,8-3.582,8-8V40C432,35.582,428.418,32,424,32z M204.944,16h70.112 l8,16h-86.112L204.944,16z M344.944,464h-209.88l-46-368h301.872L344.944,464z M416,80H64V48h352V80z"
                            />
                            <path
                                d="M176.56,408.992c0.5,4.003,3.902,7.007,7.936,7.008c0.334-0.002,0.668-0.023,1-0.064 c4.382-0.549,7.491-4.545,6.944-8.928l-32-256c-0.548-4.385-4.547-7.496-8.932-6.948s-7.496,4.547-6.948,8.932L176.56,408.992z"
                            />
                            <path
                                d="M294.504,415.936c0.332,0.041,0.666,0.062,1,0.064c4.034-0.001,7.436-3.005,7.936-7.008l32-256 c0.548-4.385-2.563-8.384-6.948-8.932s-8.384,2.563-8.932,6.948l-32,256C287.013,411.391,290.122,415.387,294.504,415.936z"
                            />
                            <path
                                d="M240,416c4.418,0,8-3.582,8-8V152c0-4.418-3.582-8-8-8s-8,3.582-8,8v256C232,412.418,235.582,416,240,416z"
                            />
                            </g>
                        </g>
                        </g>
                    </svg>
                    </button>
          </div>
            `;
        }).join('');

        
        todoContainer.innerHTML = todoList;
        handleDoneTodo();
        handleDeleteTodo();
        if (storageTodo.some((item) => item.done === true)) {
            deleteDoneTodo.style.display = "block";
            handleDeleteDoneTodo();
        } else {
            deleteDoneTodo.style.display = "none";
        }
    } else {
        deleteDoneTodo.style.display = "none";
        todoContainer.innerHTML = "";
    }
}

function handleDoneTodo() {
    const todoElements = document.querySelectorAll('.todo__item label');

    todoElements.forEach((el) => {
        el.addEventListener('change', (e) => {
            e.preventDefault();
            if (e.target.checked) {
                el.classList.add('zoomIn');
                el.classList.remove('zoomOut');
                el.classList.add('done');
            } else {
                el.classList.add('zoomOut');
                el.classList.remove('zoomIn');
                el.classList.remove('done');
            }
            const storageTodo = JSON.parse(localStorage.getItem('todo'));
            const updateStorage = storageTodo.map((item) => {
                if (item.id.toString() === e.target.id) {
                    item.done = !item.done
                }
                return item
            })

            localStorage.setItem('todo', JSON.stringify(updateStorage));
            // renderTodoList();
        })
    })
}

function handleDeleteTodo() {
    const todoElements = document.querySelectorAll('.todo__item button');

    todoElements.forEach((el) => {
        
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const storageTodo = JSON.parse(localStorage.getItem('todo'));
            const updateStorage = storageTodo.filter((item) => item.id.toString() !== el.getAttribute('data-todo'))

            localStorage.setItem('todo', JSON.stringify(updateStorage));
            renderTodoList();
        })
    })
}

function handleDeleteDoneTodo() {
    deleteDoneTodo.addEventListener('click', () => {
        const storageTodo = JSON.parse(localStorage.getItem('todo'));
        const updateStorage = storageTodo.filter((item) => item.done === false);
        localStorage.setItem('todo', JSON.stringify(updateStorage));
        renderTodoList();
    })
}
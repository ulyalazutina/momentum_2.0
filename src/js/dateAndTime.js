const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

const getCurrentTime = () => {
    timeElement.textContent = new Date().toLocaleTimeString();
    timeElement.setAttribute('datetime', new Date().toLocaleTimeString());
    return timeElement.textContent;
}

const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString('ru', {
        month: 'long',
        day: 'numeric',
    });
    const currentWeek = new Date().toLocaleDateString('ru', {
        weekday: 'long',
    })
    const dateAttribute = new Date().toISOString().slice(0, 10);

    dateElement.textContent = `${currentDate}, ${currentWeek}`;
    dateElement.setAttribute('datetime', dateAttribute);
    
    return dateElement.textContent;
}

export const getCurrentDateAndTime = () => {

    let time = setTimeout(function call() {
        getCurrentTime();
        time = setTimeout(call, 1000);
    }, 0);

    getCurrentDate()
}
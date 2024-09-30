import { getLocality } from "./api";

const modalBlock = document.querySelector('.modal');
const modalTitle = document.querySelector('.modal__title');
const weatherInput = document.querySelector('.weather__input');

function success(position) {
    if (localStorage.getItem('long')) { 

        console.log("hjhjh")
        getLocality({geo: localStorage.getItem('long') + "," + localStorage.getItem('lat'), coordinates: true})
        .then((data) => { weatherInput.value = data.response.GeoObjectCollection.featureMember[0].GeoObject.name; })
        .catch((er) => { console.error(er.message)});
    } else { 
        console.log("121")
        const { longitude, latitude } = position.coords;
        localStorage.setItem('long', longitude);
        localStorage.setItem('lat', latitude);
        getLocality({geo: longitude + "," + latitude, coordinates: true})
        .then((data) => { weatherInput.value = data.response.GeoObjectCollection.featureMember[0].GeoObject.name; })
        .catch((er) => { console.error(er.message)});
    }

}

function error() {

    modalTitle.innerHTML = 'Не получается определить вашу геолокацию :(';
    modalBlock.classList.remove('hide');
    handleClickClose();

    //При неудачной попытке получить геолокацию, показывает погоду Краснодара
    getLocality({geo: "38.90478515625,45.07389068603516", coordinates: true})
    .then((data) => { weatherInput.value = data.response.GeoObjectCollection.featureMember[0].GeoObject.name; })
    .catch((er) => { console.error(er.message)});
}

export const getGeolocation = () => {

    if (!navigator.geolocation) {
        modalTitle.innerHTML = 'Геолокация не поддерживается';
        modalBlock.classList.remove('hide');
        handleClickClose();
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function handleClickClose() {
    document.querySelector('.modal__btn').addEventListener('click', () => {
        modalBlock.classList.add('hide');
    })
}

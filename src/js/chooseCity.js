import { getListCity, getLocality } from "./api";
import { renderCurrentWeather } from "./weather";

const weatherInput = document.querySelector('.weather__input');
const cityList = document.querySelector('.weather__items');

export const getCity = () => {
    weatherInput.addEventListener('input', (e) => {
        if (e.target.value === "") {
            cityList.classList.add('hide');
        }
        e.target.value && getListCity({ text: e.target.value }).then((data) => {
            if (data.results) {
                renderListCity(data.results)
            } else {
                cityList.innerHTML = "Ничего не найдено";
            }
        });
    })
}

function renderListCity(array) {
    cityList.classList.remove('hide');
    const listCity = array.map((item) => {
        return `<p class="weather__item" data-uri=${item.uri}>${item.title.text} ${item.subtitle ? `,  ${item.subtitle.text}` : ""}</p>`;
    }).join('');
    cityList.innerHTML = listCity;
    handleClickCity();
}

function handleClickCity() {
    document.querySelectorAll('.weather__item').forEach((cityElement) => {

        cityElement.addEventListener('click', (e) => {

            const text = e.target.textContent;
            const firstIndex = text.indexOf(',');
            if (firstIndex === -1) {
                weatherInput.value = text ;
            } else {
                weatherInput.value = text.substring(0, firstIndex);
            }
            cityList.classList.add('hide');
            getLocality({geo: cityElement.getAttribute("data-uri"), coordinates: false})
            .then((data) => {
                let coordinatesCity = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ");
                localStorage.setItem("long", coordinatesCity[0]);
                localStorage.setItem("lat", coordinatesCity[1]);
            }).then(() => {
                renderCurrentWeather();
            })
        })

    })

}

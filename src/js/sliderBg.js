import nightBg from "../img/01.jpg";
import morningBg from "../img/02.jpg";
import dayBg from "../img/03.jpg";
import eveningBg from "../img/04.jpg";


const container = document.querySelector('.container');

export const getCurrentBgImg = () => {

    const currentTime = new Date().getHours();

    if (currentTime >= 0 && currentTime < 6) {
        container.style.backgroundImage = `url('${nightBg}')`;
    } else if (currentTime >= 6 && currentTime < 12) {
        container.style.backgroundImage = `url('${morningBg}')`;
    } else if (currentTime >= 12 && currentTime < 18) {
        container.style.backgroundImage = `url('${dayBg}')`;
    } else  {
        container.style.backgroundImage = `url('${eveningBg}')`;
    }
}
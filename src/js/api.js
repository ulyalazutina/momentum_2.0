const API_URL_GEOCODE = `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY_LOCALITY}&lang=ru_RU&kind=locality&results=1&format=json&`
const API_URL_SUGGEST = `https://suggest-maps.yandex.ru/v1/suggest?apikey=${process.env.API_KEY_GEOSAJEST}&lang=ru&types=locality&strict_bounds=1&attrs=uri&`

export const getLocality = async({geo, coordinates}) => {
    try {
        const response = await fetch(coordinates ? `${API_URL_GEOCODE}geocode=${geo}` : `${API_URL_GEOCODE}uri=${geo}`);
        
        if (response.status === 403) {
            throw new Error("Запрос не содержит параметр apikey или указан неверный ключ.")
        }

        if (response.status === 400) {
            throw new Error("В запросе отсутствует обязательный параметр или указано неверное значение параметра. Сообщение содержит дополнительную информацию об ошибке.")
        }

        if (response.status === 429) {
            throw new Error("Слишком много запросов за короткое время.")
        }
        
        return response.json();
    } catch (error) {
        throw new Error(error)
    }
} 

export const getListCity = async({text}) => {
    try {
        const response = await fetch(API_URL_SUGGEST+`text=${text}`);

        if (response.status === 403) {
            throw new Error("Запрос не содержит параметр apikey или указан неверный ключ.")
        }

        if (response.status === 400) {
            throw new Error("В запросе отсутствует обязательный параметр или указано неверное значение параметра.")
        }

        if (response.status === 429) {
            throw new Error("Слишком много запросов за короткое время.")
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
} 

export const getCurrentWeather = async({latitude, longitude}) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${process.env.API_KEY_WEATHER}`);
        
        if (response.status === 400) {
            throw new Error("В запросе отсутствуют обязательные параметры, либо некоторые параметры запроса имеют неверный формат или значения выходят за пределы допустимого диапазона.")
        }

        if (response.status === 401) {
            throw new Error("Токен API отсутствует или указан неверный.")
        }

        if (response.status === 404) {
            throw new Error("Данные с запрошенными параметрами не существуют в базе данных сервиса. Не повторяйте этот запрос.")
        }
        
        if (response.status === 429) {
            throw new Error("Слишком много запросов.")
        }

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
} 
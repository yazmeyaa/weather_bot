import axios from 'axios'
import { Message } from 'node-telegram-bot-api'
import { IWeatherResponse } from '../types/weatherResponse'
import { bot } from '../index'

type responseProps = {
    cityName: string
    temp_c: number
    humidity: number
    wind_speed: number
    cloud: number
    condition: string
}

function createWeatherResponse(properties: responseProps) {
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = today.getMonth().toString().padStart(2, '0')
    const year = today.getFullYear().toString().padStart(2, '0')
    const currentDate = `${day}.${month}.${year}`
    return `${properties.cityName}, ${currentDate}
${properties.condition}
🌡Темпаратура ${properties.temp_c} °C
💧Влажность ${properties.humidity} %
💨Скорость ветра ${properties.wind_speed} км/ч
☁️Облачность ${properties.cloud}%`
}

export default function getWeather(msg: Message) {
    const chatID = msg.chat.id
    const message = msg.text as string
    const city = message.split(' ').slice(2)
    if (city.length === 0) {
        bot.sendMessage(chatID, 'Необходимо указать город для поиска. Например: "Чайный, погода Москва".')
    }
    const cityFinally = city.length === 1 ? city[0] : city.join(' ')
    axios.get<IWeatherResponse>('https://yazmeyaa.itracers.xyz/api/get_weather', {
        params: {
            city: cityFinally
        }
    })
        .then(data => {
            const { humidity, temp_c, wind_kph, cloud, condition } = data.data.current
            bot.sendMessage(chatID, createWeatherResponse({
                cityName: cityFinally,
                humidity: humidity,
                temp_c: temp_c,
                wind_speed: wind_kph,
                cloud: cloud,
                condition: condition.text
            }))
        })
        .catch(error => {
            bot.sendMessage(chatID, 'К сожалению, такой город не найден =(')
            console.error(error)
        })
}
import Bot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import axios from 'axios'
import { IWeatherResponse } from './types/weatherResponse'

dotenv.config()

const TOKEN = process.env.TOKEN as string
const bot = new Bot(TOKEN, {polling: true})

bot.onText(/^(Чайный|чайный)[,\s]+(погода)\s/, async (msg) => {
    console.log(msg)
    const chatID = msg.chat.id
    const message = msg.text as string
    const city = message.split(' ').slice(2)
    axios.get<IWeatherResponse>('https://yazmeyaa.itracers.xyz/api/get_weather', {
        params: {
            city: city
        }
    })
    .then(data => {
        bot.sendMessage(chatID, `Текущая температура в ${city} - ${data.data.current.temp_c} градусов`)
    })

})
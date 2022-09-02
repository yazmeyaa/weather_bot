import Bot from 'node-telegram-bot-api'
import dotenv from 'dotenv'

import getWeather from './api/weather'

dotenv.config()

const TOKEN = process.env.TOKEN as string
export const bot = new Bot(TOKEN, { polling: true })

bot.onText(/^(Чайный|чайный)[,\s]+(погода)\s/, getWeather)
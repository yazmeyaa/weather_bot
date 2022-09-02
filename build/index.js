"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const TOKEN = process.env.TOKEN;
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
bot.onText(/^(Чайный|чайный)[,\s]+(погода)\s/, (msg) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(msg);
    const chatID = msg.chat.id;
    const message = msg.text;
    const city = message.split(' ').slice(2);
    axios_1.default.get('https://yazmeyaa.itracers.xyz/api/get_weather', {
        params: {
            city: city
        }
    })
        .then(data => {
        bot.sendMessage(chatID, `Текущая температура в ${city} - ${data.data.current.temp_c} градусов`);
    });
}));

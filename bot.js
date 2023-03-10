const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const emoji = require("node-emoji");
const chalk = require("chalk");

const token = "6114561031:AAHMiQhnEIpiDjRRBQHzXukck3PQGHh25Y8";

const chatId = "-1001685546987";

const bot = new TelegramBot(token);

var CronJob = require("cron").CronJob;
var job = new CronJob(
  "*/5 * * * *",
  async function () {
    console.log("Você verá esta mensagem a cada segundo");
    try {
      const response = await axios.get(
        "https://api.sokkerpro.net/liveApi/web_d2y7n1sj5v6rqqyt"
      );

      const data = response.data.data;
      data.map((data) => {
        const timeCasa = data?.localTeam?.name;
        const timeFora = data?.visitorTeam?.name;
        const placarCasa = data?.stats[0]?.goals;
        const placarFora = data?.stats[1]?.goals;
        const ataquePerigosoCasa = data?.stats[0]?.attacks?.dangerous_attacks;
        const ataquePerigosoFora = data?.stats[1]?.attacks?.dangerous_attacks;
        const appmCasa =
          data?.stats[0]?.attacks?.avg_dangerous_attacks?.toFixed(2);
        const appmFora =
          data?.stats[1]?.attacks?.avg_dangerous_attacks?.toFixed(2);
        const minutos = data?.time?.minute;
        const escanteiosCasa = data?.stats[0]?.corners;
        const escanteiosfora = data?.stats[1]?.corners;
        const favorito = data?.favorite;

        if (minutos > 20 && minutos < 38) {
          if (ataquePerigosoCasa > 25 || ataquePerigosoFora > 25) {
            if (appmCasa > 0.7 || appmFora > 0.7) {
              if (
                (favorito == 0 && placarCasa <= placarFora) ||
                (favorito == 1 && placarFora <= placarCasa)
              ) {
                const messageHt = `
        🔥 ALERTA ESCANTEIOS HT 🔥
      🏟️ Jogo: ${timeCasa} - ${timeFora}
      ⚽ Placar: ${placarCasa} - ${placarFora}
      🥅 Ataque Perigoso: ${ataquePerigosoCasa} - ${ataquePerigosoFora}
      🚀 Appm: ${appmCasa} - ${appmFora}
      ⌛ Minutos: ${minutos}
      ⛳ Escanteios: ${escanteiosCasa} - ${escanteiosfora}
      💙 Favorito: ${favorito}
                `;
                bot.sendMessage(chatId, messageHt);
              }
            }
          }
        }

        if (minutos > 65 && minutos < 88) {
          if (ataquePerigosoCasa > 75 || ataquePerigosoFora > 75) {
            if (appmCasa > 0.7 || appmFora > 0.7) {
              if (
                (favorito == 0 && placarCasa <= placarFora) ||
                (favorito == 1 && placarFora <= placarCasa)
              ) {
                const message = `
      🔥 ALERTA ESCANTEIOS FT 🔥
     🏟️ Jogo: ${timeCasa} - ${timeFora}
     ⚽ Placar: ${placarCasa} - ${placarFora}
     🥅 Ataque Perigoso: ${ataquePerigosoCasa} - ${ataquePerigosoFora}
     🚀 Appm: ${appmCasa} - ${appmFora}
     ⌛ Minutos: ${minutos}
     ⛳ Escanteios: ${escanteiosCasa} - ${escanteiosfora}
     💙 Favorito: ${favorito}
         
               `;
                bot.sendMessage(chatId, message);
              }
            }
          }
        }
      });
    } catch (error) {
      bot.sendMessage(chatId, "Não existe");
    }
  },
  null,
  true
);

bot.on(["/start"], (msg) => {
  job.start();
});

bot.startPolling();

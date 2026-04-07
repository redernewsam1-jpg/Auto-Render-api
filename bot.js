const TelegramBot = require("node-telegram-bot-api");
const download = require("./downloader");
const fs = require("fs");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

console.log("🤖 Bot started..."); // 👈 add this

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Send /video M3U8_LINK");
});

bot.onText(/\/video (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const url = match[1];

  const file = `video_${Date.now()}.mp4`;

  bot.sendMessage(chatId, "Downloading... ⏳");

  try {
    await download(url, file);

    bot.sendMessage(chatId, "Uploading... 📤");

    await bot.sendVideo(chatId, file);

    fs.unlinkSync(file);
  } catch (e) {
    bot.sendMessage(chatId, "❌ Failed");
  }
});

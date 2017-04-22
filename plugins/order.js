module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.reply(message, `I am looking for nearby stores!`)
    })
  },
  help: {
    command: 'orderPizza',
    text: `Say "I want a pizza" to our bot and she will start working on it`
  }
}

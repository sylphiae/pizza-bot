const pizzapi = require('dominos')

module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.reply(message, `I am looking for nearby stores!`)
      pizzapi.Util.findNearbyStores('11 Times Square, New York, NY 10036', 'Delivery', (storeData) => {
      	var storesInfo = storeData.result.Stores.filter(store => {
      		return store.IsOnlineNow && store.IsOnlineCapable && store.IsOpen
      	}).map(store => {
      		var address = store.AddressDescription.split('\n')
      		address = address[0] + ' ' + address[1] + '\n'
      		return store.StoreID + address
      	})
      	.join(' ')
      	bot.reply(message, 'I have found these stores: ' + '\r\n' + storesInfo)
      })
    })
  },
  help: {
    command: 'orderPizza',
    text: `Say "I want a pizza" to our bot and she will start working on it`
  }
}

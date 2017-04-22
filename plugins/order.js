const pizzapi = require('dominos')

module.exports = {
  init: (controller) => {
    controller.hears([/I want a pizza/], ['direct_message', 'direct_mention'], (bot, message) => {
      bot.createConversation(message, setUpConvo)

      function setUpConvo(err, convo) {
      	convo.addMessage({text: `I will find you a pizza!`, action: 'thread_2'}, 'thread_1')
      	convo.addQuestion('Where do you want the pizza to be delivered?', (responseObj) => {
      		convo.setVar('address', responseObj.text)
      		console.log(responseObj)
      		pizzapi.Util.findNearbyStores(responseObj.text, 'Delivery', (storeData) => {
		      	var storesInfo = storeData.result.Stores.filter(store => {
		      		return store.IsOnlineNow && store.IsOnlineCapable && store.IsOpen
		      	}).map(store => {
		      		var address = store.AddressDescription.split('\n')
		      		address = address[0] + ' ' + address[1] + '\n'
		      		return store.StoreID + address
		      	}).join(' ')
		      	bot.reply(message, 'I have found these stores: ' + '\r\n' + storesInfo)
      		});
      		convo.gotoThread('thread_3')
      	}, {}, 'thread_2')
      	convo.addMessage('Here is your address: {{ vars.address }}', 'thread_3')

      	convo.activate()
      	convo.gotoThread('thread_1')
      };
    })
  },
  help: {
    command: 'orderPizza',
    text: `Say "I want a pizza" to our bot and she will start working on it`
  }
}

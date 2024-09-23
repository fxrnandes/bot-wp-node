// marketingHandler.js
const { userStates } = require('./stateManager');
const { mainMenuMessage, invalidOptionMessage } = require('./messages');

function handleMarketingMenu(client, message, userId) {
    const userState = userStates[userId];
    const options = {
        '1': 'Oferecemos diversos pacotes de publicidade. Entre em contato para mais informações.',
        '2': 'Estamos abertos a novas parcerias. Fale conosco para saber mais.',
        '3': 'Siga-nos nas redes sociais para ficar por dentro das novidades.',
        '4': 'Confira nossos próximos eventos:\n\n1. 26/10 - Mares do sul\n2. 20/12 - Chegada do Papai Noel',
        '5': mainMenuMessage,
    };

    if (!Object.keys(options).includes(message.body)) {
        client.sendMessage(userId, invalidOptionMessage);
        return;
    }

    if (message.body === '5') {
        userState.menu = 'main';
    }

    client.sendMessage(userId, options[message.body]);
}

module.exports = { handleMarketingMenu };

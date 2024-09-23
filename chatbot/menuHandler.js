// menuHandler.js
const { userStates } = require('./stateManager');
const { mainMenuMessage, invalidOptionMessage } = require('./messages');
const { handleSecretariaMenu } = require('./secretariaHandler');
const { handleMarketingMenu } = require('./marketingHandler');

function handleMenu(client, message, userId) {
    const userState = userStates[userId];

    // Responde ao menu principal
    if (userState.menu === 'main') {
        if (!['1', '2'].includes(message.body)) {
            client.sendMessage(userId, invalidOptionMessage);
            return;
        }

        if (message.body === '1') {
            userState.menu = 'secretaria';
            client.sendMessage(userId, secretariaMenuMessage);
        } else if (message.body === '2') {
            userState.menu = 'marketing';
            client.sendMessage(userId, marketingMenuMessage);
        }
    }

    // Delegar para os submenus
    if (userState.menu === 'secretaria') {
        handleSecretariaMenu(client, message, userId);
    } else if (userState.menu === 'marketing') {
        handleMarketingMenu(client, message, userId);
    }
}

module.exports = { handleMenu };

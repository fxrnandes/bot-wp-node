const { userStates } = require('./stateManager');
const { mainMenuMessage, secretariaMenuMessage, marketingMenuMessage, invalidOptionMessage } = require('./messages');

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

    // Responde ao submenu da Secretaria
    if (userState.menu === 'secretaria') {
        handleSecretariaMenu(client, message, userId);
    }

    // Responde ao submenu de Marketing
    if (userState.menu === 'marketing') {
        handleMarketingMenu(client, message, userId);
    }
}

function handleSecretariaMenu(client, message, userId) {
    const userState = userStates[userId];
    const options = {
        '1': 'Nosso horário de atendimento é de segunda a sexta, das 8h às 18h30.',
        '2': 'As mensalidades são de R$150,00 e podem ser pagas até o dia 10 de cada mês.',
        '3': 'Para questões financeiras, por favor, entre em contato com nosso setor de cobrança.',
        '4': 'Oferecemos diversas atividades como futebol, natação e vôlei. Consulte nossa secretaria para mais detalhes.',
        '5': 'Por favor, descreva sua dúvida para que possamos ajudar.',
        '6': mainMenuMessage,
    };

    if (!Object.keys(options).includes(message.body)) {
        client.sendMessage(userId, invalidOptionMessage);
        return;
    }

    if (message.body === '6') {
        userState.menu = 'main';
    }

    client.sendMessage(userId, options[message.body]);
}

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

module.exports = { handleMenu };

// secretariaHandler.js
const { userStates } = require('./stateManager');
const { mainMenuMessage, invalidOptionMessage } = require('./messages');

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

module.exports = { handleSecretariaMenu };

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();
const userStates = {}; // Armazena o estado atual do menu de cada usuário

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', (message) => {
    const userId = message.from;

    // Inicializa o estado do usuário se não existir
    if (!userStates[userId]) {
        userStates[userId] = { menu: 'main' };
    }

    // Envia mensagem de boas-vindas na primeira mensagem do usuário
    if (message.body && !message.fromMe && userStates[userId].menu === 'main') {
        client.sendMessage(
            userId,
            'Olá! Seja bem-vindo ao atendimento do Clube Atlético Baependi, em que posso ajudar?\n\n' +
            '1. Secretaria\n' +
            '2. Marketing\n'
        );
    }

    // Menu de opções para a Secretaria
    if (message.body === '1' && userStates[userId].menu === 'main') {
        userStates[userId].menu = 'secretaria';
        client.sendMessage(
            userId,
            'Você selecionou Secretaria. Escolha uma opção:\n\n' +
            '1. Horário de atendimento\n' +
            '2. Informações sobre mensalidade\n' +
            '3. Financeiro\n' +
            '4. Atividades\n' +
            '5. Outras dúvidas\n' +
            '6. Voltar'
        );
    }

    // Respostas genéricas para o submenu da Secretaria
    if (userStates[userId].menu === 'secretaria') {
        switch (message.body) {
            case '1':
                client.sendMessage(userId, 'Nosso horário de atendimento é de segunda a sexta, das 8h às 18h30.');
                break;
            case '2':
                client.sendMessage(userId, 'As mensalidades são de R$150,00 e podem ser pagas até o dia 10 de cada mês.');
                break;
            case '3':
                client.sendMessage(userId, 'Para questões financeiras, por favor, entre em contato com nosso setor de cobrança.');
                break;
            case '4':
                client.sendMessage(userId, 'Oferecemos diversas atividades como futebol, natação e vôlei. Consulte nossa secretaria para mais detalhes.');
                break;
            case '5':
                client.sendMessage(userId, 'Por favor, descreva sua dúvida para que possamos ajudar.');
                break;
            case '6': // Voltar para o menu principal
                userStates[userId].menu = 'main';
                client.sendMessage(
                    userId,
                    'Voltando ao menu principal...\n\n' +
                    '1. Secretaria\n' +
                    '2. Marketing\n'
                );
                break;
        }
    }

    // Menu de opções para o Marketing
    if (message.body === '2' && userStates[userId].menu === 'main') {
        userStates[userId].menu = 'marketing';
        client.sendMessage(
            userId,
            'Você selecionou Marketing. Escolha uma opção:\n\n' +
            '1. Publicidade\n' +
            '2. Parcerias\n' +
            '3. Redes Sociais\n' +
            '4. Eventos\n' +
            '5. Voltar'
        );
    }

    // Respostas genéricas para o submenu de Marketing
    if (userStates[userId].menu === 'marketing') {
        switch (message.body) {
            case '1':
                client.sendMessage(userId, 'Oferecemos diversos pacotes de publicidade. Entre em contato para mais informações.');
                break;
            case '2':
                client.sendMessage(userId, 'Estamos abertos a novas parcerias. Fale conosco para saber mais.');
                break;
            case '3':
                client.sendMessage(userId, 'Siga-nos nas redes sociais para ficar por dentro das novidades.');
                break;
            case '4':
                client.sendMessage(userId, 'Confira nossos eventos em nosso calendário online.');
                break;
            case '5': // Voltar para o menu principal
                userStates[userId].menu = 'main';
                client.sendMessage(
                    userId,
                    'Voltando ao menu principal...\n\n' +
                    '1. Secretaria\n' +
                    '2. Marketing\n'
                );
                break;
        }
    }
});

client.initialize();

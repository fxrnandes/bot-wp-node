const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { handleMenu } = require('./menuHandler');
const { initializeUserState } = require('./stateManager');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', (message) => {
    const userId = message.from;

    // Inicializa o estado do usuário
    initializeUserState(userId);

    // Lida com a mensagem recebida e o menu atual
    handleMenu(client, message, userId);
});

client.on('error', (err) => {
    console.error('Erro no cliente:', err);
});

client.initialize();

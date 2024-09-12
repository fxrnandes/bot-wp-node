const userStates = {};

function initializeUserState(userId) {
    if (!userStates[userId]) {
        userStates[userId] = { menu: 'main' };
    }
}

module.exports = { userStates, initializeUserState };

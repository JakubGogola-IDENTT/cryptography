const crypto = require('crypto');
const yargs = require('yargs');
const { createFileStore } = require('./createFileStore.js');

const {
    argv: { password, keyId },
} = yargs.options({
    password: { type: 'string', demandOption: true },
    keyId: { type: 'string', demandOption: true },
});

const onKeyCreated = async (err, key) => {
    if (err) {
        console.error(err);
        return;
    }

    const store = await createFileStore('keyStore.json');

    store.saveKeys([
        {
            keyID: keyId,
            password,
            privateData: key.toString('hex'),
        },
    ]);
};

const generateKey = () => {
    if (!password) {
        console.error('Please, provide password');
        return;
    }

    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 14, 16, 'sha256', onKeyCreated);
};

generateKey();

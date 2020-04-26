const crypto = require('crypto');
const inc = require('increment-buffer');
const { createFileStore } = require('../key-store/createFileStore');

let iv = crypto.randomBytes(16);

const encryptMessage = (keyId, password, keyStorePath) => async (message) => {
    const store = await createFileStore(keyStorePath);
    const key = store.getPrivateKeyData(keyId, password);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    const encrypted = Buffer.concat([iv, cipher.update(message), cipher.final()]);

    iv = inc(iv);

    return encrypted;
};

const oracle = (keyId, password, keyStorePath) => async (request, response) => {
    const { m: message } = request.query;

    const encrypted = await encryptMessage(keyId, password, keyStorePath)(message);

    response.send({
        cipherText: encrypted.toString('hex'),
    });
};

const challenge = (keyId, password, keyStorePath) => async (request, response) => {
    const { m1: message1, m2: message2 } = request.query;

    if (!message1 || !message2) {
        response.status(400).send('Missing params: m1, m2');
        return;
    }

    if (message1.length !== message2.length) {
        response.status(400).send('Messages must have the same length');
        return;
    }

    const randomBit = crypto.randomBytes(1)[0] % 2;

    const encrypted = await encryptMessage(
        keyId,
        password,
        keyStorePath
    )(randomBit ? message1 : message2);

    response.send({
        cipherText: encrypted.toString('hex'),
    });
};

module.exports = {
    oracle,
    challenge,
};

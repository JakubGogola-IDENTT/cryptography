const fetch = require('node-fetch');
const { stringify } = require('query-string');
const xor = require('buffer-xor');
const inc = require('increment-buffer');

const URL = 'http://localhost:3000';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const sendMessageToEncrypt = (message) => {
    return fetch(
        `${URL}/oracle?${stringify({
            m: message,
        })}`,
        {
            method: 'GET',
            headers,
        }
    )
        .then((response) => response.json())
        .then((json) => {
            const { cipherText } = json;

            return cipherText;
        })
        .catch(console.error);
};

const sendMessagesToChallenge = (message1, message2) => {
    return fetch(
        `${URL}/challenge?${stringify({
            m1: message1,
            m2: message2,
        })}`,
        {
            method: 'GET',
            headers,
        }
    )
        .then((response) => response.json())
        .then((json) => {
            const { cipherText } = json;

            return cipherText;
        })
        .catch(console.error);
};

const distinguish = (c0, c1) => {
    if (c0 === c1) {
        return 'm0';
    }

    return 'm1';
}

const runChallenge = async () => {
    const m = Buffer.alloc(16, 0).toString('hex');
    const data = await sendMessageToEncrypt(m);

    const dataBuff = Buffer.from(data, 'hex');

    const iv0 = dataBuff.slice(0, 16);
    const c = dataBuff.slice(16);

    const iv1 = inc(iv0);

    const m0 = Buffer.alloc(16, 1).toString('hex');
    const m1 = xor(iv0, iv1).toString('hex');

    const challengeData = await sendMessagesToChallenge(m0, m1);

    const challengeDataBuff = Buffer.from(challengeData, 'hex');
    const c1 = challengeDataBuff.slice(16);

    console.log(distinguish(c, c1));
};

runChallenge();

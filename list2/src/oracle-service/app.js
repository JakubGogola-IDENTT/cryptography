const express = require('express');
const yargs = require('yargs');
const { oracle, challenge } = require('./routes');

const { password, keyId, keyStorePath } = yargs.options({
    password: { type: 'string', demandOption: true },
    keyId: { type: 'string', demandOption: true },
    keyStorePath: { type: 'string', demandOption: true },
}).argv;

const PORT = 3000;
const app = express();

app.get('/oracle', oracle(keyId, password, keyStorePath));
app.get('/challenge', challenge(keyId, password, keyStorePath));

app.listen(PORT, async () => {
    console.log(`App is running on port ${PORT}`);
});

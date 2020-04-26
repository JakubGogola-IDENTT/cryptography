const yargs = require('yargs');
const { createFileStore } = require('./src/key-store/createFileStore');
const { ALGORITHMS, CBC } = require('./src/constants/encryptionAlgorithms');
const { MODES, ENCRYPTION, DECRYPTION } = require('./src/constants/modes');
const { encryptFile } = require('./src/encryption/encryptFile');
const { decryptFile } = require('./src/encryption/decryptFile');

const { argv } = yargs.options({
    algorithm: {
        type: 'string',
        demandOption: true,
        choices: ALGORITHMS,
        default: CBC,
        description: 'encryption algorithm',
    },
    mode: {
        type: 'string',
        demandOption: true,
        choices: MODES,
        default: ENCRYPTION,
        description: 'program mode',
    },
    inputFile: { type: 'string', demandOption: true, description: 'path to input file' },
    outputFile: { type: 'string', demandOption: true, description: 'path to output file' },
    password: { type: 'string', demandOption: true, description: 'password to keystore' },
    keyId: { type: 'string', demandOption: true, description: 'ID of key in keystore' },
});

const run = async () => {
    const { keyId, password, mode, algorithm, inputFile, outputFile } = argv;

    const store = await createFileStore('keyStore.json');
    const key = store.getPrivateKeyData(keyId, password);

    if (mode === ENCRYPTION) {
        encryptFile(algorithm, inputFile, outputFile, key);
    } else if (mode === DECRYPTION) {
        decryptFile(algorithm, inputFile, outputFile, key);
    }
};

run();

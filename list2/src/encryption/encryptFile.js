const fs = require('fs');
const crypto = require('crypto');

const encryptFile = (algorithmType, inputFile, outputFile, key) => {
    const algorithm = `aes-256-${algorithmType}`;
    const iv = crypto.randomBytes(16);

    const input = fs.readFileSync(inputFile);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encryptedData = Buffer.concat([iv, cipher.update(input), cipher.final()]);

    fs.writeFileSync(outputFile, encryptedData);
};

module.exports = {
    encryptFile,
};

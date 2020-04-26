const fs = require('fs');
const crypto = require('crypto');

const decryptFile = (algorithmType, inputFile, outputFile, key) => {
    const algorithm = `aes-256-${algorithmType}`;

    const input = fs.readFileSync(inputFile);

    const iv = input.slice(0, 16);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    const decrypted = Buffer.concat([decipher.update(input.slice(16)), decipher.final()]);

    fs.writeFileSync(outputFile, decrypted);
};

module.exports = {
    decryptFile,
};

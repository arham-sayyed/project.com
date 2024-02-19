const crypto = require('crypto');
const fs = require('fs');

// Function to generate RSA keys
const generateRSAKeys = () => {
    try {
        return {
            publicKey: fs.readFileSync('./public.pem'),
            privateKey: fs.readFileSync('./private.pem')
        };
    } catch (err) {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        fs.writeFileSync('./public.pem', publicKey);
        fs.writeFileSync('./private.pem', privateKey);
        return { publicKey, privateKey };
    }
};
// Function to encrypt data using RSA public key
const encryptRSA = (data, publicKeyPath = './public.pem') => {
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    const encryptedData = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING // Specify OAEP padding
    }, Buffer.from(data));
    return encryptedData.toString('base64');
};

// Function to decrypt data using RSA private key
const decryptRSA = (encryptedData, privateKeyPath = './private.pem') => {
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const decryptedData = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING // Specify OAEP padding
    }, Buffer.from(encryptedData, 'base64'));
    return decryptedData.toString('utf8');
};

module.exports = {
    generateRSAKeys,
    encryptRSA,
    decryptRSA
};

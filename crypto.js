var crypto = require('crypto');
const defPassword = '12345678901234567890123456789012';
const defIV = '1234567890123456';

module.exports = {
    encrypt: (text, algorithm, password, iv) => {
        let cipher = crypto.createCipheriv(algorithm, password || defPassword, iv || defIV);

        return new Promise((resolve, reject) => {
            let encrypted = '';
            cipher.on('readable', () => {
                let data = cipher.read();
                if (data) {
                    encrypted += data.toString('hex');
                }
            });
            cipher.on('end', () => {
                resolve(encrypted);
            });

            cipher.write(text);
            cipher.end();
        });
    },
    decrypt: (text, algorithm, password, iv) => {
        let decipher = crypto.createDecipheriv(algorithm, password || defPassword, iv || defIV);

        return new Promise((resolve, reject) => {
            let decrypted = '';
            decipher.on('readable', () => {
                let data = decipher.read();
                if (data) {
                    decrypted += data.toString('utf8');
                }
            });
            decipher.on('end', () => {
                resolve(decrypted);
            });

            decipher.write(text, 'hex');
            decipher.end();
        });
    }
};

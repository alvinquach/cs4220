const crypto = require('crypto');

const findString = (base = "Hello, World!") => {
    let nonce = 1;
    while (true) {
        const string = base + nonce++;
        const hash = crypto.createHash('sha256')
            .update(string)
            .digest('hex');
        if (hash.indexOf("000") == 0) {
            console.log(`The 'SHA-256' digest of '${string}' is: ${hash}`);
            return;
        }
    }

}

findString();
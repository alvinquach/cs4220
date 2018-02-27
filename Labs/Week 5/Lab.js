// CS4220 Spring 2018
// Week 5 Lab
// Alvin Quach, 300793745

const crypto = require('crypto'),
    request = require('request'),
    fs = require('fs'),    
    path = require('path');


// Question 1

const question1 = (base = "Hello, World!") => {
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

console.log() // Line break
question1();


// Question 2

const question2 = () => {
    const publicKeyPath = path.resolve('keys', 'public_key.pem');
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    request("http://albertcervantes.com/cs4220/messages.json", (err, res, body) => {
        if (err) {
            console.log("Error:", err);
            return;
        }

        // No more sanitation checks...
        const messages = JSON.parse(body);
        for (const message of messages) {
            const verify = crypto.createVerify('RSA-SHA256');
            verify.update(message.message);
            const valid = verify.verify(publicKey, message.signature, 'hex');
            console.log(`${valid} - ${message.message}`);
        }
        
    });
}


console.log(); // Line break
question2();
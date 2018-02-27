// CS4220 Spring 2018
// Week 5 Lab
// Alvin Quach, 300793745

const crypto = require('crypto'),
    request = require('request');


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

    const publicKeyUrl = "https://raw.githubusercontent.com/cydneymikel/CS4220/master/Week05/examples/crypto/signing/keys/public_key.pem";
    const dataUrl = "http://albertcervantes.com/cs4220/messages.json";

    let publicKey, data;

    const validateData = () => {
        if (!publicKey || !data) {
            return;
        }
        // No more sanitation checks...
        for (const message of data) {
            const verify = crypto.createVerify('RSA-SHA256');
            verify.update(message.message);
            const valid = verify.verify(publicKey, message.signature, 'hex');
            console.log(`${valid} - ${message.message}`);
        }
    };

    // Get the public key from github.
    request(publicKeyUrl, (err, res, body) => {
        if (err) {
            console.log("Error:", err);
            return;
        }
        publicKey = body;
        validateData();
    });

    // Get the list of messages.
    request(dataUrl, (err, res, body) => {
        if (err) {
            console.log("Error:", err);
            return;
        }
        data = JSON.parse(body);
        validateData();
    });
}


console.log(); // Line break
question2();
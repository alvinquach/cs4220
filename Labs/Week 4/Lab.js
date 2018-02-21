// CS4220 Spring 2018
// Week 4 Lab
// Alvin Quach, 300793745

const http = require('http');


// Question 1

const getTimes = (argument, callback) => {
    http.get(argument, res => callback(res));
};

const printTimes = (urls) => {
    const result = [];

    // Assume that requests are sent at almost exactly the same times.
    const start = new Date().getTime(); 
    
    for (const url of urls) {
        getTimes(url, res => {
            const end = new Date().getTime();
            result.push({
                url: url,
                time: end - start
            });

            // Print results after all of the requests got a response.
            if (result.length == urls.length) {
                console.log(result);
            }

        });
    }
};


// Question 2

const sendRequest = (argument) => {
    return new Promise((resolve, reject) => {
        http.get(argument, res => {
            const status = res.statusCode;
            if (status >= 200 && status < 400) {
                resolve();
            }
            else {
                reject();
            }
        });
    });
};

const printStatus = (urls) => {
    const result = {
        success: [],
        error: []
    };
    let count = 0;
    const print = () => {
        count++;
        if (count == urls.length) {
            console.log(result)
        }
    };
    for (const url of urls) {
        sendRequest(url)
        .then(() => {
            result.success.push(url);
            print();
        })
        .catch(() => {
            result.error.push(url);
            print();
        });
    }
};



// TEST

// const sample = [
//     'http://www.google.com/',
//     'http://www.spotify.com/us/',
//     'http://twitter.com/',
//     'http://google.com/nothing'
// ];

// printTimes(sample);

// printStatus(sample);
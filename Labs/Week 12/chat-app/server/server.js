const
    express = require('express'),
    path = require('path')

const
    app = express(),
    server = require('http').Server(app)

const port = 8080;

app.use(express.static(path.join(__dirname, '..', '/client')))
require('./sockets')(server)

server.listen(port)
console.log(`Server listening on port ${port}`)
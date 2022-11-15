const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const httpolyglot = require('httpolyglot')
const https = require('https')
const cors = require('cors');

//////// CONFIGURATION ///////////

// insert your own ssl certificate and keys
const options = {
    key: fs.readFileSync(path.join(__dirname,'..','ssl','private.key'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname,'..','ssl','certificate.crt'), 'utf-8')
}

const port = process.env.PORT || 3000
const server_host = process.env.YOUR_HOST || '0.0.0.0';

////////////////////////////

// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

require('./routes')(app.use(cors()));

const httpsServer = httpolyglot.createServer(options, app.use(cors()))
// const httpsServer = httpolyglot.createServer(app)
const io = require('socket.io')(httpsServer, {
    cors: {
        origin: "*",
        methods: "*"
    }
});
require('./socketController')(io)

httpsServer.listen(port, server_host, () => {
    console.log(`listening on port ${port}`)
})

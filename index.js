require('dotenv').config();
const os = require('os');
const path = require('path');
const fs = require('fs');
const key = fs.readFileSync('./dev_cert_keys/server.key');
const cert = fs.readFileSync('./dev_cert_keys/server.crt');
const express = require('express');
const app = express();
const server = require('https').createServer({key, cert}, app);
const io = require('socket.io')(server, {
  pingInterval: 5000,
  pingTimeout: 10000,
  perMessageDeflate: false
});
const { ExpressPeerServer } = require('peer');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const memStore = {
  viewerSocket: null,
  webcamLive: false
}

const Webcam = require('./webcam');

const webcam = new Webcam();

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: '/peer'
});

peerServer.on('connection', client => {
  console.log(`${client.id} connected`);
});

peerServer.on('disconnect', async client => {
  console.log(`${client.id} disconnected`);
  if (client.id === 'viewer' && memStore.webcamLive) {
    console.log('stop webcam');
    await webcam.stop();
    memStore.webcamLive = false;
  }
});

const {
  WHITE_LISTED_DOMAINS
} = require('./config');

const PORT = 5000;

const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    if (WHITE_LISTED_DOMAINS.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('I am sorry! Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(peerServer);

require('./messaging')(io, webcam, memStore);
require('./routing')(app, io, webcam, memStore);

server.listen(PORT, () =>
  console.log(`Server is listening at port https://${os.hostname}:${PORT}`)
);
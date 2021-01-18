const app = require('express')();
const io = require('socket.io')(app, {
  perMessageDeflate: false
});

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server is listening to port ${PORT}`)
);

app.use('/', express.static(__dirname + '/build'));

require('./routing')(app, io);
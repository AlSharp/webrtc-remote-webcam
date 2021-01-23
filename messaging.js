module.exports = (io, memStore) => {
  io.of('ws').on('connect', (socket) => {
    const {client} = socket.handshake.query;
    memStore[`${client}Socket`] = socket;
    console.log(`${client} socket with id ${socket.id} connected`);

    if (client === 'viewer') {
      socket.on('viewerReady', () => {
        console.log('creating video stream...');
      })
    }

    if (client === 'webcam') {
      socket.on('webcamReady', () => {
        console.log('webcam ready');
      })
    }
  })
}
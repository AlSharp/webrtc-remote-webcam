module.exports = (io, memStore) => {
  io.of('webcam').on('connect', socket => {
    console.log('socket id', socket.id, 'connected');
    memStore.socketId = socket.id;

    socket.on('clientReady', () => {
      console.log('creating video stream...');
    })
  })
}
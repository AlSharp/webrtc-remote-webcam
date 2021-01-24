module.exports = (io, webcam, memStore) => {
  io.of('ws').on('connect', socket => {
    memStore.viewerSocket = socket;
    console.log(`Viewer socket with id ${socket.id} connected`);

    socket.on('viewerReady', async () => {
      if (!memStore.webcamLive) {
        console.log('creating video stream...');
        await webcam.start();
        memStore.webcamLive = true;
        console.log('video stream was created');
      } else {
        console.log('webcam is already live. Will restart it');
        await webcam.restart();
      }
    })
  })
}
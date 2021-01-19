import React, {useEffect} from 'react';
import SocketIOClient from 'socket.io-client';

const App = () => {

  useEffect(() => {
    const {protocol, hostname} = window.location;
    const serverAddr = protocol + '//' + hostname + ':5000' + '/webcam';
    const socket = SocketIOClient(serverAddr, {
      perMessageDeflate: false
    })

    socket.on('connect', () => {
      socket.emit('clientReady');
    });
  }, [])

  useEffect(() => {
    const video = document.getElementById('video');
    window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.log('Error: ', error);
      })
  }, [])

  return(
    <div className="App">
      <h1>Remote Webcam</h1>
      <div className="camera">
        <video id="video">Video stream is not available.</video>
      </div>
    </div>
  )
}

export default App;
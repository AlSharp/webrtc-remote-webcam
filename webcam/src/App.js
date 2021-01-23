import React, {useEffect} from 'react';
import SocketIOClient from 'socket.io-client';
import Peer from 'peerjs';

const App = () => {

  useEffect(() => {
    const {protocol, hostname} = window.location;
    const serverAddr = protocol + '//' + hostname + ':5000' + '/ws';
    const socket = SocketIOClient(serverAddr, {
      perMessageDeflate: false,
      query: {
        client: 'webcam'
      }
    })

    socket.on('connect', () => {
      socket.emit('webcamReady');
    });
  }, [])

  useEffect(() => {
    const peer = new Peer('webcam', {
      host: '/',
      port: 5000,
      path: '/peer',
      secure: true,
      debug: 3
    })

    peer.on('open', id => {
      peer.on('call', call => {
        window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
          .then(stream => {
            call.answer(stream);
            call.on('stream', remoteStream => {
              const video = document.getElementById('video');
              video.srcObject = remoteStream;
              video.play();
            })
          })
          .catch(error => {
            console.log('Error: ', error);
          })
      })
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
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
        client: 'viewer'
      }
    })

    socket.on('connect', () => {
      socket.emit('viewerReady');
    });
  }, [])

  useEffect(() => {
    const peer = new Peer('viewer', {
      host: '/',
      port: 5000,
      path: '/peer',
      secure: true,
      debug: 3
    })

    peer.on('open', id => {
      window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          const call = peer.call('webcam', stream);
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
  }, [])

  return(
    <div className="App">
      <h1>Remote Webcam Viewer</h1>
      <div className="camera">
        <video id="video">Video stream is not available.</video>
      </div>
    </div>
  )
}

export default App;
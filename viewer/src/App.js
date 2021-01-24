import React, {useEffect} from 'react';
import SocketIOClient from 'socket.io-client';
import Peer from 'peerjs';

const App = () => {

  useEffect(() => {
    const {protocol, hostname} = window.location;
    const serverAddr = protocol + '//' + hostname + ':5000' + '/ws';
    const socket = SocketIOClient(serverAddr, {
      perMessageDeflate: false
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
      debug: 0
    })

    peer.on('open', id => {
      console.log('my peer id is ', id)
    });

    peer.on('call', call => {
      call.answer();
      call.on('stream', remoteStream => {
        const video = document.getElementById('video');
        video.srcObject = remoteStream;
        video.play();
      })
    });

    peer.on('close', () => console.log('peer is destroyed'));

    peer.on('disconnected', () => console.log('peer is disconnected'));

    peer.on('error', error => console.log('peer error: ', error));
  }, [])

  return(
    <div className="App">
      <h1>Remote Webcam Viewer</h1>
      <div className="camera">
        <video id="video" muted="muted">Video stream is not available.</video>
      </div>
    </div>
  )
}

export default App;
import React, {useEffect} from 'react';
import Peer from 'peerjs';

const App = () => {

  useEffect(() => {
    const peer = new Peer('webcam', {
      host: '/',
      port: 5000,
      path: '/peer',
      secure: true,
      debug: 0
    })

    peer.on('open', id => {
      console.log('my peer id is ', id)
      window.navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(stream => {
          const call = peer.call('viewer', stream);
        })
        .catch(error => {
          console.log('Error: ', error);
        })
    });
  }, [])

  return(
    <div className="App">
      <h1>Remote Webcam</h1>
    </div>
  )
}

export default App;
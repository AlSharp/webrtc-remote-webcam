import React, {useEffect} from 'react';

const App = () => {

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
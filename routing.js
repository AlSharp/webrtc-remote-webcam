const express = require('express');
const path = require('path');

module.exports = (app, io, webcam, memStore) => {
  app.use('/viewer', express.static(path.join(__dirname, 'viewer_build')));
  app.get('/viewer', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewer_build', 'index.html'))
  })

  app.use('/webcam', express.static(path.join(__dirname, 'webcam_build')));
  app.get('/webcam', (req, res) => {
    res.sendFile(path.join(__dirname, 'webcam_build', 'index.html'))
  })
}
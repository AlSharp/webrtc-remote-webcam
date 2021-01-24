# webrtc-remote-webcam

1. npm install in root, viewer, webcam folders

2. Generate self-signed sertificates and put them in dev_cert_keys folder

`openssl req -nodes -new -x509 -keyout server.key -out server.cert`

server.crt
server.key

2. Add .env file with following content:

```
DISPLAY=:99
```

3. Create systemd xvfb.service in /etc/systemd/system:

`sudo apt-get install -y xvfb`

```
[Unit]
Description=X Virtual Buffer Service
After=network.target

[Service]
User=root
ExecStart=/usr/bin/Xvfb -ac :99 -screen 0 1280x1024x16

[Install]
WantedBy=multi-user.target
```

sudo systemctl enable xvfb.service
sudo systemctl start xvfb.service

4. Run 

in dev

`npm start` in folders webcam and viewer
`npm run dev` in root folder

Open browser and go to https://your-hostname:3000

in production

`npm run build` in folders webcam and viewer
`npm start` in root folder

Open browser and go to https://your-hostname:5000/viewer
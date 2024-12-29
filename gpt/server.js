const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path')
const fs = require('fs')

// Create an Express app
const app = express();
const PORT =  process.env.PORT || 8000; 

// Define the / route
app.get('/', (req, res) => {
  console.log("o")
  res.sendFile(path.resolve('gpt', 'gpt.html'));
});
const options = {
  key: fs.readFileSync(path.join(__dirname, '..', "localhost-key.pem")), // Path to your private key
  cert: fs.readFileSync(path.join(__dirname, '..', "localhost.pem")), // Path to your certificate
};
// Create an HTTP server
const server = http.createServer(app)

// Create a WebSocket server attached to the same HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const messageString = message.toString('utf8');
    console.log('Received:', JSON.parse(messageString));

    // Broadcast the message to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});

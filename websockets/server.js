/*
Basic WebSocket API server.
Author: Andrew Jarombek
Date: 10/11/2023
 */

const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

// Create a WebSocket server by passing the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Event handler for incoming messages
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Echo the message back to the client
        ws.send(`You said: ${message}`);
    });

    // Event handler for connection close
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.use(express.static('public'));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});

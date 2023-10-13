const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Store connected clients
const clients = [];

// Create a route to initiate SSE
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    // Add the client to the list of connected clients
    clients.push(res);

    // Send a welcome message
    res.write('data: Welcome to Server-Sent Events!\n\n');

    // Event handling for disconnect
    req.on('close', () => {
        clients.splice(clients.indexOf(res), 1);
    });
});

// Broadcast messages to all connected clients
function broadcastMessage(message) {
    clients.forEach((client) => {
        client.write(`data: ${message}\n`);
    });
}

app.use(express.static('public'));

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, () => {
    console.log('Server is listening on http://localhost:8080');
});

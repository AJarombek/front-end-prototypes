/*
Basic Server-Send Events API server.
Author: Andrew Jarombek
Date: 10/14/2023
 */

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Store connected clients
let clients = [];

// Initialize Server-Sent Events for a client
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const client = {
        id: Date.now(),
        response: res
    }

    // Add the client to the list of connected clients
    clients.push(client);

    // Send a welcome message
    res.write('data: Welcome to Server-Sent Events!\n\n');

    // Event handling for disconnect
    req.on('close', () => {
        clients = clients.filter((c) => c.id !== client.id);
    });
});

// Get the number of connected clients
// Example: curl http://localhost:8080/status
app.get('/status', (req, res) => {
    return res.json({clients: clients.length});
});

// Broadcast a message to all connected clients
// Example: curl -X POST "http://localhost:8080/broadcast?message=Hello"
app.post('/broadcast', (req, res) => {
    const message = req.query.message;
    broadcastMessage(message);
    return res.json({message: 'Message Broadcasted'});
});

function broadcastMessage(message) {
    clients.forEach((client) => {
        // Server-Sent Events messages are formatted as follows: data: <message>\n\n
        client.response.write(`data: ${message}\n\n`);
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

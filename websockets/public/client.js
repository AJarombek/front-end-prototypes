/*
Basic WebSocket configuration in the browser.
Author: Andrew Jarombek
Date: 10/11/2023
 */

const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const output = document.getElementById('output');

const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('message', (event) => {
    output.textContent = event.data;
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    ws.send(message);
});

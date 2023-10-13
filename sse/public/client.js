/*
Basic Server-Send Events configuration in the browser.
Author: Andrew Jarombek
Date: 10/13/2023
 */

const sseOutput = document.getElementById('sse-output');
const eventSource = new EventSource('http://localhost:8080/sse');

eventSource.onmessage = (event) => {
    const message = event.data;
    sseOutput.innerHTML += '<p>' + message + '</p>';
};

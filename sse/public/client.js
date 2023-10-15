/*
Basic Server-Send Events configuration in the browser.
Author: Andrew Jarombek
Date: 10/13/2023
 */

const sseOutput = document.getElementById('sse-output');
let eventSource = new EventSource('http://localhost:8080/sse');

eventSource.onmessage = (event) => {
    const message = event.data;
    sseOutput.innerHTML += '<p>' + message + '</p>';
};

eventSource.onopen = () => {
    console.log('SSE connection opened');
};

eventSource.onerror = (error) => {
    console.error('SSE error:', error);

    // Implement reconnect logic here
    setTimeout(() => {
        // Close the existing connection
        eventSource.close();

        // Create a new connection
        eventSource = new EventSource('http://localhost:8080/sse');
    }, 3000);
};

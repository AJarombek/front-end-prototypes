/*
Puppeteer e2e test for the server-sent events program.
Author: Andrew Jarombek
Date: 11/25/2023
 */

const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    // Open the web page
    await page.goto('http://localhost:8080');

    console.log('Waiting for the SSE connection to open...');

    // Send events to the client
    await page.evaluate(async () => {
        await fetch('http://localhost:8080/broadcast?message=Hello', { method: 'POST' });
        await fetch('http://localhost:8080/broadcast?message=Hello%20World', { method: 'POST' });
    });

    console.log('Waiting for the SSE connection to close...');

    // Get the number of connected clients
    const numClients = await page.evaluate(async () => {
        const response = await fetch('http://localhost:8080/status');
        const data = await response.json();
        return data.clients;
    });

    console.log(`Number of connected clients: ${numClients}`);

    // Validate the number of connected clients
    assert.strictEqual(numClients, 1);

    // Validate the displayed messages
    const messages = await page.evaluate(() => {
        const messages = [];
        const elements = document.querySelectorAll('#sse-output p');
        elements.forEach(element => messages.push(element.textContent));
        return messages;
    });

    console.log('Messages received from the SSE connection: ', messages)

    assert.deepStrictEqual(messages, ['Welcome to Server-Sent Events!', 'Hello', 'Hello World']);

    await browser.close();
})();

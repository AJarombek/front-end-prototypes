/*
Puppeteer e2e test for the basic websockets program.
Author: Andrew Jarombek
Date: 10/12/2023
 */

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    let exitCode = 0;

    // Open the WebSocket chat app
    await page.goto('http://localhost:8080');

    // Wait for the chat app to load
    await page.waitForSelector('#message');

    // Type a message in the input field and click the "Send" button
    await page.type('#message', 'Hello, world!');
    await page.click('#send');

    // Wait for the server's response
    await page.waitForSelector('#output');

    // Check if the message was echoed back
    const message = await page.$eval('#output', (element) => element.textContent);
    if (message === 'You said: Hello, world!') {
        console.log('E2E Test Passed: Message was echoed back.');
    } else {
        console.error('E2E Test Failed: Message was not echoed back.');
        exitCode = 1;
    }

    await browser.close();
    process.exit(exitCode);
})();

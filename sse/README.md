### Overview

Basic server-side events code using an Express server written in Node.js.

### Commands

**Start the Server and Send Events to the Client**

```bash
node server.js &

# Send events to the client
curl -X POST "http://localhost:8080/broadcast?message=Hello"
curl -X POST "http://localhost:8080/broadcast?message=Hello%20World"

# Get the number of clients connected to the server
curl http://localhost:8080/status
```

**Start the Server and Run the E2E Test**

```bash
node server.js &
node e2e-test.js
```

### Files

| Filename       | Description                                                                        |
|----------------|------------------------------------------------------------------------------------|
| `public`       | Static JS files served to the browser.                                             |
| `index.html`   | Entrypoint to the web application that subscribes to a Server-Sent Event endpoint. |
| `package.json` | npm application definition.  Lists all dependencies.                               |
| `server.js`    | Express server that serves static HTML/JS content and handles Server-Sent Events.  |
| `yarn.lock`    | Specific versions of dependencies used by yarn.                                    |
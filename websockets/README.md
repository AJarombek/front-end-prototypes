### Overview

Basic websockets code using an Express server written in Node.js.

### Commands

**Start the Server and Run the E2E Test**

```bash
node server.js &
node e2e-test.js
```

### Files

| Filename       | Description                                                                       |
|----------------|-----------------------------------------------------------------------------------|
| `public`       | Static JS files served to the browser.                                            |
| `index.html`   | Entrypoint to the web application that makes Websocket requests.                  |
| `package.json` | npm application definition.  Lists all dependencies.                              |
| `server.js`    | Express server that serves static HTML/JS content and handles Websocket requests. |
| `yarn.lock`    | Specific versions of dependencies used by yarn.                                   |

const http = require('http');
const express = require('express');

// Create an Express app
const app = express();

// Simple 200 OK response handler
function handleHttpRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('200 OK');
}

// Middleware for processing streaming requests
app.use((req, res, next) => {
  // Print stream data (this is useful to check the HTTP streaming performance)
  req.on('data', (chunk) => {
    console.log(`Received chunk: ${chunk.length} bytes`);
  });

  req.on('end', () => {
    console.log('Streaming ended');
    next(); // Pass to the next handler
  });
});

// Route to test HTTP streaming and respond with 200 OK
app.post('/stream', (req, res) => {
  handleHttpRequest(req, res); // Respond with a simple 200 OK message
});

const PORT = process.argv[2] || 8080;
const server = http.createServer(app);

// Start the server
server.listen(PORT , () => {
  console.log(`L7FW app listening on port ${PORT}`);
});

// Handling socket events for low-level connection monitoring
server.on('connection', (socket) => {
  console.log('New socket connection established');

  socket.on('data', (chunk) => {
    console.log(`Socket received data: ${chunk.length} bytes`);
  });

  socket.on('end', () => {
    console.log('Socket connection ended');
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

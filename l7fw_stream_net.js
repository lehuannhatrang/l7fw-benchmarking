const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
    console.log('New connection established');

    // Listen for data from the client
    socket.on('data', (data) => {
        console.log('Data received from client:', data.toString());

        const response = "HTTP/1.1 200 OK\r\nContent-Length: 2\r\n\r\nOK";
        socket.write(response);

        // socket.end();
    });

    // Handle errors
    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });

    socket.on('end', () => {
        console.log('Connection closed');
    });
});

const port = process.argv[2] || 8081;

// Start listening on the specified port
server.listen(port, () => {
    console.log(`L7FW TCP server listening on port ${port}`);
});
const http = require('http');

// Sample data
let latestData = { value: 0 };

// Function to simulate updates to the data
function updateData() {
    latestData.value++;
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // Set CORS headers to allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Handle client requests
    if (req.url === '/poll') {
        // Set a timeout to simulate updates
        setTimeout(() => {
            // Check if data has been updated
            if (latestData.value > 0) {
                // Send the updated data to the client
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(latestData));
            } else {
                // If no update, long-poll by sending a 204 status (no content) to keep the connection open
                res.writeHead(204);
                res.end();
            }
        }, 5000); // Polling interval of 5 seconds (adjust as needed)
    } else {
        // Handle other requests
        res.writeHead(404);
        res.end();
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Function to simulate data updates periodically
setInterval(updateData, 10000); // Update data every 10 seconds (adjust as needed)

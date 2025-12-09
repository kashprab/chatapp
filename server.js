const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("WebSocket server running on ws://localhost:8080");

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        // Broadcast to all other connected clients (exclude the sender)
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});
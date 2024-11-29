import Cookies from "js-cookie";

export function connectToWebSocket(userId, onMessageReceived) {
    if (!userId) {
        console.error('User ID is required to connect to WebSocket.');
        return;
    }

    // Directly use the base URL for WebSocket connections
    const socketUrl = `${process.env.NEXT_PUBLIC_SOCKET_URL}/notification/${userId}/?authorization=Bearer ${Cookies.get("access_token")}`;
    console.log("Attempting to connect to WebSocket at:", socketUrl);
    
    const socket = new WebSocket(socketUrl);
    
    socket.onopen = function() {
        console.log("Connected to WebSocket server, subscribing to user notifications...");
    };

    socket.onmessage = function(event) {
        try {
            const notification = JSON.parse(event.data);
            console.log("Received notification:", notification);
            onMessageReceived(notification);
        } catch (error) {
            console.error('Error parsing notification:', error);
        }
    };

    socket.onclose = function() {
        console.log("WebSocket connection closed.");
    };

    socket.onerror = function(error) {
        console.error('WebSocket Error:', error);
    };

    return socket;
}

export function disconnectWebSocket(socket) {
    if (socket) {
        console.log("Deactivating WebSocket connection...");
        socket.close();
    }
}

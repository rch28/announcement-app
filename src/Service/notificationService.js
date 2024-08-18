import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export function connectToWebSocket(userId, onMessageReceived) {
    if (!userId) {
        console.error('User ID is required to connect to WebSocket.');
        return;
    }
    const socketUrl = `http://127.0.0.1:8000/api/v1/ws/notification/${userId}/`;
    console.log("Attempting to connect to WebSocket at:", socketUrl);
    const socket = new SockJS(socketUrl);
    stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {},
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
            console.log("Connected to WebSocket server, subscribing to user notifications...");
            stompClient.subscribe(`/user/${userId}/notifications`, (message) => {
                try {
                    const notification = JSON.parse(message.body);
                    console.log("Received notification:", notification);
                    onMessageReceived(notification);
                } catch (error) {
                    console.error('Error parsing notification:', error);
                }
            });
        },
        onWebSocketClose: () => {
            console.log("WebSocket connection closed.");
        },
        onStompError: (frame) => {
            console.error('STOMP Error: ', frame);
        }
    });

    stompClient.activate();
}

export function disconnectWebSocket() {
    if (stompClient) {
        console.log("Deactivating WebSocket connection...");
        stompClient.deactivate();
    }
}

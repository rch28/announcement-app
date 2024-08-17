import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export function connectToWebSocket(userId, onMessageReceived) {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/v1/ws/notifications/`);
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
            stompClient.subscribe(`/user/${userId}/notifications`, (message) => {
                const notification = JSON.parse(message.body);
                onMessageReceived(notification);
            });
        },
        onStompError: (frame) => {
            console.error('STOMP Error: ', frame);
        }
    });

    stompClient.activate();
}

export function disconnectWebSocket() {
    if (stompClient) {
        stompClient.deactivate();
    }
}

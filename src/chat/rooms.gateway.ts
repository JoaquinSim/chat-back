import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

export class RommGateway {
    @SubscribeMessage('joinRoom')
    handleJoinRoom(client: Socket, @MessageBody() room: string): void {
        client.join(room);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, @MessageBody() data: { room: string, message: string }): void {
        const { room, message } = data;
        client.to(room).emit('message', message);
    }
}

import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['polling', 'websocket']
})
export class ChatGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayInit {
  usuarios_conectados = 0;
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('Esto se ejecuta cuando inicia');
  }

  handleConnection(client) {
    console.log('Usuario conectado al chat: ' + client.handshake.address)
    this.usuarios_conectados++;
    console.log(`Usuarios activos: ${this.usuarios_conectados}`);
    return this.usuarios_conectados;

  }

  handleDisconnect(client) {
    console.log('Usuario desconectado del chat: ' + client.handshake.address);
    this.usuarios_conectados--;
  }

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, message: string, client) {
    this.server.emit('newMessage', message)
    console.log('Desde back: ' + message);
  }
  
}
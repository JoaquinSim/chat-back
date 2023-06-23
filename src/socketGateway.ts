import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {origin:'*'},
  transports: ['polling', 'websocket']
})
export class ChatGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayInit {
  @WebSocketServer()
  server:Server;

  afterInit(server:any){
    console.log('Esto se ejecuta cuando inicia');
  }

  handleConnection(client){
    console.log('Usuario conectado al chat: ' +  client.handshake.address) 
  }

  handleDisconnect(client){ 
    console.log('Usuario desconectado del chat: '+ client.handshake.address);
    
  }
}
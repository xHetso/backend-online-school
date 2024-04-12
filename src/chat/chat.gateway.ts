import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/api/chat', cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatToServer')
  handleMessage(@MessageBody() message: { senderId: string; userId: string; content: string }, @ConnectedSocket() client: Socket) {
    // Логика обработки полученного сообщения и передача его всем подключенным клиентам
    this.server.emit('chatToClient', message);
  }

  // Можно добавить дополнительные обработчики событий по необходимости
}

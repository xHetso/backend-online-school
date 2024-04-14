import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/api/chat', cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatToServer')
  handleMessage(
    @MessageBody() message: { userId: string; userName: string, userSurname: string, content: string; senderId: string; senderName: string; senderSurname: string },
    @ConnectedSocket() client: Socket
  ) {
    // Обработка и передача сообщения
    const now = new Date();
    const formattedDate = now.toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' });
    const formattedTime = now.toLocaleTimeString('ru-RU', { timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit' });

    const formattedMessage = {
      date: formattedDate, // Дата в формате ДД.ММ.ГГГГ
      time: formattedTime, // Время в формате ЧЧ:ММ
      content: message.content,
      user: {
        userId: message.userId,
        name: message.userName,
        surname: message.userSurname,
      },
      sender: {
        id: message.senderId,
        name: message.senderName,
        surname: message.senderSurname
      },
    };
    console.log(formattedMessage)
    this.server.emit('chatToClient', formattedMessage);
  }
  
  

  // Можно добавить дополнительные обработчики событий по необходимости
}

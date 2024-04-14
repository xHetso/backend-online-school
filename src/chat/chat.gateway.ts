import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { readFile, writeFile } from 'fs/promises';

@WebSocketGateway({ namespace: '/api/chat', cors: true })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    // Этот метод вызывается при подключении каждого клиента
    try {
      const chatHistory = await readFile('chatMessages.json', 'utf8');
      client.emit('chatHistory', chatHistory); // Отправляем историю чата новому клиенту
    } catch (error) {
      console.error('Ошибка при чтении файла:', error);
    }
  }

  @SubscribeMessage('chatToServer')
async handleMessage(
  @MessageBody() message: { senderId: string; senderName: string, senderSurname: string, content: string; recipientId: string; recipientName: string; recipientSurname: string },
  @ConnectedSocket() client: Socket
) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString('ru-RU', { timeZone: 'Asia/Almaty' });
  const formattedTime = now.toLocaleTimeString('ru-RU', { timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit' });

  const formattedMessage = {
    date: formattedDate,
    time: formattedTime,
    content: message.content,
    sender: {
      userId: message.senderId,
      name: message.senderName,
      surname: message.senderSurname,
    },
    recipient: {
      id: message.recipientId,
      name: message.recipientName,
      surname: message.recipientSurname
    },
  };

  try {
    // Чтение текущего содержимого файла и его парсинг
    let chatHistory = [];
    try {
      const fileContent = await readFile('chatMessages.json', 'utf8');
      chatHistory = JSON.parse(fileContent);
    } catch (readError) {
      if (readError.code !== 'ENOENT') {
        throw readError; // Если ошибка не связана с отсутствием файла, пробрасываем её дальше
      }
      // Если файл не найден, начинаем с пустого массива (chatHistory уже инициализирован как [])
    }

    // Добавление нового сообщения в историю чата
    chatHistory.push(formattedMessage);

    // Запись обновлённого массива обратно в файл
    await writeFile('chatMessages.json', JSON.stringify(chatHistory, null, 2));
    this.server.emit('chatToClient', formattedMessage);
  } catch (error) {
    console.error('Ошибка при записи файла:', error);
  }
}


  // Здесь можно добавить другие методы, если это необходимо
}

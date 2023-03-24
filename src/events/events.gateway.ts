import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  wsClients = [];
  playerNum = 0;

  handleConnection(client: any) {
    Logger.log('"push!!!');
    this.wsClients.push(client);
    this.broadcast('events', 'test!!!dadasd');
    Logger.log('num: ', this.wsClients.length);
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    // this.broadcast('disconnect', {});
  }

  private broadcast(event, message: any) {
    const broadCastMessage = JSON.stringify(message);
    for (const c of this.wsClients) {
      Logger.log('"send!!!!');
      c.emit(event, broadCastMessage);
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    if (data == 1) {
      this.playerNum += 1;
      if (this.playerNum % 2) {
        return 100;
      } else {
        return 200;
      }
    }
  }

  // @SubscribeMessage('action')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   this.broadcast('response', 'test!!!dadasd');
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  @SubscribeMessage('action')
  async action(
    @MessageBody() data: number,
    @ConnectedSocket() client: Socket,
  ): Promise<number> {
    client.emit('response', 'test!!!!');
    Logger.log('"actionn!!!');
    this.broadcast('response', 'test!!!dadasd');
    return data + 200;
  }
}

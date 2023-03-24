import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  playerNum = 0;

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

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  @SubscribeMessage('action')
  async action(@MessageBody() data: number): Promise<number> {
    return data + 200;
  }
}

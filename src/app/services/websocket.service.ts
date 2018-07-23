import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../app/models/Message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  ws : WebSocket;

  createObservableSocket(url:string):Observable<string>{
    this.ws = new WebSocket(url);
    return new Observable(
      observer =>{//next, error, complete are callback and we send data to subscribers
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }

  sendMessage(message:Message,roomNumber:number,action:string){
    //send message to the server
    var tempObj = {
      messageId   : message.messageId,
      userId      : message.userId,
      nickname    : message.nickname,
      message     : message.message,
      color       : message.color,
      date        : message.date,
      roomNumber  : roomNumber,
      action      : action
    }
    this.ws.send(JSON.stringify(tempObj));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebSocketService } from "../services/websocket.service";
import { environment } from "../../environments/environment";
import { Message } from '../../app/models/Message';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentNickname:string;
  currentColor:string;
  currentUserId : string;
  private messageSource = new BehaviorSubject<Object>({});
  currentMessage = this.messageSource.asObservable();

  changeMessage(){
    this.messageSource.next(this.roomsFromServer);
  }

  //this variables is for websocket communication
  title = 'app';
  ws : WebSocket;
  url : string;
  roomsFromServer : Object;

  constructor(private wsService: WebSocketService) { 
    this.url = environment.webSocketUrl;
    this.wsService.createObservableSocket(this.url)
    .subscribe(
      data =>{
        this.roomsFromServer = JSON.parse(data);
        this.changeMessage();
      },
      err=>console.log(err),
      ()=>console.log("this observable stream is complete")
    );
  }

  sendMessageToServer(message:Message,roomNumber:number,action:string){
    console.log("client sending message to websocket server");
    this.wsService.sendMessage(message,roomNumber,action);
  }

  ChangeMessage(message: Object){
    this.currentNickname = message["nickname"];
    this.currentColor = message["color"];
    this.currentUserId = message["userId"];
  }
}

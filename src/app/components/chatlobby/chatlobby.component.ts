import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/Message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chatlobby',
  templateUrl: './chatlobby.component.html',
  styleUrls: ['./chatlobby.component.css']
})
export class ChatlobbyComponent implements OnInit {

  currentNickname:string;
  currentColor:string;
  messages_room1:Message[] = [];
  messages_room2:Message[] = [];
  messages_room3:Message[] = [];

  constructor(private data:DataService) { }

  ClearMessagesRooms(){
    this.messages_room1 = [];
    this.messages_room2 = [];
    this.messages_room3 = [];
  }

  UpdateRoomsObject(){
    this.ClearMessagesRooms();
    for (var key in this.data.roomsFromServer) {
      if(key == "1"){
        for(var i=0; i<this.data.roomsFromServer[key].length; i++){
          this.messages_room1.push(
            new Message(
              this.data.roomsFromServer[key][i].messageId,
              this.data.roomsFromServer[key][i].userId,
              this.data.roomsFromServer[key][i].nickname,
              this.data.roomsFromServer[key][i].color,
              this.data.roomsFromServer[key][i].message,
              this.data.roomsFromServer[key][i].date
            )
          );
        }
      }
      if(key == "2"){
        for(var i=0; i<this.data.roomsFromServer[key].length; i++){
          this.messages_room2.push(
            new Message(
              this.data.roomsFromServer[key][i].messageId,
              this.data.roomsFromServer[key][i].userId,
              this.data.roomsFromServer[key][i].nickname,
              this.data.roomsFromServer[key][i].color,
              this.data.roomsFromServer[key][i].message,
              this.data.roomsFromServer[key][i].date
            )
          );
        }
      }
      if(key == "3"){
        for(var i=0; i<this.data.roomsFromServer[key].length; i++){
          this.messages_room3.push(
            new Message(
              this.data.roomsFromServer[key][i].messageId,
              this.data.roomsFromServer[key][i].userId,
              this.data.roomsFromServer[key][i].nickname,
              this.data.roomsFromServer[key][i].color,
              this.data.roomsFromServer[key][i].message,
              this.data.roomsFromServer[key][i].date
            )
          );
        }
      }
    }
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message=>this.UpdateRoomsObject());
  }
}

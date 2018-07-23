import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/Message';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  @Input() roomNumber : number;
  userFontSize: number = 12;
  @Input() messages_room:Message[];

  constructor(private data:DataService) { }

  ngOnInit() {
  }

  AddFontSize(){
    this.userFontSize += 1;
  }

  ReduceFontSize(){
    this.userFontSize -= 1;
  }

  Delete(messageId:string){
    var messageToDelete:Message;
    for(let i=0;i<this.messages_room.length;i++){
      if(this.messages_room[i].messageId == messageId){
        messageToDelete = Object.assign({},this.messages_room[i]);
        this.messages_room.splice(i, 1);
      }
    }
    this.data.sendMessageToServer(messageToDelete,this.roomNumber,"remove");
  }

  SendMessage(newMessage:string){
    if(newMessage.length < 4 || newMessage.length > 255){
      alert("message should be from 4 to 255 characters")
      return;
    }
    
    var message = new Message(
      this.GenerateMessageId(),
      this.data.currentUserId,
      this.data.currentNickname,
      this.data.currentColor,
      newMessage,
      new Date(Date.now())
    )
    
    this.data.sendMessageToServer(message,this.roomNumber,"add");
  }

  GenerateMessageId(){
    return new Date().valueOf().toString() + "_" +  this.data.currentUserId;
  }
}

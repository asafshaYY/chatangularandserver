export class Message{
  constructor(
    public messageId: string,
    public userId: string,
    public nickname : string,
    public color : string,
    public message: string,
    public date: Date
  ){
  }
}
"use strict";
(function(){
	var connections = []; // list of current connections
	var http = require('http'); // http require
	var WebSocketServer = require('websocket').server; // websocket require
  var webSocketsServerPort = 8085; // choose a port number
  
  ///// logic - make room for every chat
  var rooms = {
    1 : [],
    2 : [],
    3 : []
  };
  ////
	
	var httpServer = http.createServer(function(request, response) { /* We don't need to do anything here as we're creating a WebSocket server, not an HTTP server */ });
	httpServer.listen(webSocketsServerPort, function() {
		console.log((new Date()) + " :: The server is listening on port " + webSocketsServerPort);
	});
	
	var webSocketServer = new WebSocketServer({
		httpServer: httpServer // WebSocket server is tied to a HTTP server. WebSocket request is just an enhanced HTTP request.
	});
	 
	webSocketServer.on('request', function(request) { // This callback function is called every time someone tries to connect to the WebSocket server
		console.log((new Date()) + " :: Connection from origin " + request.origin + ".");
		var connection = request.accept(null, request.origin); 
    var index = connections.push(connection); // Add connection to list of current connections
    
    //logic - sending rooms to the clients
    connection.sendUTF(JSON.stringify(rooms));
    //for every message i send the rooms 
		// user sent some message
		connection.on('message', function(message) {
      var data_from_client = JSON.parse(message.utf8Data);
      //when we delete message
      if(data_from_client.action=="remove"){
        for(let i=0;i<rooms[data_from_client.roomNumber].length;i++){
          if(rooms[data_from_client.roomNumber][i].messageId == data_from_client.messageId){
            rooms[data_from_client.roomNumber].splice(i, 1);
          }
        }
      }else{
        //case adding message
        rooms[data_from_client.roomNumber].push({
          messageId : data_from_client.messageId,
          userId    : data_from_client.userId,
          nickname  : data_from_client.nickname,
          color     : data_from_client.color,
          message   : data_from_client.message,
          date      : data_from_client.date
        });
      }
      for (var i=0; i < connections.length; i++) { // broadcast message to all current connections
        //i decide to send the rooms insted single message
        connections[i].sendUTF(JSON.stringify(rooms));
			}
		});
	 
		// user disconnected
		connection.on('close', function(connection) {
			console.log((new Date()) + " :: Peer " + connection.remoteAddress + " disconnected.");
			connections.splice(index, 1); // remove user from the list of live connections
		});
	});
})();
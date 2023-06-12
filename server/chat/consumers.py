import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

 
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        userUUID = text_data_json["userUUID"]
        messageType = text_data_json["messageType"]
        

        
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message, "userUUID":  userUUID, "messageType": messageType}
        )

   
    async def chat_message(self, event):
        message = event["message"]
        userUUID = event["userUUID"]
        messageType = event["messageType"]

        await self.send(text_data=json.dumps({"message": message, "userUUID": userUUID, "messageType": messageType}))

    const chatsCollection = require('../db').db().collection("chats");

    const { ObjectId } = require('mongodb');
    // const validator = require("validator")
    // const md5 = require('md5')
    let Chat = function(data){
    this.data = data
    this.errors =[]
    }
    
    Chat.prototype.cleanUp = async function () {
        // Clean up the data as before
        this.data = {
            senderName: this.data.senderName,
            messageContent: this.data.messageContent,
            image: this.data.image,
            receiverId: new ObjectId(this.data.receiverId),
            senderId: new ObjectId(this.data.senderId),
            sentTime: new Date(),
        };
    }
    
     Chat.prototype.sendChat = async function(){
        this.cleanUp()
        try {
            await chatsCollection.insertOne(this.data);
        } catch (error) {
            console.error("Error storing message in the database:", error);
        }
    };
    
    Chat.prototype.getChatConvo = async function(requesterId, chatContactId) {
        try {
            let chats = await chatsCollection.find({
              $or: [
                    { senderId: new ObjectId(requesterId), receiverId:  new ObjectId(chatContactId) },
                    { senderId:  new ObjectId(chatContactId), receiverId:  new ObjectId(requesterId) }
                ]
            }).toArray();
            return chats;
        } catch (error) {
            console.error("Error retrieving chat conversation:", error);
        }
    };
          
    module.exports = Chat
    
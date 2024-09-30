
   
    const Messages = require("../constants/Messages");
const JsonResponse = require("../helper/JsonResponse");
const Chat = require("../models/Chat");

exports.sendChat = async function(req, res){
    let chat = new Chat(req.body);
    await chat.sendChat();
    new JsonResponse(req, res).jsonSuccess("sent", new Messages().SUCCESSFULLY_RECEIVED)
}

exports.getChatConvo = async function(req, res){
    
    let chat = new Chat();
   let chats = await chat.getChatConvo(req.params.id, req.params.chatContactId);
   new JsonResponse(req, res).jsonSuccess(chats, new Messages().SUCCESSFULLY_RECEIVED)

}
    
    
import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import StateContext from "../StateContext";
import Axios from "axios";
const ChatInterface = () => {
  const { mentorId } = useParams("mentorId");
  console.log(mentorId);

  const [messages, setMessages] = useState([
    // { id: 1, text: "Hello! How are you?", sender: "mentor", timestamp: "10:30 AM" },
    // { id: 2, text: "I am doing well, thank you! How about you?", sender: "mentee", timestamp: "10:32 AM" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState({});
  const messageEndRef = useRef(null);
  const { user } = useContext(StateContext);
  // Scroll to the bottom when new messages are added
  useEffect(() => {
    // console.log(user.id)
    // const authToken = user.token

    // let fetchMessages = await Axios.get(`/get-my-chat/${user.id}/${mentorId}`, {
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //     "Cache-Control": "no-cache", // This will bypass the cache
    //     Pragma: "no-cache", // Additional header to ensure cache bypass
    //     Expires: "0" // Forces the request to be fresh
    //   }
    // })

    // setMessages(fetchMessages.data.data || [])
    // console.log(fetchMessages)

    async function fetchMessages() {
      console.log("Messages");
      try {
        const token = user.token;
        console.log(user.id);
        const response = await Axios.get(
          `/get-my-chat/${user.id}/${mentorId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data);
        setMessages(response.data.data);
        console.log(response);

        const userrole = user?.role === "student" ? "mentor" : "student";

        const userDataResponse = await Axios.get(
          `/${userrole}/get-by-id/${mentorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

          // http://localhost:4000/get-mentor-by-id/66fb4350880c039c9c379401
        );
        console.log("OPPOSITE USER", userDataResponse?.data.data);

        setOtherUser(userDataResponse?.data.data);

        // setIslaoding(false)
      } catch (e) {
        console.log(e);
      }
    }
    fetchMessages();

    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [user.id, mentorId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        messageContent: newMessage,
        senderName: user.role,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      await Axios.post(
        "/send-chat",
        {
          senderName: user.role,
          messageContent: newMessage,
          receiverId: mentorId,
          senderId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    }
  };

  return (
    <div className="max-w-screen-md mx-auto bg-gray-100 h-screen flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Mentor Avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="font-bold text-lg">
              {otherUser?.name} {otherUser?.lName} ({otherUser?.role})
            </h2>
            {/* <p className="text-sm">Online</p> */}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderName === user?.role
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs shadow-md ${
                message.senderName === user?.role
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{message.messageContent}</p>
              <span className="text-xs text-gray-400 block mt-1 text-right">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage,AIMessage,SystemMessage

load_dotenv()
import os
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(temperature=0.2,api_key=OPENAI_API_KEY)
chat_history = []

prompt = ChatPromptTemplate.from_messages([
    ("system", """
       You are a chatbot that helps me plan my schedule. You can ask questions to understand my requirements and suggest the best schedule for me to follow. 
     Incorporate my daily activities, and personal time and put in time to study and work on projects. 
     Be clear and concise in your responses as to what I should do in every two to three hours.
     Ask me enough questions to understand my requirements properly before suggesting a schedule.
     Make sure that the respoonse is personalized to my requirements.   
    """),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human","{input}")
])

chain = prompt|llm

while(True):
    question = input("You: ")
    if question.lower() == "exit":
        break
    
    response = chain.invoke({"input":question ,"chat_history":chat_history})
    chat_history.append(HumanMessage(question))
    chat_history.append(AIMessage(response.content))
    print("Chatbot: ",response.content)
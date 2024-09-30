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
       You are a chatbot that understands the students requirements and helps build a roadmap for them given a stipulated 
         time frame. You can ask questions to understand the students requirements and suggest the best roadmap for them to 
     follow.Be clear and concise in your responses as to what the student should do in every week.
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
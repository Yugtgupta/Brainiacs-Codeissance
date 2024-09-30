from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage,AIMessage,SystemMessage

load_dotenv()
import os
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def generate_study_response(question):
    
    llm = ChatOpenAI(temperature=0.2,api_key=OPENAI_API_KEY)
    chat_history = []

    prompt = ChatPromptTemplate.from_messages([
        ("system", """
        You are a chatbot that helps to resolve any study related queries.
        Fetch educationally relevant information for the input provided.  
        """),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human","{input}")
    ])

    chain = prompt|llm
    response = chain.invoke({"input":question ,"chat_history":chat_history})
    chat_history.append(HumanMessage(question))
    chat_history.append(AIMessage(response.content))
    return response.content
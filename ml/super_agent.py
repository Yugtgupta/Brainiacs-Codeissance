from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain.agents import AgentType, initialize_agent,load_tools
load_dotenv()
os.environ["OPENAI_API_KEY"]=os.getenv("OPENAI_API_KEY")
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo")

from langchain_core.prompts import ChatPromptTemplate
def super_agent_function(input):
    prompt_template = """
        You have to decide what category does the input belong to from the the follwing options:
        1. Roadmap Generator-if a time frame in months is mentioned
        2. Schedule Planner - if a day schedule or week schedule is mentioned or some prior schedule is mentioned
        3. Any other study related query
        Only answer with the category name this is extremely important.
        The following is the input:
        {input}.
        """

    prompt = ChatPromptTemplate.from_template(template=prompt_template)
    messages=prompt.format_messages(
                input=input,
            )
    return llm.invoke(messages).content

# ans=super_agent_function("i want to complete my project by the end of the week")
# print(ans)


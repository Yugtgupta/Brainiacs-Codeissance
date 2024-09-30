from dotenv import load_dotenv
from langchain_community.document_loaders import JSONLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain
import os

# Load environment variables (to get API keys)
load_dotenv()

# Function to recommend scholarships based on user profile
def recommend_scholarships(user_profile):
    # Load environment variables
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

    # Load the JSON data from a file
    loader = JSONLoader(
        file_path='scholarship_data_transformed.json', 
        jq_schema='.[]', 
        text_content=False)
    data = loader.load()

    # Set up embeddings
    embeddings = OpenAIEmbeddings(api_key=OPENAI_API_KEY)

    # Split documents for processing
    text_splitter = RecursiveCharacterTextSplitter()
    documents = text_splitter.split_documents(data)

    # Create a FAISS vector store
    vector = FAISS.from_documents(documents, embeddings)

    # Set up language model
    llm = ChatOpenAI(api_key=OPENAI_API_KEY, temperature=0)

    # Define the prompt template
    prompt = ChatPromptTemplate.from_template("""
    Give the five best possible scheme types on which the student can apply for scholarship that matches the user profile like the caste and income and the student's academic performance and if 
    the student is a domicile of Maharashtra.
    The eligibility criteria for the scholarship should match the student's profile as much as possible, preferably 100%.

    <context>
    {context}
    </context>

    Question: {input}
    """)

    # Create a document chain with LLM and prompt
    document_chain = create_stuff_documents_chain(llm, prompt)

    # Create a retriever using the vector store
    retriever = vector.as_retriever()

    # Create a retrieval chain combining retriever and document chain
    retrieval_chain = create_retrieval_chain(retriever, document_chain)

    # Run the chain with the provided user profile
    response = retrieval_chain.invoke({"input": user_profile})

    # Return the generated recommendations from the response
    return response["answer"]

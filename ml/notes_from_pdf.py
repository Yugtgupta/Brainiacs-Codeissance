# notes_from_pdf.py

from dotenv import load_dotenv
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.vectorstores import FAISS
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

load_dotenv()

def get_pdf_text(pdf_docs):
    text = " "
    for pdf in pdf_docs:
        reader = PdfReader(pdf)
        for page in reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
        separator="\n",
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
    return vectorstore

def generate_notes_from_pdf(pdf_paths):
    llm = ChatOpenAI(temperature=0)
    prompt = ChatPromptTemplate.from_template("""
    Retrieve important data from the pdfs and make personalized notes for the user.
    You are an expert at creating notes for the study material given and extract important data that might be used in the exams.
    Make the notes detailed but concise and include all the important points.
    <context>
    {context}
    </context>
    Question: {input}.""")

    document_chain = create_stuff_documents_chain(llm, prompt)
    raw_text = get_pdf_text(pdf_paths)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)
    retriever = vectorstore.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)

    response = retrieval_chain.invoke({"input": "Make notes for me to study from the pdfs"})
    return response['answer']



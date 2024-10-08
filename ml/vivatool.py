from dotenv import load_dotenv
load_dotenv()
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.vectorstores import FAISS
from PyPDF2 import PdfReader
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
import json
import warnings

warnings.filterwarnings("ignore")

# Load environment variables
os.environ['OPENAI_API_KEY'] = os.getenv("OPENAI_API_KEY")


# Define the method to read and process PDF, and return viva questions
def generate_viva_questions(difficulty_level, pdf_paths):
    
    # Step 1: Get raw text from PDFs
    def get_pdf_text(pdf_docs):
        text = " "
        for pdf in pdf_docs:
            reader = PdfReader(pdf)
            for page in reader.pages:
                text += page.extract_text()
        return text

    # Step 2: Split text into manageable chunks
    def get_text_chunks(text):
        text_splitter = CharacterTextSplitter(
            separator="\n",
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_text(text)
        return chunks

    # Step 3: Create vectorstore for similarity search
    def get_vectorstore(text_chunks):
        embeddings = OpenAIEmbeddings()
        vectorstore = FAISS.from_texts(texts=text_chunks, embedding=embeddings)
        return vectorstore

    # Load and process PDFs
    raw_text = get_pdf_text(pdf_paths)
    text_chunks = get_text_chunks(raw_text)
    vectorstore = get_vectorstore(text_chunks)

    # Step 4: Set up LLM and the chain
    llm = ChatOpenAI(temperature=0)
    prompt = ChatPromptTemplate.from_template("""
    Retreive all the data from the pdfs and answer strictly according to the data in the pdfs.
    You are an expert at creating viva questions for students based on the content of the pdfs.
    Create 5 viva questions based on important concepts of the input pdfs and user's difficulty level which is given as input.
    Generate both question and answer for each question which will be used to compare with the user's answers.
    Give the answer in the form of a dictionary as {question : answer} for all the 5 questions.
    Give strictly in dictionary format only-{question : answer} for all the 5 questions.
    donot change anything in the format of the answer.


    <context>
    {context}
    </context>

    Question: Give me viva questions on difficulty level-{input} based on the content of the pdfs.""")
    
    document_chain = create_stuff_documents_chain(llm, prompt)
    retriever = vectorstore.as_retriever()
    retrieval_chain = create_retrieval_chain(retriever, document_chain)

    # Step 5: Call the chain to generate viva questions
    response = retrieval_chain.invoke({"input": difficulty_level})
    print(response['answer'])
    # data_dict = json.loads(response["answer"])


    # # Step 6: Structure the questions and answers in the desired format
    # qa_dict = {}
    # for i in range(1, 6):
    #     qa_dict[i] = {
    #         "question": data_dict[f"Question {i}"],
    #         "answer": data_dict[f"Answer {i}"]
    #     }

    # return qa_dict

# # Test the method
# ans=generate_viva_questions("easy", ["history.pdf"])

# ans=generate_viva_questions("easy", ["history.pdf"])

print("---------------------------------------------------")
# print(ans[2].get("answer"))

# # Download NLTK tokenizer resources
# # nltk.download('punkt') # Uncomment this line if you haven't downloaded the 'punkt' resource yet

# # Model's generated answer (RAG answer)
# model_answer = "Language and popular traditions played a crucial role in the creation of national identity by symbolizing resistance against dominant powers. The use of Polish, for example, became a symbol of struggle against Russian dominance."

# # user_answer = "Language and traditions were key in forming national identity, especially in resisting powers like Russia, where Polish became a symbol of resistance."
# user_answer = "Language and traditions were key in forming and resisting identity example using polish" #Take input by user inthe form of speech then speech to text and pass this
# # Step 1: Calculate Literal Score (Jaccard Similarity)
# def calculate_literal_score(model_ans, user_ans):
#     # Tokenize answers
#     model_tokens = set(word_tokenize(model_ans.lower()))
#     user_tokens = set(word_tokenize(user_ans.lower()))

#     # Calculate Jaccard Similarity
#     intersection = model_tokens.intersection(user_tokens)
#     union = model_tokens.union(user_tokens)
#     literal_score = len(intersection) / len(union) * 100  # In percentage
#     return literal_score

# # Step 2: Calculate Semantic Score (Cosine Similarity of Embeddings)
# def calculate_semantic_score(model_ans, user_ans):
#     # Load pre-trained model for embeddings
#     model = SentenceTransformer('all-MiniLM-L6-v2')

#     # Get sentence embeddings
#     model_embedding = model.encode(model_ans, convert_to_tensor=True)
#     user_embedding = model.encode(user_ans, convert_to_tensor=True)

#     # Calculate cosine similarity
#     semantic_score = util.pytorch_cos_sim(model_embedding, user_embedding).item() * 100  # In percentage
#     return semantic_score

# # Generate the report
# def generate_comparison_report(model_ans, user_ans):
#     literal_score = calculate_literal_score(model_ans, user_ans)
#     semantic_score = calculate_semantic_score(model_ans, user_ans)

#     report = {
#         "literal_score": f"{literal_score:.2f}%",
#         "semantic_score": f"{semantic_score:.2f}%"
#     }

#     return report

# # Generate and print report
# report = generate_comparison_report(model_answer, user_answer)
# print(report)

from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint, ChatHuggingFace
from langchain_community.vectorstores import FAISS
from langchain.schema import Document, HumanMessage, SystemMessage
from langchain.agents import Tool, initialize_agent, AgentType
from langchain.chains import RetrievalQA

endpoint = HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    huggingfacehub_api_token="",
    task="text-generation",
    max_new_tokens=512,
)

llm = ChatHuggingFace(llm=endpoint) #wrapper to use a hugging face LLM as a chat model
llm([
    SystemMessage(content="You are a Chat bot that answers tourist questions about the Tangier-Tetouan-Hoceima region."),
    HumanMessage(content="What is the history of Tangier?")
])

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")

vector_store = FAISS.load_local("faiss_index", embeddings)
"""
def retrieve_context(query: str) -> str:
    retrieved_docs = vector_store.similarity_search(query, k=4)
    return "\n\n".join(doc.page_content for doc in retrieved_docs)

tools = [
    Tool(
        name="RetrieveContext",
        func=retrieve_context,
        description="Retrieves context about Tangier-Tetouan-Hoceima region to answer tourist questions."
    )
]"""

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",#determines how the retrieved documents are sent to the LLM.
    retriever=vector_store.as_retriever(search_kwargs={"k": 4}),
    return_source_documents=True
)
#RetrievalQA is a specialized chain that combines: Doc retrieval and question answering

def create_agent():
    return qa_chain
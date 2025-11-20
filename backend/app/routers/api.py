# app/routers/api.py
from fastapi import APIRouter, Form
from pydantic import BaseModel
from app.models.langchain_model import qa_chain  
from fastapi.responses import HTMLResponse

router = APIRouter()

class Query(BaseModel):
    question: str

@router.get("/")
async def home():
    return {"message": "Welcome dear tourist!"}

@router.get("/askchat", response_class=HTMLResponse)
async def chat_form():
    return """
    <html>
        <head>
            <title>Ask a Question</title>
        </head>
        <body>
            <h2>Tourist Assistant</h2>
            <form action="/api/chat" method="post">
                <input type="text" name="question" placeholder="Type your question..." style="width:300px;" />
                <button type="submit">Ask</button>
            </form>
        </body>
    </html>
    """
@router.post("/chat")
async def ask_question(question: str = Form(...)):
    try:
        result = qa_chain.invoke({"query": question})
        return result["result"]
    except Exception as e:
        return {"error": str(e)}
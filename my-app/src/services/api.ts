
export async function askBot(question) {
  const formData = new FormData();
  formData.append("question", question);

  const response = await fetch("http://localhost:8000/chat", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  return data;  
}

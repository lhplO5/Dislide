from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import fitz
from docling.document_converter import DocumentConverter
from adapter import DislideAdapter

print("Loading AI Models...")
converter = DocumentConverter()
adapter = DislideAdapter()
print("Models Loaded Successfully!")

app = FastAPI(title="Dislide AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "success", "message": "Bộ não AI của Dislide đang hoạt động!"}

@app.post("/api/parse-pdf")
async def parse_pdf(file: UploadFile = File(...)):
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    doc_fitz = fitz.open(temp_file_path)
    if len(doc_fitz) > 3:
        doc_fitz.select([0, 1, 2]) 
        doc_fitz.save(f"mini_{temp_file_path}")
        doc_fitz.close()
        os.remove(temp_file_path) 
        temp_file_path = f"mini_{temp_file_path}" 
    else:
        doc_fitz.close()
    
    try:
        result = converter.convert(temp_file_path)
        final_schema = adapter.process(result, file.filename)
        return final_schema
    finally:
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
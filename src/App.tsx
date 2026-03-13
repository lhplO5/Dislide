import "./App.css";
import BlockEditor from "./components/BlockEditor";
import { useState } from 'react';

function App() {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parseSchemaToHTML = (schema: any) => {
    return schema.blocks.map((block: any) => {
      if (block.type === 'heading') return `<h2>${block.content}</h2>`;
      if (block.type === 'math') return `<div data-type="math" data-content="${block.content}"></div>`;
      if (block.type === 'ai_response') return `<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; color: #6d28d9; background: #f5f3ff; margin: 10px 0;">${block.content}</blockquote>`;
      return `<p>${block.content}</p>`;
    }).join('');
  }
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error in API Backend!');

      const schema = await response.json();
      const parsedHTML = parseSchemaToHTML(schema);
      setHtmlContent(parsedHTML);
    } catch (error) {
      console.error("Error:", error);
      alert("Can't connect to the AI Engine. Please make sure your Python server is still running!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1e293b' }}>
        Dislide
      </h1>
      {/* Upload PDF */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          disabled={isLoading}
          style={{ marginBottom: '1rem' }}
        />
        {isLoading && <p style={{ color: '#8b5cf6', fontWeight: 'bold' }}>Loading</p>}
      </div>

      {htmlContent && (
        <BlockEditor initialContent={htmlContent} />
      )}
    </main>
  );
}

export default App;

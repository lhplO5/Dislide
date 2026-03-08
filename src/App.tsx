import "./App.css";
import BlockEditor from "./components/BlockEditor";
import dummyData from '../docs/schema.json';

function App() {
  const parseSchemaToHTML = (schema: any) => {
    return schema.blocks.map((block: any) => {
      if (block.type === 'heading') return `<h2>${block.content}</h2>`;
      if (block.type === 'math') return `<div data-type="math" data-content="${block.content}"></div>`;
      if (block.type === 'ai_response') return `<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 12px; color: #6d28d9; background: #f5f3ff; margin: 10px 0;">${block.content}</blockquote>`;
      return `<p>${block.content}</p>`;
    }).join('');
  }
  const initialHTML = parseSchemaToHTML(dummyData);

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', color: '#1e293b' }}>
        {dummyData.metadata.title}
      </h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
        Draft Editor - Dislide
      </p>
      <BlockEditor initialContent={initialHTML} />
    </main>
  );
}

export default App;

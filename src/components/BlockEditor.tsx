import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit'
import 'katex/dist/katex.min.css';
import { MathExtension } from './MathExtension';

interface BlockEditorProps {
    initialContent: string;
}

const BlockEditor = ({ initialContent }: BlockEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            MathExtension,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
                style: 'min-height: 500px; padding: 1.5rem; outline: none;',
                spellcheck: 'false',
            },
        },
    })

    return (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: '#1e293b', textAlign: 'left' }}>
            {editor && (
                <BubbleMenu editor={editor}>
                    <button
                        onClick={() => {
                            const { from, to } = editor.state.selection;
                            const selectedText = editor.state.doc.textBetween(from, to, ' ');
                            editor.chain().focus().insertContentAt(to, `<blockquote><strong>✨ AI Giải thích:</strong> Bạn vừa yêu cầu giải thích về <em>"${selectedText}"</em>. Sau này, Python Backend sẽ cắm API vào đây và trả kết quả thật để thay thế đoạn text giả lập này!</blockquote>`).run();
                        }}
                        style={{
                            backgroundColor: '#8b5cf6', color: 'white', border: 'none',
                            padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
                            fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                            display: 'flex', alignItems: 'center', gap: '4px'
                        }}
                    >
                        ✨ Hỏi AI
                    </button>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} />
        </div>
    )
}

export default BlockEditor
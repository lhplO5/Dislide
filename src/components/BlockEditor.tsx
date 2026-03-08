import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface BlockEditorProps {
    initialContent: string;
}

const BlockEditor = ({ initialContent }: BlockEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
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
            <EditorContent editor={editor} />
        </div>
    )
}

export default BlockEditor
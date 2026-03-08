import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import katex from 'katex';
import { useEffect, useRef } from 'react';
const MathNodeView = (props: any) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(props.node.attrs.content, containerRef.current, {
                    displayMode: true,
                    throwOnError: false,
                });
            } catch (e) {
                containerRef.current.innerText = props.node.attrs.content;
            }
        }
    }, [props.node.attrs.content]);

    return (
        <NodeViewWrapper className="math-block" style={{ margin: '1.5rem 0', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
            <div ref={containerRef} />
        </NodeViewWrapper>
    );
};

export const MathExtension = Node.create({
    name: 'mathBlock',
    group: 'block',
    atom: true,

    addAttributes() {
        return {
            content: { default: '' },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="math"]',
                getAttrs: (element) => ({
                    content: element.getAttribute('data-content') || '',
                }),
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'math' })];
    },

    addNodeView() {
        return ReactNodeViewRenderer(MathNodeView);
    },
});
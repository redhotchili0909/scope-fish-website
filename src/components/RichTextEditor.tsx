import React, { useRef, useState } from 'react';
import { Bold, Italic, Underline, Type } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState('16');

    const applyFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateContent();
    };

    const updateContent = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    React.useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    return (
        <div className="border border-border rounded overflow-hidden">
            {/* Toolbar */}
            <div className="bg-panel border-b border-border p-2 flex items-center gap-1 flex-wrap">
                <button
                    type="button"
                    onClick={() => applyFormat('bold')}
                    className="p-2 hover:bg-bg rounded transition-colors"
                    title="Bold (Ctrl+B)"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => applyFormat('italic')}
                    className="p-2 hover:bg-bg rounded transition-colors"
                    title="Italic (Ctrl+I)"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => applyFormat('underline')}
                    className="p-2 hover:bg-bg rounded transition-colors"
                    title="Underline (Ctrl+U)"
                >
                    <Underline className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-border mx-1" />

                <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-text-muted" />
                    <select
                        value={fontSize}
                        onChange={(e) => {
                            setFontSize(e.target.value);
                            applyFormat('fontSize', '7'); // Reset to default
                            const selection = window.getSelection();
                            if (selection && selection.rangeCount > 0) {
                                const range = selection.getRangeAt(0);
                                const span = document.createElement('span');
                                span.style.fontSize = e.target.value + 'px';
                                range.surroundContents(span);
                            }
                            updateContent();
                        }}
                        className="px-2 py-1 bg-bg border border-border rounded text-sm focus:border-primary focus:outline-none"
                    >
                        <option value="12">Small</option>
                        <option value="16">Normal</option>
                        <option value="20">Large</option>
                        <option value="24">X-Large</option>
                    </select>
                </div>
            </div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={updateContent}
                onPaste={handlePaste}
                className="px-3 py-2 bg-bg min-h-[100px] max-h-[300px] overflow-y-auto focus:outline-none"
                data-placeholder={placeholder}
                style={{
                    fontSize: '16px',
                }}
            />

            <style>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

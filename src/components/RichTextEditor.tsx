import React, { useRef, useState, useEffect } from 'react';
import { Bold, Italic, Underline, Type, Link as LinkIcon, Smile, Image as ImageIcon } from 'lucide-react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState('16');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const applyFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateContent();
    };

    const insertLink = () => {
        const url = prompt('Enter the URL:', 'https://');
        if (url) {
            const selection = window.getSelection();
            const text = selection?.toString() || 'Link';
            const markdownLink = `[${text}](${url})`;
            document.execCommand('insertText', false, markdownLink);
            updateContent();
        }
    };

    const insertImage = () => {
        let url = prompt('Enter the Image/GIF URL (or Giphy Link):', 'https://');
        if (url) {
            // Smart Giphy Handling: Convert Giphy page URLs to direct image URLs
            // Example: https://giphy.com/gifs/cat-funny-12345 -> https://media.giphy.com/media/12345/giphy.gif
            const giphyMatch = url.match(/giphy\.com\/gifs\/(?:.*-)?([a-zA-Z0-9]+)$/);
            if (giphyMatch && giphyMatch[1]) {
                const giphyId = giphyMatch[1];
                url = `https://media.giphy.com/media/${giphyId}/giphy.gif`;
            }

            const alt = prompt('Enter alt text (optional):', 'Image');
            const markdownImage = `![${alt}](${url})`;
            document.execCommand('insertText', false, markdownImage);
            updateContent();
        }
    };

    const onEmojiClick = (emojiData: EmojiClickData) => {
        document.execCommand('insertText', false, emojiData.emoji);
        updateContent();
        // Don't close picker immediately to allow selecting multiple
    };

    const updateContent = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        // Convert line breaks to <br> tags for pasted content
        const htmlText = text.replace(/\n/g, '<br>');
        document.execCommand('insertHTML', false, htmlText);
    };

    React.useEffect(() => {
        if (editorRef.current) {
            // Convert plain text line breaks to HTML if needed
            let htmlContent = value;

            // If the content doesn't have HTML tags but has line breaks, convert them
            if (!value.includes('<br>') && !value.includes('<div>') && !value.includes('<p>') && value.includes('\n')) {
                htmlContent = value.replace(/\n/g, '<br>');
            }

            // Only update if content is different to avoid cursor jumping
            if (editorRef.current.innerHTML !== htmlContent) {
                editorRef.current.innerHTML = htmlContent;
            }
        }
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Handle Enter key to insert <br> instead of creating new divs/paragraphs
        if (e.key === 'Enter') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '<br><br>');
        }
    };

    return (
        <div className="border border-border rounded overflow-hidden relative">
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
                <button
                    type="button"
                    onClick={insertLink}
                    className="p-2 hover:bg-bg rounded transition-colors"
                    title="Insert Link (Markdown)"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={insertImage}
                    className="p-2 hover:bg-bg rounded transition-colors"
                    title="Insert Image/GIF URL (Markdown)"
                >
                    <ImageIcon className="w-4 h-4" />
                </button>

                <div className="relative" ref={emojiPickerRef}>
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={`p-2 hover:bg-bg rounded transition-colors ${showEmojiPicker ? 'bg-bg text-primary' : ''}`}
                        title="Insert Emoji"
                    >
                        <Smile className="w-4 h-4" />
                    </button>
                    {showEmojiPicker && (
                        <div className="absolute top-full left-0 mt-2 z-50 shadow-xl">
                            <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={400} />
                        </div>
                    )}
                </div>

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
                onKeyDown={handleKeyDown}
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

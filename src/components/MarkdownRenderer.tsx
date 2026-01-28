import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
    return (
        <div className={`markdown-content ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    a: ({ node, ...props }) => (
                        <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                        />
                    ),
                    ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-5 my-2 space-y-1" />,
                    ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-5 my-2 space-y-1" />,
                    h1: ({ node, ...props }) => <h1 {...props} className="text-2xl font-bold mt-4 mb-2" />,
                    h2: ({ node, ...props }) => <h2 {...props} className="text-xl font-bold mt-3 mb-2" />,
                    h3: ({ node, ...props }) => <h3 {...props} className="text-lg font-bold mt-2 mb-1" />,
                    blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-primary/30 pl-4 py-1 my-2 italic text-text-muted bg-panel rounded-r" />,
                    code: ({ node, ...props }) => <code {...props} className="bg-panel px-1.5 py-0.5 rounded text-sm font-mono text-primary" />,
                    pre: ({ node, ...props }) => <pre {...props} className="bg-panel p-3 rounded-lg overflow-x-auto my-2 text-sm" />,
                    p: ({ node, ...props }) => <p {...props} className="mb-2 last:mb-0 leading-relaxed" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

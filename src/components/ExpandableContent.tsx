import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableContentProps {
    content: string;
    maxHeight?: number;
}

export const ExpandableContent: React.FC<ExpandableContentProps> = ({ content, maxHeight = 300 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
        }
    }, [content, maxHeight]);

    return (
        <div className="relative">
            <div
                ref={contentRef}
                className={`text-text-secondary leading-relaxed whitespace-pre-wrap transition-[max-height] duration-300 ease-in-out ${!isExpanded ? 'overflow-hidden' : ''
                    }`}
                style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : `${maxHeight}px` }}
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {isOverflowing && (
                <div className="mt-2 flex justify-start">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-primary hover:text-primary/80 font-serif font-medium text-sm flex items-center gap-1 focus:outline-none transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                Show Less <ChevronUp className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                Read More <ChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

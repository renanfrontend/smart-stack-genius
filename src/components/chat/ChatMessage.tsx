
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessageProps {
  content: string;
  role: MessageRole;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  content, 
  role, 
  isLoading = false 
}) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [content]);

  return (
    <div 
      ref={messageRef}
      className={cn(
        "py-4 px-6 max-w-4xl mx-auto flex",
        role === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "rounded-2xl px-4 py-3 max-w-[85%] sm:max-w-[70%] animate-fade-in-up shadow-sm",
          role === 'user' 
            ? "bg-primary text-primary-foreground ml-auto rounded-tr-sm" 
            : "glass-card rounded-tl-sm"
        )}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-current opacity-75 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-75 animate-pulse animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-current opacity-75 animate-pulse animation-delay-400"></div>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            {content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;

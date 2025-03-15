
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isDisabled = false 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isDisabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="px-4 py-4 border-t border-border/30 glass sticky bottom-0 z-10"
    >
      <div className="relative max-w-3xl mx-auto">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          disabled={isDisabled}
          rows={1}
          className={cn(
            "w-full pl-4 pr-14 py-3 glass-input resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200",
            isDisabled && "opacity-70 cursor-not-allowed"
          )}
        />
        
        <button
          type="submit"
          disabled={isDisabled || !message.trim()}
          className={cn(
            "absolute right-2 bottom-2 p-2 rounded-lg bg-primary text-primary-foreground transition-all duration-200",
            (!message.trim() || isDisabled) ? "opacity-70 cursor-not-allowed" : "hover:brightness-110",
            "active:scale-95"
          )}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 2 11 13"></path>
            <path d="m22 2-7 20-4-9-9-4 20-7z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;

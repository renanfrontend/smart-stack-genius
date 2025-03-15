
import React, { useState, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import AnimatedGradient from '../ui/AnimatedGradient';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  className?: string;
  initialMessages?: ChatMessageProps[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  className,
  initialMessages = [] 
}) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessageProps = {
      content,
      role: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Add AI response
      const aiResponse: ChatMessageProps = {
        content: getAIResponse(content),
        role: 'assistant'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple AI response generation
  const getAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand your request and I'm here to help. Could you provide more details?",
      "Thank you for your message. I'm processing your request and will assist you shortly.",
      "I'm analyzing your input. Can you elaborate further so I can provide a more specific response?",
      "I've processed your request and I'm ready to assist with your task.",
      `I see you mentioned "${userMessage.split(' ').slice(0, 3).join(' ')}...". I can help you with that.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className={cn("relative min-h-[500px] flex flex-col", className)}>
      <AnimatedGradient className="opacity-20" />
      
      <div className="flex-1 overflow-y-auto py-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl font-semibold mb-4">Welcome to AI Agent</h2>
            <p className="text-foreground/70 max-w-md mb-8">
              I'm here to assist with your tasks and answer your questions. How can I help you today?
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["What can you do?", "Help me write an email", "Generate creative ideas"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-4 py-2 rounded-lg border border-border bg-background/50 text-sm transition-all duration-200 hover:bg-foreground/5"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                content={message.content} 
                role={message.role}
              />
            ))}
            
            {isLoading && (
              <ChatMessage 
                content="" 
                role="assistant"
                isLoading
              />
            )}
          </div>
        )}
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage} 
        isDisabled={isLoading}
      />
    </div>
  );
};

export default ChatInterface;

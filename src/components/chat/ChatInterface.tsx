
import React, { useState, useEffect } from 'react';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import AnimatedGradient from '../ui/AnimatedGradient';
import { cn } from '@/lib/utils';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import AIImageGen from '../ai/AIImageGen';
import AITextGen from '../ai/AITextGen';
import AIMusicGen from '../ai/AIMusicGen';

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
  const [activeTab, setActiveTab] = useState("chat");
  
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
      "Entendo sua solicitação e estou aqui para ajudar. Poderia fornecer mais detalhes?",
      "Obrigado por sua mensagem. Estou processando sua solicitação e vou ajudá-lo em breve.",
      "Estou analisando sua entrada. Pode elaborar mais para que eu possa fornecer uma resposta mais específica?",
      "Processei sua solicitação e estou pronto para ajudá-lo com sua tarefa.",
      `Vejo que você mencionou "${userMessage.split(' ').slice(0, 3).join(' ')}...". Posso ajudar com isso.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className={cn("relative min-h-[500px] flex flex-col", className)}>
      <AnimatedGradient className="opacity-20" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 gap-2 px-4 py-2 rounded-b-none border-b border-border/30">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="imagens">Imagens</TabsTrigger>
          <TabsTrigger value="textos">Textos</TabsTrigger>
          <TabsTrigger value="musicas">Músicas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto py-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao Assistente Inteligente</h2>
                <p className="text-foreground/70 max-w-md mb-8">
                  Estou aqui para auxiliar com suas tarefas e responder suas perguntas. Como posso ajudá-lo hoje?
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["O que você pode fazer?", "Ajude-me a escrever um email", "Gere ideias criativas"].map((suggestion) => (
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
        </TabsContent>
        
        <TabsContent value="imagens">
          <AIImageGen />
        </TabsContent>
        
        <TabsContent value="textos">
          <AITextGen />
        </TabsContent>
        
        <TabsContent value="musicas">
          <AIMusicGen />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatInterface;

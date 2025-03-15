
import { useState, useEffect, useCallback } from 'react';

interface UseTypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
}

const useTypingEffect = ({ text, speed = 40, delay = 0 }: UseTypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    setIsDone(false);
    setDisplayedText('');
    
    let i = 0;
    const timer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsDone(true);
        }
      }, speed);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  useEffect(() => {
    const timer = startTyping();
    return () => timer();
  }, [startTyping]);

  return { displayedText, isTyping, isDone, startTyping };
};

export default useTypingEffect;

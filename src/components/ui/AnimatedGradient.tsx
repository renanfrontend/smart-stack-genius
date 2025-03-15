
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedGradientProps {
  className?: string;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ className }) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 -z-10 opacity-30",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,113,224,0.4)_0%,rgba(99,113,224,0)_50%)] animate-pulse-subtle"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(66,73,160,0.4)_0%,rgba(66,73,160,0)_50%)] animate-pulse-subtle animation-delay-500"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(224,231,255,0.3)_0%,rgba(224,231,255,0)_60%)] animate-pulse-subtle animation-delay-300"></div>
    </div>
  );
};

export default AnimatedGradient;

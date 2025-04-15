import { Circle } from 'lucide-react';

interface DifficultyIconProps {
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
}

export default function DifficultyIcon({ difficulty, className = '' }: DifficultyIconProps) {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-500/70';
      case 'medium':
        return 'text-yellow-500/70';
      case 'hard':
        return 'text-red-500/70';
      default:
        return 'text-gray-500/70';
    }
  };

  const getDifficultySize = () => {
    switch (difficulty) {
      case 'easy':
        return 'h-3 w-3';
      case 'medium':
        return 'h-4 w-4';
      case 'hard':
        return 'h-5 w-5';
      default:
        return 'h-4 w-4';
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Circle className={`${getDifficultyColor()} ${getDifficultySize()}`} />
    </div>
  );
} 
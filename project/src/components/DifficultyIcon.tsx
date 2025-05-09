import { Circle } from 'lucide-react';

interface DifficultyIconProps {
  difficulty: 'easy' | 'medium' | 'hard';
  className?: string;
}

export default function DifficultyIcon({ difficulty, className = '' }: DifficultyIconProps) {
  const getDifficultyStyles = () => {
    switch (difficulty) {
      case 'easy':
        return {
          background: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10',
          text: 'text-emerald-400',
          border: 'border-emerald-500/30',
          label: 'Easy'
        };
      case 'medium':
        return {
          background: 'bg-gradient-to-r from-yellow-500/10 to-amber-500/10',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          label: 'Medium'
        };
      case 'hard':
        return {
          background: 'bg-gradient-to-r from-red-500/10 to-rose-500/10',
          text: 'text-rose-400',
          border: 'border-rose-500/30',
          label: 'Hard'
        };
      default:
        return {
          background: 'bg-gradient-to-r from-gray-500/10 to-gray-600/10',
          text: 'text-gray-400',
          border: 'border-gray-500/30',
          label: 'Unknown'
        };
    }
  };

  const styles = getDifficultyStyles();

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${styles.background} ${styles.text} ${styles.border}`}>
        {styles.label}
      </div>
    </div>
  );
} 
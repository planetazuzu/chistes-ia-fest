
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Joke } from '@/types/joke';
import { voteForJoke } from '@/services/jokeService';

interface JokeVoteButtonsProps {
  joke: Joke;
  userName: string;
  onVoteSubmitted: () => void;
}

const JokeVoteButtons: React.FC<JokeVoteButtonsProps> = ({ joke, userName, onVoteSubmitted }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const handleVote = (voteType: 'like' | 'dislike') => {
    voteForJoke(joke, voteType, userName);
    setHasVoted(true);
    
    const message = voteType === 'like' 
      ? `¡Gracias, ${userName}! Tomamos nota de tu risa 😂` 
      : `Entendido, ${userName}. Buscaremos algo mejor para la próxima 😉`;
    
    toast({
      title: "¡Voto registrado!",
      description: message,
      duration: 3000,
    });
    
    onVoteSubmitted();
  };

  if (hasVoted) {
    return null;
  }

  return (
    <div className="flex justify-center space-x-4 mt-6 animate-fade-in">
      <Button 
        onClick={() => handleVote('like')}
        variant="outline"
        className="flex items-center gap-2 hover:bg-green-50 hover:border-green-200 transition-colors"
      >
        <ThumbsUp size={20} className="text-green-500" />
        <span>Me ha hecho gracia</span>
      </Button>
      
      <Button 
        onClick={() => handleVote('dislike')}
        variant="outline"
        className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 transition-colors"
      >
        <ThumbsDown size={20} className="text-red-500" />
        <span>Nah... el siguiente</span>
      </Button>
    </div>
  );
};

export default JokeVoteButtons;

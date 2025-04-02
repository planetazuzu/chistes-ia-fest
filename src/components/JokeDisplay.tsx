
import React from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import JokeVoteButtons from './JokeVoteButtons';
import { Joke } from '@/types/joke';

interface JokeDisplayProps {
  joke: Joke | string;
  isLoading: boolean;
  userName?: string;
  onVoteSubmitted?: () => void;
}

const JokeDisplay = ({ joke, isLoading, userName, onVoteSubmitted }: JokeDisplayProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    const jokeText = typeof joke === 'string' ? joke : joke.text;
    navigator.clipboard.writeText(jokeText).then(() => {
      setCopied(true);
      toast({
        title: "¡Copiado al portapapeles!",
        description: "Ahora puedes compartir este chiste con tus amigos",
        duration: 3000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getLoadingMessage = () => {
    if (userName) {
      return `Un momento, ${userName}... buscando el chiste perfecto 😎`;
    }
    return "Buscando el mejor chiste... 😂";
  };

  const getDefaultMessage = () => {
    if (userName) {
      return `${userName}, pulsa el botón para reírte 🤣`;
    }
    return "Pulsa el botón para recibir un chiste";
  };

  // Determinar el texto a mostrar
  const jokeText = typeof joke === 'string' 
    ? joke 
    : joke.text;
  
  const isDefaultMessage = jokeText === "Pulsa el botón para recibir un chiste" || 
                           jokeText === getDefaultMessage();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[180px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-t-2 border-joy-blue border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-xl">{getLoadingMessage()}</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-xl md:text-2xl text-center text-joy-text font-medium">
              {isDefaultMessage ? getDefaultMessage() : jokeText}
            </p>
            
            {!isDefaultMessage && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors"
                  aria-label="Copiar chiste al portapapeles"
                >
                  {copied ? (
                    <>
                      <CheckIcon size={16} className="text-green-500" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={16} />
                      <span>Copiar chiste</span>
                    </>
                  )}
                </button>
              </div>
            )}
            
            {/* Añadir botones de voto si hay un chiste válido y no es un mensaje por defecto */}
            {!isDefaultMessage && 
             typeof joke !== 'string' && 
             userName && 
             onVoteSubmitted && (
              <JokeVoteButtons 
                joke={joke} 
                userName={userName} 
                onVoteSubmitted={onVoteSubmitted} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JokeDisplay;

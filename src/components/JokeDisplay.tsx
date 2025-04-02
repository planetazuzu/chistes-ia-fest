
import React from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface JokeDisplayProps {
  joke: string;
  isLoading: boolean;
}

const JokeDisplay = ({ joke, isLoading }: JokeDisplayProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joke).then(() => {
      setCopied(true);
      toast({
        title: "¡Copiado al portapapeles!",
        description: "Ahora puedes compartir este chiste con tus amigos",
        duration: 3000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 min-h-[180px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-t-2 border-joy-blue border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-xl">Buscando el mejor chiste... 😂</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-xl md:text-2xl text-center text-joy-text font-medium">
              {joke}
            </p>
            
            {joke !== "Pulsa el botón para recibir un chiste" && (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default JokeDisplay;

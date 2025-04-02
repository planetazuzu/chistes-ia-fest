
import React from 'react';

interface JokeButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const JokeButton = ({ onClick, disabled }: JokeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-8 bg-joy-blue hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed animate-bounce-light"
      aria-label="Generar un nuevo chiste"
    >
      Contar un chiste
    </button>
  );
};

export default JokeButton;

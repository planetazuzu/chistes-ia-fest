
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

const NameInput = ({ onNameSubmit }: NameInputProps) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNameSubmit(name.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">¡Hola! ¿Cómo te llamas?</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Escribe tu nombre aquí"
            className="w-full"
            autoFocus
          />
          
          <Button 
            type="submit" 
            className="w-full bg-joy-blue hover:bg-blue-600 text-white font-bold py-3 rounded-full text-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95"
            disabled={!name.trim()}
          >
            Empezar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;

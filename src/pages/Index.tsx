
import React, { useState } from 'react';
import Header from '@/components/Header';
import JokeDisplay from '@/components/JokeDisplay';
import JokeButton from '@/components/JokeButton';
import JokeCounter from '@/components/JokeCounter';
import Footer from '@/components/Footer';
import NameInput from '@/components/NameInput';
import { getJokeFromAPI } from '@/services/jokeService';

const Index = () => {
  const [joke, setJoke] = useState<string>("Pulsa el botón para recibir un chiste");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jokeCount, setJokeCount] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [hasEnteredName, setHasEnteredName] = useState<boolean>(false);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setHasEnteredName(true);
    setJoke(`${name}, pulsa el botón para reírte 🤣`);
  };

  const generateJoke = async () => {
    setIsLoading(true);
    try {
      const newJoke = await getJokeFromAPI(userName);
      setJoke(newJoke);
      setJokeCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error("Error generating joke:", error);
      setJoke("¡Ups! Algo falló. ¿Intentamos de nuevo?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-joy-yellow flex flex-col items-center px-4">
      <div className="container max-w-4xl mx-auto py-8 flex flex-col items-center">
        <Header />
        
        <main className="w-full flex flex-col items-center mt-6 md:mt-10">
          {!hasEnteredName ? (
            <NameInput onNameSubmit={handleNameSubmit} />
          ) : (
            <>
              <JokeDisplay joke={joke} isLoading={isLoading} userName={userName} />
              
              <JokeButton onClick={generateJoke} disabled={isLoading} />
              
              <JokeCounter count={jokeCount} />
            </>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;

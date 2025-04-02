
import { genericJokes, personalizedJokeTemplates } from "../data/jokes";
import { Joke, JokeVote } from "../types/joke";

// Generamos IDs únicos para cada chiste
const genericJokesWithIds: Joke[] = genericJokes.map((joke, index) => ({
  id: `generic-${index}`,
  text: joke,
  likes: 0,
  dislikes: 0
}));

const personalizedJokesWithIds: Joke[] = personalizedJokeTemplates.map((joke, index) => ({
  id: `personalized-${index}`,
  text: joke,
  likes: 0,
  dislikes: 0
}));

// Mantenemos un registro de votos en memoria
const jokeVotes: JokeVote[] = [];

// Tracking joke request counts
const jokeRequestCounts: Record<string, number> = {};

export const getRandomJoke = (): Promise<Joke> => {
  return new Promise((resolve) => {
    // Simulamos un tiempo de carga
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * genericJokesWithIds.length);
      resolve(genericJokesWithIds[randomIndex]);
    }, 1500);
  });
};

// Function to get a personalized joke with the user's name
export const getPersonalizedJoke = (name: string): Joke => {
  const randomIndex = Math.floor(Math.random() * personalizedJokesWithIds.length);
  const joke = { ...personalizedJokesWithIds[randomIndex] };
  joke.text = joke.text.replace(/{name}/g, name);
  return joke;
};

// Función preparada para cuando se tenga disponible la API
export const getJokeFromAPI = async (name?: string): Promise<Joke> => {
  try {
    // Esta función está comentada ya que la API aún no está disponible
    /* 
    const response = await fetch("http://localhost:8000/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `Body=Cuéntame un chiste corto ${name ? 'para ' + name : ''}`,
    });

    if (!response.ok) {
      throw new Error("Error al obtener el chiste");
    }

    const data = await response.json();
    return {
      id: `api-${Date.now()}`,
      text: data.message || "No se pudo obtener un chiste. ¡Inténtalo de nuevo!",
      likes: 0,
      dislikes: 0
    };
    */
    
    // Mientras tanto, usamos la función mock
    return new Promise((resolve) => {
      setTimeout(() => {
        let joke;
        if (name) {
          joke = getPersonalizedJoke(name);
        } else {
          const randomIndex = Math.floor(Math.random() * genericJokesWithIds.length);
          joke = genericJokesWithIds[randomIndex];
        }
        
        // Increment request count for this joke
        jokeRequestCounts[joke.id] = (jokeRequestCounts[joke.id] || 0) + 1;
        
        resolve(joke);
      }, 1500);
    });
  } catch (error) {
    console.error("Error fetching joke:", error);
    return {
      id: `error-${Date.now()}`,
      text: "¡Ups! Parece que nuestro comediante está de descanso. ¡Inténtalo de nuevo!",
      likes: 0,
      dislikes: 0
    };
  }
};

// Nueva función para registrar votos
export const voteForJoke = (joke: Joke, voteType: 'like' | 'dislike', userName: string): Joke => {
  // Actualizar contadores en el objeto joke
  if (voteType === 'like') {
    joke.likes += 1;
  } else {
    joke.dislikes += 1;
  }
  
  // Guardar el voto en memoria (simula una base de datos)
  jokeVotes.push({
    jokeId: joke.id,
    type: voteType,
    userName
  });
  
  console.log('Voto registrado:', { jokeId: joke.id, voteType, userName });
  console.log('Estado actual de votos:', jokeVotes);
  
  // Preparado para integración futura con base de datos:
  /*
  // Ejemplo de código para enviar el voto a una API
  fetch('http://localhost:8000/jokes/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jokeId: joke.id,
      voteType,
      userName
    }),
  });
  */
  
  return { ...joke };
};

// Función para obtener las estadísticas de un chiste
export const getJokeStats = (jokeId: string): { likes: number, dislikes: number } => {
  const jokeVotesForThisJoke = jokeVotes.filter(vote => vote.jokeId === jokeId);
  const likes = jokeVotesForThisJoke.filter(vote => vote.type === 'like').length;
  const dislikes = jokeVotesForThisJoke.filter(vote => vote.type === 'dislike').length;
  
  return { likes, dislikes };
};

// New function to get most requested jokes
export const getMostRequestedJokes = (limit: number = 5): { joke: Joke, count: number }[] => {
  const jokesWithCounts = Object.entries(jokeRequestCounts)
    .map(([jokeId, count]) => {
      // Find the joke by id
      const joke = [...genericJokesWithIds, ...personalizedJokesWithIds]
        .find(j => j.id === jokeId);
      
      return joke ? { joke, count } : null;
    })
    .filter((item): item is { joke: Joke, count: number } => item !== null)
    .sort((a, b) => b.count - a.count) // Sort by count desc
    .slice(0, limit); // Take only the top N
  
  return jokesWithCounts;
};

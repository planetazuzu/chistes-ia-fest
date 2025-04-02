
import { genericJokes, personalizedJokeTemplates } from "../data/jokes";

export const getRandomJoke = (): Promise<string> => {
  return new Promise((resolve) => {
    // Simulamos un tiempo de carga
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * genericJokes.length);
      resolve(genericJokes[randomIndex]);
    }, 1500);
  });
};

// Function to get a personalized joke with the user's name
export const getPersonalizedJoke = (name: string): string => {
  const randomIndex = Math.floor(Math.random() * personalizedJokeTemplates.length);
  return personalizedJokeTemplates[randomIndex].replace(/{name}/g, name);
};

// Función preparada para cuando se tenga disponible la API
export const getJokeFromAPI = async (name?: string): Promise<string> => {
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
    return data.message || "No se pudo obtener un chiste. ¡Inténtalo de nuevo!";
    */
    
    // Mientras tanto, usamos la función mock
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name) {
          resolve(getPersonalizedJoke(name));
        } else {
          const randomIndex = Math.floor(Math.random() * genericJokes.length);
          resolve(genericJokes[randomIndex]);
        }
      }, 1500);
    });
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "¡Ups! Parece que nuestro comediante está de descanso. ¡Inténtalo de nuevo!";
  }
};

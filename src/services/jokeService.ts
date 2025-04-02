
import { jokes } from "../data/jokes";

export const getRandomJoke = (): Promise<string> => {
  return new Promise((resolve) => {
    // Simulamos un tiempo de carga
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      resolve(jokes[randomIndex]);
    }, 1500);
  });
};

// Función preparada para cuando se tenga disponible la API
export const getJokeFromAPI = async (): Promise<string> => {
  try {
    // Esta función está comentada ya que la API aún no está disponible
    /* 
    const response = await fetch("http://localhost:8000/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "Body=Cuéntame un chiste corto",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el chiste");
    }

    const data = await response.json();
    return data.message || "No se pudo obtener un chiste. ¡Inténtalo de nuevo!";
    */
    
    // Mientras tanto, usamos la función mock
    return getRandomJoke();
  } catch (error) {
    console.error("Error fetching joke:", error);
    return "¡Ups! Parece que nuestro comediante está de descanso. ¡Inténtalo de nuevo!";
  }
};

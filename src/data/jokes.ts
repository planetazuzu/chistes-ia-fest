// Generic jokes
const genericJokes = [
  "¿Qué le dice un jardinero a otro? Nos vemos cuando podamos.",
  "¿Por qué las focas del circo miran siempre hacia arriba? Porque es donde están los focos.",
  "¿Cómo se dice pañuelo en japonés? Sakamoko.",
  "¿Qué hace una abeja en el gimnasio? Zumba.",
  "¿Qué le dice un semáforo a otro? No me mires que me estoy cambiando.",
  "¿Por qué los programadores prefieren el frío? Porque odian los bugs.",
  "¿Sabes qué le dice un ciego a otro cuando se encuentran? Nos vemos luego.",
  "¿Qué le dice el número 1 al número 10? Para ser como yo, tienes que ser sincero.",
  "¿Cómo se llama el campeón de buceo japonés? Tokofondo.",
  "¿Qué hace una vaca cuando mira el Sol? Leche condensada."
];

// Personalized joke templates (with {name} placeholder)
const personalizedJokeTemplates = [
  "{name}, ¿sabes por qué los programadores no tienen novia? Porque confunden las citas.",
  "Oye {name}, ¿por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
  "Especial para ti, {name}: ¿Qué le dice un jaguar a otro? Jaguar you.",
  "{name}, te cuento que mi vecino trabaja limpiando cristales. Pues se ve que le va muy bien en la vida transparente.",
  "¿Sabes {name}? Estoy aprendiendo a telepatizar... ¿Qué estoy pensando? Exacto, en tacos al pastor.",
  "{name}, ¿cómo se despiden los químicos? Ácido un placer.",
  "Para alegrarte el día {name}: Mi médico me dijo que caminara 10 km al día. Ya llevo 5 y no sé cómo volver a casa.",
  "Exclusivo para {name}: ¿Qué hace un astronauta bailando? Gravedad cero, pero diversión infinita.",
  "{name}, te contaré algo curioso. ¿Sabes qué hace una vaca en su tiempo libre? Leche cosas.",
  "{name}, esto te va a encantar: ¿Qué hace un pez en el desierto? Nada."
];

// Function to get a personalized joke with the user's name
export const getPersonalizedJoke = (name: string): string => {
  const randomIndex = Math.floor(Math.random() * personalizedJokeTemplates.length);
  return personalizedJokeTemplates[randomIndex].replace(/{name}/g, name);
};

// Function to get a random generic joke (keeping this for backward compatibility)
export const getRandomJoke = (): Promise<string> => {
  return new Promise((resolve) => {
    // Simulating loading time
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * genericJokes.length);
      resolve(genericJokes[randomIndex]);
    }, 1500);
  });
};

// Modified for personalization
export const getJokeFromAPI = async (name?: string): Promise<string> => {
  try {
    // This function is commented as the API is not yet available
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
    
    // Meanwhile, we use the mock function
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

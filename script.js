class Personaje {
  constructor(nombre, especie, imagen) {
    this._nombre = nombre;
    this._especie = especie;
    this._imagen = imagen;
  }

  get nombre() {
    return this._nombre;
  }

  get especie() {
    return this._especie;
  }

  get imagen() {
    return this._imagen;
  }

  show() {
    const card = document.createElement('div');
    card.classList.add('card');

    const nombreElement = document.createElement('h2');
    nombreElement.textContent = this._nombre;

    const especieElement = document.createElement('p');
    especieElement.textContent = this._especie;

    const imagenElement = document.createElement('img');
    imagenElement.src = this._imagen;

    card.appendChild(nombreElement);
    card.appendChild(especieElement);
    card.appendChild(imagenElement);

    // Inyectar la tarjeta en el DOM
    const container = document.getElementById('personajes-container');
    container.appendChild(card);
  }
}

async function obtenerDatos() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const datos = await response.json();

    return datos.results;
  } catch (error) {
    console.log("Ha ocurrido un error: ", error);
  }
}

async function mostrarDatos() {
  const resultados = await obtenerDatos();
  if (resultados) {
    for (let i = 0; i < resultados.length; i++) {
      const personajes = resultados[i];

      const responsePersonajes = await fetch(personajes.url);
      const datosPersonajes = await responsePersonajes.json();

      const name = datosPersonajes.name;
      const species = datosPersonajes.species;
      const image = datosPersonajes.image;

      const personaje = new Personaje(name, species, image);
      personaje.show();
    }
  }
}

mostrarDatos();
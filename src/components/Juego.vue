<template>
  <div class="principal">
    <div class="contenedor1">
      <div>
        <h1 class="parratitu">¿QUIÉN ES ESE POKÉMON?</h1>
      </div>
    </div>
    <div class="contenedor2">
      <div class="imgpok">
        <img
          v-if="pokemon"
          class="imagendepokemon"
          :style="{ filter: pokemonCorrecto ? 'none' : brillo }"
          :src="pokemon.sprites.other.dream_world.front_default"
          alt="Imagen del Pokémon"
        />
        <p v-else>Cargando Pokémon...</p>
      </div>
      <div class="estadistica">
        <div class="q-pa-md flex flex-center">
          <p class="estapokemon">SALUD</p>
          <q-circular-progress
            :value="puntosSalud"
            size="50px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"
            class="q-ma-md"
          />
          <br />
          <p class="estapokemon">ATAQUE</p>
          <q-circular-progress
            :value="ataque"
            size="50px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"
            class="q-ma-md"
          />
          <br />
          <p class="estapokemon">DEFENSA</p>
          <q-circular-progress
            :value="defensa"
            size="50px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"
            class="q-ma-md"
          />
          <br />
          <p class="estapokemon">ATAQUE ESPECIAL</p>
          <q-circular-progress
            :value="ataqueEspecial"
            size="50px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"
            class="q-ma-md"
          />
          <br />
          <p class="estapokemon">DEFENSA ESPECIAL</p>
          <q-circular-progress
            :value="defensaEspecial"
            size="50px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"
            class="q-ma-md"
          />
          <br />
          <p class="estapokemon">VELOCIDAD</p>

          <q-circular-progress
            :value="velocidad"
            size="50px"
            :thickness="0.22"
            color="purple"
            track-color="grey-3"
            class="q-ma-md"
          />
        </div>
      </div>
    </div>
    <div class="contenedor3">
      <input
        type="text"
        id="nombrepok"
        v-model="nombrepoke"
        placeholder="Ingrese el nombre del Pokémon aquí"
      />
      <div class="botones">
        <button
          class="validar"
          @click="validarPokemon"
          :disabled="pokemonCorrecto"
        >
          VALIDAR
        </button>
        <button class="siguiente" @click="cargarNuevoPokemon">Siguiente</button>
      </div>
    </div>
    <div v-if="errorCampoVacio" class="alerta-vacio">
      <img
        src="https://i.pinimg.com/originals/6e/4e/03/6e4e030b11b113f046a2a0be16f9c9ee.gif"
        alt="Gif Sonriente"
      />
      <p>Por favor ingrese el nombre del Pokémon</p>
    </div>

    <div v-if="errorPokemonIncorrecto" class="alerta-error">
      <img src="https://i.gifer.com/Mw74.gif" alt="Gif Triste" />
      <p>Lo siento, ese no es el Pokémon correcto</p>
    </div>

    <div v-if="pokemonCorrecto" class="alerta-correcto">
      <img
        src="https://projectpokemon.org/home/uploads/monthly_2021_01/large.5f3b7da953ca75b6-animated-pokemon-gif-auto-design-tech.gif.8149f6785bbf6d5b0614fc68a987f815.gif"
        alt="Gif Feliz"
      />
      <p>¡Correcto! Ese es el Pokémon</p>
      <button @click="cargarNuevoPokemon">Siguiente</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

let brillo = ref("brightness(0%)");
let pokemon = ref(null);
let nombrepoke = ref("");
let errorCampoVacio = ref(false);
let errorPokemonIncorrecto = ref(false);
let pokemonCorrecto = ref(false);
let velocidad = ref(0);
let ataque = ref(0);
let defensa = ref(0); 
let ataqueEspecial = ref(0);
let defensaEspecial = ref(0); 
let puntosSalud = ref(0); 
onMounted(async () => {
  try {
    await cargarPokemonAleatorio();
  } catch (error) {
    console.error("Error al cargar el Pokémon:", error);
  }
});

async function cargarPokemonAleatorio() {
  const randomPokemonId = Math.floor(Math.random() * 898) + 1;
  let response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
  );
  pokemon.value = response.data;
  console.log("Nombre del Pokémon:", pokemon.value.name);
  actualizarValoresPokemon();
}

function actualizarValoresPokemon() {
  velocidad.value = pokemon.value.stats.find(
    (stat) => stat.stat.name === "speed"
  ).base_stat;
  ataque.value = pokemon.value.stats.find(
    (stat) => stat.stat.name === "attack"
  ).base_stat;
  defensa.value = pokemon.value.stats.find(
    (stat) => stat.stat.name === "defense"
  ).base_stat;
  ataqueEspecial.value = pokemon.value.stats.find(
    (stat) => stat.stat.name === "special-attack"
  ).base_stat;
  defensaEspecial.value = pokemon.value.stats.find(
    (stat) => stat.stat.name === "special-defense"
  ).base_stat;
  puntosSalud.value = pokemon.value.stats.find(
    (stat) => stat.stat.name === "hp"
  ).base_stat;
}

function validarPokemon() {
  if (nombrepoke.value.trim() === "") {
    errorCampoVacio.value = true;
    errorPokemonIncorrecto.value = false; 
    pokemonCorrecto.value = false; 
    setTimeout(() => {
      errorCampoVacio.value = false;
    }, 3000);
    return;
  }


  if (nombrepoke.value === pokemon.value.name) {
    errorCampoVacio.value = false;
    errorPokemonIncorrecto.value = false;
    pokemonCorrecto.value = true; 
    return;
  } else {
    errorCampoVacio.value = false;
    errorPokemonIncorrecto.value = true; 
    pokemonCorrecto.value = false; 
    setTimeout(() => {
      errorPokemonIncorrecto.value = false;
    }, 3000); 
    return;
  }
}


function cargarNuevoPokemon() {
  cargarPokemonAleatorio();
  nombrepoke.value = "";
  pokemonCorrecto.value = false;
}
</script>


<style>
.principal {
  height: 100vh;
  background-color: rgb(197, 24, 24);
}
.contenedor1 {
  display: flex;
  justify-content: center;
}
.parratitu {
  font-weight: bolder;
  color: yellow;
}
.imgpok {
  display: flex;
  justify-content: center;
}


.imagendepokemon {
  height: 300px;
}


.imagendepokemon.color {
  filter: none;
}

.contenedor2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 10px;
}
.contenedor3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
#nombrepok {
  width: 30%;
  height: 30px;
}
.validar {
  width: 180px;
  height: 40px;
  background-color: rgb(235, 211, 28);
  color: rgb(73, 70, 70);
}
.siguiente {
  width: 100%;
  height: 40px;
  background-color: rgb(235, 211, 28);
    color: rgb(73, 70, 70);

}
.botones {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
#nombrepok{
  background-color: rgb(212, 212, 116);
height: 50px;
}
.alerta-vacio,
.alerta-error,
.alerta-correcto {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.alerta-vacio,
.alerta-error,
.alerta-correcto {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px; 
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
}

.alerta-vacio img,
.alerta-error img,
.alerta-correcto img {
  width: 100px;
  height: 100px;
}

.alerta-vacio p,
.alerta-error p,
.alerta-correcto p {
  font-size: 20px;
}
.estapokemon {
  font-size: 15px;
}
@media(max-width:1300px){
  .parratitu{
    font-size: 70px;
  }
}
@media(max-width:950px){
  .parratitu{
    font-size: 50px;
  }
}
@media(max-width:700px){
  .parratitu{
    font-size: 30px;
  }
}
@media (max-width: 550px){
  .contenedor2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

}
.botones {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
}
</style>

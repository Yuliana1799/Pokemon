<template>
  <div class="carta">
    <div class="contenedor_boton">
      <button class="boton" @click="traer">TRAER POKEMON</button>
    </div>
    <div class="cuerpo" v-if="pokemon">
      <div class="cont1">
        <h2 class="numero">N° {{ pokemon.id }}</h2>
        <br />
        <h1 class="nompok">{{ pokemon.name }}</h1>
        <h2 class="datospok">Altura: {{ pokemon.height }}</h2>
        <h2 class="datospok">Peso: {{ pokemon.weight }}</h2>
      </div>

      <div class="cont2">
        <img
          class="imagendepokemon1"
          v-if="pokemon.sprites"
          :src="pokemon.sprites.other.dream_world.front_default"
          alt="No fue posible traer la imagen."
        />
      </div>
    </div>

    <div class="P_principal" v-else>
      <p>Presiona el botón para obtener los datos de un Pokémon.</p>
    </div>
    <div class="cont3">
      <div class="estadisticas">
        <div class="estadistica">
          <div class="q-pa-md flex flex-center">
            <p class="estapokemon">SALUD</p>
            <q-circular-progress
              :value="puntosSalud"
              size="80px"
              :thickness="0.22"
              color="purple"
              track-color="grey-3"
              class="q-ma-md"
            />
            <br />
            <p class="estapokemon">ATAQUE</p>
            <q-circular-progress
              :value="ataque"
              size="80px"
              :thickness="0.22"
              color="purple"
              track-color="grey-3"
              class="q-ma-md"
            />
            <br />
            <p class="estapokemon">DEFENSA</p>
            <q-circular-progress
              :value="defensa"
              size="80px"
              :thickness="0.22"
              color="purple"
              track-color="grey-3"
              class="q-ma-md"
            />
            <br />
            <p class="estapokemon">ATAQUE ESPECIAL</p>
            <q-circular-progress
              :value="ataqueEspecial"
              size="80px"
              :thickness="0.22"
              color="purple"
              track-color="grey-3"
              class="q-ma-md"
            />
            <br />
            <p class="estapokemon">DEFENSA ESPECIAL</p>
            <q-circular-progress
              :value="defensaEspecial"
              size="80px"
              :thickness="0.22"
              color="purple"
              track-color="grey-3"
              class="q-ma-md"
            />
            <br />
            <p class="estapokemon">VELOCIDAD</p>

            <q-circular-progress
              :value="velocidad"
              size="80px"
              :thickness="0.22"
              color="purple"
              track-color="grey-3"
              class="q-ma-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import axios from "axios";

let pokemon = ref(null);
let velocidad = ref(0);
let ataque = ref(0);
let defensa = ref(0);
let ataqueEspecial = ref(0);
let defensaEspecial = ref(0);
let puntosSalud = ref(0);

async function traer() {
  try {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    let r = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
    );
    pokemon.value = r.data;
    console.log(r.data);
    actualizarValoresPokemon();
  } catch (error) {
    console.log(error);
  }
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
</script>
  
  <style>
* {
  margin: 0;
  padding: 0;
}
.carta {
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(to bottom, #ff0000, #ce4d4d, #e84545);
}
.contenedor_boton {
  display: flex;
  justify-content: center;
}
.boton {
  background-image: linear-gradient(to bottom, #eac910, #d1c45f, #d8db14);
  font-size: 20px;
  font-weight: bolder;
  width: 10%;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  color: #787878;
}
.cuerpo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
}
.cont1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cont2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.cont3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
img {
  height: auto;
  width: 400px;
}
.numero {
  font-size: 80px;
  color: rgb(255, 255, 255);
}
.nompok {
  font-size: 60px;
  color: #ffffff;
}
.datospok {
  font-size: 35px;
  color: #ffffff;
}
p {
  font-size: 30px;
  font-weight: bolder;
  color: rgb(255, 255, 255);
}
.P_principal {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.imagendepokemon1 {
  height: 350px;
}
@media (max-width: 1200px) {
  .boton {
    font-size: 13px;
  }
}
@media (max-width: 780px) {
  .boton {
    width: 80px;
  }
  .nompok{
    font-size: 30px;
    color: #ffffff;
  }
  .datospok {
  font-size: 16px;
  color: #ffffff;
}
.numero{
  font-size: 40px;
}

}
@media (max-width: 600px) {
  .imagendepokemon1 {
    height: 160px;
  }
  .cuerpo {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}
}
@media (max-width: 400px) {
.contenedor_boton {
  display: flex;
  justify-content: left;
}
.cont1 {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
}
}
</style>
  
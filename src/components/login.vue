<template>
  <div>
    <div class="bienvenido">
      <h1 class="parra-login">Bienvenido Amigo/a</h1>
    </div>
    <div></div>

    <div class="pregunta">
      <h2 class="tex-preg">Que quieres Hacer?</h2>
    </div>
    <div class="botones">
      <div class="boton1">
        <router-link class="botoncito" :to="'/Cartas'">
          <button class="botoncito">CARTAS</button>
        </router-link>
        <div class="imgcarta" @click="redirectToCartas">
          <img
            id="p"
            src="https://i.pinimg.com/originals/82/32/93/8232934601a59ccc519daf621286f7ce.gif"
            alt="gif"
          />
        </div>
      </div>
      <div class="boton2">
        <router-link class="botoncito" :to="'/Juego'">
          <button class="botoncito">JUGAR</button>
        </router-link>
        <div class="imgcarta" @click="redirectToJuego">
          <img
            id="p"
            src="https://i.pinimg.com/originals/23/0c/68/230c68295a086b46a3bd01d03bef7719.gif"
            alt="gif"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToCartas = () => {
  router.push("/Cartas");
};

const redirectToJuego = () => {
  router.push("/Juego");
};
</script>
<style>
body {
  background: url(../pokemon.jpg) no-repeat;
  background-size: cover;
}

.bienvenido {
  display: flex;
  justify-content: center;
  background-color: transparent;
  backdrop-filter: blur(25px);
  width: 70vw;
  margin: auto;
}
.parra-login {
  font-size: 120px;
}
.botoncito {
  width: 200px;
  margin-bottom: 10px;
  background-image: linear-gradient(to bottom, #000000, #ffffff, #000000);
  font-size: 20px;
  border-radius: 5px;
}
.botones {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  margin-bottom: 30px;
}
.boton1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.boton2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pregunta {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.tex-preg {
  color: black;
  font-weight: bold;
  font-size: 40px;
}
#p {
  height: 300px;
  width: 200px;
  border-radius: 10%;
}
@media (max-width: 1500px) {
  .parra-login {
    font-size: 80px;
  }
}
@media(max-width:500px){
  .botones {
  display: grid;
  grid-template-columns: repeat(1, 1fr);

}
}
</style>

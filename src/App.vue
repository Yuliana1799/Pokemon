<template>
  <div class="app" :style="{ backgroundColor: color2 }">
    <div class="cont_titulo">
      <h1 class="text_titulo">Talonario</h1>
    </div>
    <div :class="Alerta()">
      <div class="cont_alerta">
        <p class="text_alerta">{{ alerta }}</p>
      </div>
    </div>
    <div class="container" v-if="RegistroTalonario">
      <div class="cont_form">
        <div :style="{ backgroundColor: color1 }" class="form">
          <div class="cont_titulo_form">
            <p class="text_titulo_form">Crear talonario</p>
          </div>
          <div class="cont_text_premio">
            <input type="text" placeholder="Ingrese el premio" v-model="premio">
          </div>
          <div class="cont_text_precio">
            <input type="number" placeholder="Ingrese el valor de la balota" v-model="Precio">
          </div>
          <div class="cont_tipos_loterias">
            <p class="text_tipos_loterias">Tipo de loteria</p>
            <select v-model="selectedLoteria">
              <option value="Dorado Mañana">Dorado Mañana</option>
              <option value="Dorado Tarde">Dorado Tarde</option>
              <option value="Santander">Santander</option>
              <option value="Culona">Culona</option>
              <option value="Boyaca">Boyaca</option>
              <option value="Cafeterito">Cafeterito</option>
              <option value="Cundinamarca">Cundinamarca</option>
            </select>
          </div>
          <div class="cont_num_boletas">
            <p class="text_numero_puestos">Numero de puestos</p>
            <select v-model="selectedCantidad">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
          <div class="cont_fecha">
            <input type="date" v-model="fecha" @change="validarFecha">
          </div>
          <div class="cont_btn">
            <button :style="{ backgroundColor: color3 }" class="btn" @click="crearTalonario()">Crear</button>
          </div>
          <div class="cont_btn_atras" v-if="cerrar_editar">
            <button :style="{ backgroundColor: color3 }" @click="atras6()">Atrás</button>
          </div>
        </div>
      </div>

    </div>
    <div class="cont_forma_registro" v-if="RegistrarDueño">
      <div :style="{ backgroundColor: color1 }" class="cont_form_registro">
        <p class="nam_div_registro">Registro de boletas</p>
        <div class="cont_nombre">
          <input type="text" placeholder="Nombre" v-model="nombre">
        </div>
        <div class="cont_telefono">
          <input type="number" placeholder="Telefono" v-model="telefono">
        </div>
        <div class="cont_direccion">
          <input type="text" placeholder="Direccion" v-model="direccion">
        </div>
        <div class="cont_opciones_boleta">
          <p class="text_option">Pagar boleta?</p>
          <select v-model="selectedBoleta">
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div class="cont_btn_registro">
          <button :style="{ backgroundColor: color3 }" class="btn_registro" @click="registrar()">Registrar</button>
        </div>
        <div class="cont_btn_atras">
          <button :style="{ backgroundColor: color3 }" @click="atras5()">Atrás</button>
        </div>
      </div>
    </div>
    <div class="cuerpo_info" v-if="cuerpo">
      <div class="cont_info_body">
        <div class="cont_titulo_body">
          <p class="text_body">Información</p>
        </div>
        <div class="cont_info_loteria">
          <div class="cont_trofeo">
            <div class="cont_img_t">
              <img src="../img/trofeo.png" class="img_trofeo">
            </div>
            <div class="cont_text_t">
              <p class="text_trofeo">{{ premio_Verificado }}</p>
            </div>
          </div>
          <div class="cont_precio">
            <div class="cont_img_p">
              <img src="../img/simbolo-de-dolar.png" class="img_dolar">
            </div>
            <div class="cont_text_p">
              <p class="text_precio">{{ Precio_Verificado }}</p>
            </div>
          </div>
          <div class="cont_loteria">
            <div class="cont_img_l">
              <img src="../img/banco.png" class="img_museo">
            </div>
            <div class="cont_text_l">
              <p class="text_loteria">{{ selectedLoteria_Verificado }}</p>
            </div>
          </div>
          <div class="cont_calendario">
            <div class="cont_img_c">
              <img src="../img/calendario.png" class="img_calendario">
            </div>
            <div class="cont_text_c">
              <p class="text_calendario">{{ fecha_Verificado }}</p>
            </div>
          </div>
          <div class="cont_btn_editar">
            <button :style="{ backgroundColor: color3 }" class="btn_editar" @click="editarTalonario()">Editar</button>
          </div>
        </div>
      </div>
      <div class="conte_balotas">
        <div v-for="(boleta, i) in boleta" :key="i" :class="getBoletaColor(boleta.estado)">
          <div class="cont_balota" @click="comprarBoleta(i)">
            <div class="cont_num_balota">
              <p class="text_num_balota">{{ boleta.item - 1 }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cont_acciones">
        <div class="cont_titulo_acciones">
          <p class="text_acciones">Acciones</p>
        </div>
        <div class="cont_info_acciones">
          <div class="cont_btn1">
            <button @click="ganador" :style="{ backgroundColor: color3 }" class="btn1">Estado</button>
          </div>
          <div class="cont_btn2">
            <button :style="{ backgroundColor: color3 }" class="btn2" @click="listarBoletas()">Listar tus
              boletas</button>
          </div>
          <div class="cont_btn3">
            <button :style="{ backgroundColor: color3 }" class="btn3" @click="personalizarColores()">Personalizar
              talonario</button>
          </div>
          <div class="cont_btn4">
            <button :style="{ backgroundColor: color3 }" class="btn4" @click="imprimir()">Generar PDF</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cont_balotas_compradas" v-if="balotasCompradas">
      <div>
        <button :style="{ backgroundColor: color3 }" class="button_atras" @click="atras()">Regresar</button>
        <table class="tabla_boletas">
          <tr>
            <th>Numero de boleta</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Estado de pago</th>
          </tr>
          <tr class="balotas_compradas" v-for="(boletasCompradas, i) in boletasCompradas" :key="i">
            <td>{{ boletasCompradas.numero - 1}}</td>
            <td>{{ boletasCompradas.nombre }}</td>
            <td>{{ boletasCompradas.telefono }}</td>
            <td>{{ boletasCompradas.direccion }}</td>
            <td>{{ boletasCompradas.pago }}</td>
          </tr>
        </table>

      </div>
    </div>
    <div class="cont_options_boletas" v-if="cont_options_boletas">
      <div class="options_boletas">
        <div class="cont_btn_datos">
          <button :style="{ backgroundColor: color3 }" @click="DatosDueño()">Información dueño</button>
        </div>
        <div class="cont_btn_pagar" v-if="pagarBoleta">
          <button :style="{ backgroundColor: color3 }" @click="PagarBoleta()">Pagar boleta</button>
        </div>
        <div class="cont_btn_liberar">
          <button :style="{ backgroundColor: color3 }" @click="liberarBalota()">Liberar balota</button>
        </div>
        <div class="cont_btn_atras">
          <button :style="{ backgroundColor: color3 }" @click="atras2()">Regresar</button>
        </div>
      </div>
    </div>
    <div class="cont_datos_dueño" v-if="cont_datos_dueño">
      <div class="datos_dueño">
        <div class="info_nombre">
          <p class="text_info_nombre">Nombre:</p>
          <p class="text_nombre">{{ dueño.nombre }}</p>
        </div>
        <div class="info_telefono">
          <p class="text_info_telefono">Telefono:</p>
          <p class="text_telefono">{{ dueño.telefono }}</p>
        </div>
        <div class="info_direccion">
          <p class="text_info_direccion">Direccion:</p>
          <p class="text_direccion">{{ dueño.direccion }}</p>
        </div>
        <div class="info_pago">
          <p class="text_info_pago">Estado</p>
          <p class="text_pago">{{ dueño.pago }}</p>
        </div>
        <div class="cont_btn_editar">
          <button class="cont_btn_editar1" @click="editarDueño()">Editar</button>
        </div>
        <div class="cont_btn_atras">
          <button :style="{ backgroundColor: color3 }" @click="atras3()">Atrás</button>
        </div>
      </div>
    </div>
    <div class="cont_colores" v-if="contColores">
      <div class="colores">
        <div class="cont_color1">
          <p class="text_color1">Formularios</p>
          <input type="color" v-model="color1" class="color1">
        </div>
        <div class="cont_color2">
          <p class="text_color2">Fondo</p>
          <input type="color" v-model="color2" class="color2">
        </div>
        <div class="cont_color3">
          <p class="text_color3">Botones</p>
          <input type="color" v-model="color3" class="color3">
        </div>
        <div class="cont_btn_atras">
          <button :style="{ backgroundColor: color3 }" @click="atras4()">Atrás</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

jsPDF.autoTable = autoTable;

const premio = ref('');
const premio_Verificado = ref('');
const Precio = ref('');
const Precio_Verificado = ref('');
const selectedLoteria = ref('');
const selectedLoteria_Verificado = ref('');
const selectedCantidad = ref('');
const selectedBoleta = ref('');
const fecha = ref('');
const fecha_Verificado = ref('');
const nombre = ref('');
const telefono = ref('');
const direccion = ref('');
const pago = ref('');
const RegistroTalonario = ref(true);
const RegistrarDueño = ref(false);
const cuerpo = ref(false);
const boletaSeleccionada = ref(null);
const balotasCompradas = ref(false);
const estado = ref(0);
const cont_options_boletas = ref(false);
const pagarBoleta = ref(false);
const estadoBoleta = ref('');
const alerta = ref('');
const cont_datos_dueño = ref(false);
const id = ref(0);
let i = ref(0);
const contColores = ref(false);
const color1 = ref('#dbdbdb');
const color2 = ref('#ffffff');
const color3 = ref('#262697');
const cerrar_editar = ref(false)


const boleta = ref([]);
const boletasCompradas = ref([]);
const dueño = ref([]);

const datosTalonario = ref({
  premio: '',
  Precio: '',
  selectedLoteria: '',
  selectedCantidad: '',
  fecha: ''
});






const ocultarAlerta = () => {
  setTimeout(() => {
    alerta.value = '';
    Alerta();
  }, 2500);
};

const Alerta = () => {
  if (alerta.value !== '') {
    return 'alerta2';
  }
  else {
    return 'alerta';
  }
};

const crearTalonario = () => {
  boleta.value = [];
  if (premio.value === '' || Precio.value === '' || selectedLoteria.value === '' || selectedCantidad.value === '' || fecha.value === '') {
    alerta.value = 'Todos los campos son obligatorios';
    ocultarAlerta();
    return;
  }
  else {
    premio_Verificado.value = premio.value;
    Precio_Verificado.value = Precio.value;
    selectedLoteria_Verificado.value = selectedLoteria.value;
    fecha_Verificado.value = fecha.value;
    const cantidad = selectedCantidad.value;

    for (let i = 0; i < cantidad; i++) {
      boleta.value.push({
        item: i + 1,
        estado: estado.value,
      });
    }
    RegistroTalonario.value = false;
    cuerpo.value = true;
  }
};

const comprarBoleta = (index) => {
  boletaSeleccionada.value = index;
  if (boleta.value[index].estado === 0) {
    RegistrarDueño.value = true;
    cuerpo.value = false;
  }
  else if (boleta.value[index].estado === 1) {
    cont_options_boletas.value = true;
    pagarBoleta.value = false;
    cuerpo.value = false;
    i = boletasCompradas.value.findIndex((boletaComprada) => {
      return boletaComprada.numero === boleta.value[index].item;
    });
  }
  else if (boleta.value[index].estado === 2) {
    cont_options_boletas.value = true;
    pagarBoleta.value = true;
    cuerpo.value = false;
    i = boletasCompradas.value.findIndex((boletaComprada) => {
      return boletaComprada.numero === boleta.value[index].item;
    });
  }
};

const validarFecha = () => {
  const fechaSeleccionada = new Date(fecha.value);
  const fechaHoy = new Date();

  fechaHoy.setHours(0, 0, 0, 0); // Establecer la hora actual a las 00:00:00

  if (fechaSeleccionada < fechaHoy) {
    alerta.value = 'Elige una fecha posterior a la actual';
    fecha.value = ''; 
    ocultarAlerta();
  }
};
const registrar = () => {
  if (nombre.value === '' || telefono.value === '' || direccion.value === '' || selectedBoleta.value === '') {
    alerta.value = 'Todos los campos son obligatorios';
    ocultarAlerta();
    return;
  }
  else {
    if (selectedBoleta.value === 'Si') {
      estado.value = 1;
      estadoBoleta.value = "Pagada";
    }
    else {
      estado.value = 2;
      estadoBoleta.value = "No pagada";
    }

    if (boletasCompradas.value.some(boletaComprada => boletaComprada.numero === boleta.value[boletaSeleccionada.value].item)) {
      boletasCompradas.value.forEach(boletaComprada => {
        if (boletaComprada.numero === boleta.value[boletaSeleccionada.value].item) {
          boletaComprada.nombre = nombre.value;
          boletaComprada.telefono = telefono.value;
          boletaComprada.direccion = direccion.value;
          boletaComprada.pago = estadoBoleta.value;
        }
      });
    } else {
      boletasCompradas.value.push({
      id: id.value++,
      numero: boleta.value[boletaSeleccionada.value].item,
      nombre: nombre.value,
      telefono: telefono.value,
      direccion: direccion.value,
      pago: estadoBoleta.value,
    });
    }
    boleta.value[boletaSeleccionada.value].estado = estado.value;
    nombre.value = '';
    telefono.value = '';
    direccion.value = '';
    pago.value = '';
    selectedBoleta.value = '';
    estado.value = 0;
    RegistrarDueño.value = false;
    cuerpo.value = true;
  }
  console.log(boletasCompradas.value);
};

const DatosDueño = () => {
  cont_datos_dueño.value = true;
  cont_options_boletas.value = false;
  cuerpo.value = false;

  dueño.value = {
    nombre: boletasCompradas.value[i].nombre,
    telefono: boletasCompradas.value[i].telefono,
    direccion: boletasCompradas.value[i].direccion,
    pago: boletasCompradas.value[i].pago,
  };
};

const editarDueño = () => {
  nombre.value = dueño.value.nombre;
  telefono.value = dueño.value.telefono;
  direccion.value = dueño.value.direccion;
  if (dueño.value.pago === "Pagada") {
    selectedBoleta.value = "Si";
  }
  else {
    selectedBoleta.value = "No";
  }
  cont_datos_dueño.value = false;
  RegistrarDueño.value = true;
};

const PagarBoleta = () => {
  boleta.value[boletaSeleccionada.value].estado = 1;
  boletasCompradas.value[i].pago = "Pagada";
  cont_options_boletas.value = false;
  cuerpo.value = true;
};

const liberarBalota = () => {
  const selectedBoletaIndex = boletaSeleccionada.value;
  boleta.value[selectedBoletaIndex].estado = 0;
  cont_options_boletas.value = false;
  cuerpo.value = true;

  boletasCompradas.value = boletasCompradas.value.filter((boletaComprada) => {
    return boletaComprada.numero !== boleta.value[selectedBoletaIndex].item;
  });
};

const atras = () => {
  balotasCompradas.value = false;
  cuerpo.value = true;
};

const atras2 = () => {
  cont_options_boletas.value = false;
  cuerpo.value = true;
};

const atras3 = () => {
  cont_datos_dueño.value = false;
  cuerpo.value = true;
};

const atras4 = () => {
  contColores.value = false;
  cuerpo.value = true;
};

const atras5 = () => {
  RegistrarDueño.value = false;
  cuerpo.value = true;
};

const atras6 = () => {
  RegistroTalonario.value = false;
  cuerpo.value = true;
};
const getBoletaColor = (estado) => {
  switch (estado) {
    case 0:
      return 'ClaseInicial';
    case 1:
      return 'ClasePagada';
    case 2:
      return 'ClaseNoPagada';
      case 3:
      return 'claseGanadora';
  }
};


const editarTalonario = () => {
  datosTalonario.value = {
    premio: premio_Verificado.value,
    Precio: Precio_Verificado.value,
    selectedLoteria: selectedLoteria_Verificado.value,
    selectedCantidad: selectedCantidad.value,
    fecha: fecha_Verificado.value
  };
  cerrar_editar.value = true
  RegistroTalonario.value = true;
  cuerpo.value = false;
};

const listarBoletas = () => {
  balotasCompradas.value = true;
  cuerpo.value = false;
};

const personalizarColores = () => {
  contColores.value = true;
  cuerpo.value = false;
};

const imprimir = () => {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text("Resumen de boletas vendidas", 10, 10);

  const tableData = boletasCompradas.value.map((boleta, index) => [
    boleta.numero,
    boleta.nombre,
    boleta.telefono,
    boleta.direccion,
    boleta.pago,
  ]);

  doc.autoTable({
    head: [["Boleta", "Nombre", "Teléfono", "Dirección", "Pago"]],
    body: tableData,
    startY: 20,
  });

  const totalBoletas = boletasCompradas.value.length;
  doc.text(`Total de balotas compradas: ${totalBoletas}`, 10, doc.autoTable.previous.finalY + 10);

  const totaldinerorecaudado = boletasCompradas.value.reduce((acc, boleta) => {
    if (boleta.pago === "Pagada") {
      return acc + parseInt(Precio_Verificado.value);
    }
    return acc;
  }, 0);

  doc.text(`Total recaudado: ${totaldinerorecaudado}`, 10, doc.autoTable.previous.finalY + 20);

  doc.save("reporte.pdf");
};
const ganador = () => {
  Swal.fire({
    width: 400,
    title: "Digite la balota ganadora",
    input: "text",
    text: "Por favor, ingrese la boleta ganadora",
    color: "white",
    background: "rgb(47, 54, 206  )",
    inputValidator: (value) => {
      if (!/^\d+$/.test(value) || parseInt(value) < 1 || parseInt(value) > 99) {
        return "Por favor, ingrese un número válido entre 1 y 100.";
      }
    },
  }).then((result) => {
  if (result.isConfirmed) {
    const numeroGanador = parseInt(result.value);
    console.log("Número ganador:", numeroGanador);
    boleta.value[numeroGanador].estado=3
    
}
});
;
;
};



</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  
}

.cont_titulo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 14vh;
  background-color: #262697;
  color: #ffffff;
  text-transform: uppercase;
}

.text_titulo {
  font-size: 40px;
}

.alerta {
  display: none;
}

.alerta2 {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.cont_alerta {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #2525bd;
  color: #ffffff;
  width: 20%;
  height: 15vh;
  border-radius: 10px;
}

.text_alerta {
  font-size: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.cont_form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  border-radius: 10px;
}

.cont_titulo_form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 20px;
}

.cont_text_premio,
.cont_text_precio {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.cont_tipos_loterias,
.cont_num_boletas {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.cont_fecha {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.cont_text_premio input,
.cont_text_precio input,
.cont_tipos_loterias select,
.cont_num_boletas select,
.cont_fecha input {
  width: 90%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #000000;
}

.cont_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px 0;
}

.btn {
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.cont_forma_registro {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.cont_form_registro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  border-radius: 10px;
}

.nam_div_registro {
  font-size: 20px;
  margin-bottom: 15px;
}

.cont_nombre,
.cont_telefono,
.cont_direccion,
.cont_btn_registro {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.cont_opciones_boleta {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.cont_nombre input,
.cont_telefono input,
.cont_direccion input {
  width: 90%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #000000;
}

.cont_opciones_boleta select {
  width: 90%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #000000;
}

.cont_btn_registro {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.btn_registro {
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.cuerpo_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.cont_info_body {
  width: 20%;
  background-color: #dbdbdbf2;
  border-radius: 10px;
  margin-left: 10px;
  padding: 8px 1%;
}

.cont_titulo_body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 20px;
}

.cont_trofeo,
.cont_precio,
.cont_loteria,
.cont_calendario,
.cont_btn_editar {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.cont_img_t,
.cont_img_p,
.cont_img_l,
.cont_img_c {
  width: 20%;
}

.cont_text_t,
.cont_text_p,
.cont_text_l,
.cont_text_c {
  display: flex;
  align-items: center;
  margin-left: 5%;
  width: 80%;
}

.img_trofeo,
.img_dolar,
.img_museo,
.img_calendario {
  width: 90%;
}

.cont_btn_editar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.btn_editar {
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.btn_editar:hover {
  transform: scale(1.1);
}

.conte_balotas {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.ClaseInicial {
  background-color: #007bff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
}

.ClasePagada {
  background-color: #00ff00;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
}

.ClaseNoPagada {
  background-color: #ff0000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
}
.claseGanadora {
  background-color: yellow;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  
}


.ClaseInicial:hover,
.ClasePagada:hover,
.ClaseNoPagada:hover {
  transform: scale(1.2);
}

.text_num_balota {
  font-size: 18px;
  color: #ffffff;
}

.cont_acciones {
  width: 20%;
  background-color: #dbdbdbf2;
  border-radius: 10px;
  margin-right: 10px;
  padding: 8px 1%;
}

.cont_titulo_acciones {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 20px;
}

.cont_info_acciones {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.cont_btn1,
.cont_btn2,
.cont_btn3,
.cont_btn4 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
}

.btn1,
.btn2,
.btn3,
.btn4 {
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.tabla_boletas {
  width: 90%;
  border-collapse: collapse;
  margin: 0 auto;
  margin-top: 10px;
}

.tabla_boletas th,
.tabla_boletas td {
  border: 1px solid #000000;
  padding: 8px;
  text-align: center;
}

.balotas_compradas {
  background-color: #dbdbdbf2;
}

.button_atras {
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
}

.button_atras:hover {
  transform: scale(1.1);
}

.cont_options_boletas {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.options_boletas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  background-color: #dbdbdbf2;
  border-radius: 10px;
  padding: 20px 2%;
}

.cont_btn_datos,
.cont_btn_pagar,
.cont_btn_liberar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.cont_btn_atras {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.cont_btn_datos button,
.cont_btn_pagar button,
.cont_btn_liberar button,
.cont_btn_atras button {
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  color: #ffffff;
  cursor: pointer;
}

.cont_btn_datos button:hover,
.cont_btn_pagar button:hover,
.cont_btn_liberar button:hover,
.cont_btn_atras button:hover {
  transform: scale(1.1);
}

.cont_datos_dueño {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.datos_dueño {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  background-color: #dbdbdbf2;
  border-radius: 10px;
  padding: 20px 2%;
}

.info_nombre,
.info_telefono,
.info_direccion,
.info_pago {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.text_info_nombre,
.text_info_telefono,
.text_info_direccion,
.text_info_pago {
  font-size: 20px;
  margin-right: 10px;
}

.text_nombre,
.text_telefono,
.text_direccion,
.text_pago {
  font-size: 20px;
}

.cont_colores {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 86vh;
}

.colores {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
  background-color: #dbdbdb;
  border-radius: 10px;
  padding: 20px 2%;
}

.cont_color1,
.cont_color2,
.cont_color3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.text_color1,
.text_color2,
.text_color3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.color1,
.color2,
.color3 {
  width: 90%;
  border: none;
  background: none;
  height: 40px;
  border-radius: 5px;
}
.cont_btn_editar1{
  background-color: rgb(38, 38, 151);
  color: white;
  padding: 0 5px;
  border-radius: 5px;
}


@media(max-width: 1000px) {
  .cuerpo_info {
    flex-direction: column;
  }

  .cont_info_body,
  .cont_acciones {
    width: 40%;
    margin: 30px 0;

  }

  .form,
  .cont_form_registro,
  .cont_alerta,
  .options_boletas,
  .datos_dueño {
    width: 40%;
  }
}

@media(max-width: 550px) {

  .form,
  .cont_form_registro,
  .cont_alerta,
  .options_boletas,
  .datos_dueño {
    width: 80%;
  }
}

@media(max-width: 530px) {
  .conte_balotas {
    grid-template-columns: repeat(8, 1fr);
  }
}
</style>
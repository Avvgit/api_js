const $datos = document.getElementById
("contenedor__datos"),
$formulario = document.getElementById("formulario"),
$nombreCiudad = document.getElementById("ciudad"),
$nombrePais = document.getElementById("pais");

let c = console.log;

$formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  if($nombrePais === "" || $nombreCiudad === ""){
    mostrarError('Ambos campos son obligatorios')
    return
  }
  callApi($nombreCiudad.value, $nombrePais.value)
});

function callApi(ciudad, pais) {
  //openweathermap.org/current
  const apiID = '2a658163e06450f06aa8334b3c879997';
  const Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;
  
  fetch(Apiurl).then((data)=> {
  return data.json();
  })
  .then((dataJson)=>{
    c(dataJson);
    if(dataJson.cod==='404'){
      mostrarError("Ciudad no encontrada...")
    }else{
      limpiar()
      mostrarClima(dataJson)
    }
  })
  .catch((err)=>{
    console.log(err)
  });
}

function mostrarClima(datos){
  const {
    name,
    main:{temp, temp_min, temp_max},
    weather: [arr],
  } = datos

  const centigrados = kelvinCentigrados(temp);
  const centigrados_max = kelvinCentigrados(temp_max);
  const centigrados_min = kelvinCentigrados(temp_min);

  const contenido = document.createElement('div');
  contenido.innerHTML = `
  <h3>Clima en ${name}</h3>
  <img src='http://openweathermap.org/img/wn/${arr.icon}@2x.png' alt='icono'>
  <h2>${centigrados}ºC</h2>
  <p>Max: ${centigrados_max}º</p>
  <p>Min: ${centigrados_min}º</p>
  `;

  $datos.appendChild(contenido);
}

function mostrarError(mensaje){
  const alerta=document.createElement('p')
  alerta.classList.add('mensaje__alerta')
  alerta.innerHTML=mensaje

  $formulario.appendChild(alerta)
  setTimeout(()=>{
    alerta.remove()
    }, 2000);
}

function kelvinCentigrados(temp) {
  return parseInt(temp - 273.15);
}

function limpiar(){
  $datos.innerHTML = ' '
}




// let persona = {
//   nombre: 'Jose',
//   pais: 'Peru',
//   trabajo: 'dev',
// };
// //para desestructurar se iguala al objeto
// let {nombre, pais, trabajo} = persona;

// c(nombre)
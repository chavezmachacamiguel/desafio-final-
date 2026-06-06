// ===============================
// MODO CLARO / OSCURO
// ===============================

function modo(){
document.body.classList.toggle("light");
}

// ===============================
// CONTROL DE GRÁFICAS
// Evita que se sobrepongan
// ===============================

let charts = {};

function crearGrafico(id,tipo,labels,datos,colores){

if(charts[id]){
charts[id].destroy();
}

const ctx=document.getElementById(id).getContext("2d");

// Detectar tamaño de pantalla
const isMobile = window.innerWidth < 768;
const fontSizeLabel = isMobile ? 22 : 28;
const fontSizeTicks = isMobile ? 20 : 24;
const fontSizeTooltip = isMobile ? 18 : 20;

charts[id]=new Chart(ctx,{

type:tipo,

data:{
labels:labels,
datasets:[{
label:"Resultado",
data:datos,
backgroundColor:colores,
borderColor:colores,
borderWidth:3
}]
},

options:{
responsive:true,
maintainAspectRatio:false,
plugins:{
legend:{
display:true,
labels:{
font:{
size:fontSizeLabel,
weight:'bold'
},
padding:25,
color:'#e2e8f0'
}
},
tooltip:{
titleFont:{
size:fontSizeTooltip,
weight:'bold'
},
bodyFont:{
size:fontSizeTooltip
},
padding:15,
backgroundColor:'rgba(0,0,0,0.9)',
titleColor:'#fbbf24',
bodyColor:'#e2e8f0'
},
datalabels:{
font:{
size:fontSizeTicks,
weight:'bold'
},
color:'#ffffff'
}
},
scales:{
y:{
display:true,
ticks:{
font:{
size:fontSizeTicks,
weight:'bold'
},
color:'#e2e8f0',
padding:15
},
grid:{
color:'rgba(51,65,85,0.3)',
lineWidth:2
}
},
x:{
display:true,
ticks:{
font:{
size:fontSizeTicks,
weight:'bold'
},
color:'#e2e8f0',
padding:15
},
grid:{
color:'rgba(51,65,85,0.3)',
lineWidth:2
}
}
}
}

});

}


// ===============================
// ACTUALIZACIÓN DEL DASHBOARD
// ===============================

function actualizarDashboard(valor,riesgo){

document.getElementById("presupuestoTotal").innerHTML=
valor.toFixed(2)+" Bs.";

document.getElementById("estadoGeneral").innerHTML=
Math.max(0,Math.min(100,valor)).toFixed(0)+"%";

document.getElementById("riesgoNivel").innerHTML=
riesgo;

if(riesgo=="ALTO"){
document.getElementById("riesgoNivel").style.color="#ef4444";
}
else if(riesgo=="MEDIO"){
document.getElementById("riesgoNivel").style.color="#f59e0b";
}
else{
document.getElementById("riesgoNivel").style.color="#22c55e";
}

}

// ===============================
// SIMULADOR 1
// ABASTECIMIENTO
// ===============================

function sim1(){

let reserva=Number(r.value);
let consumo=Number(c.value);
let reposicion=Number(re.value);

let resultado=reserva+reposicion-consumo;

if(resultado<20){

res1.innerHTML=
"🔴 Estado crítico";

diag1.innerHTML=
"Las reservas son insuficientes para cubrir la demanda actual. Existe un riesgo elevado de escasez.";

actualizarDashboard(resultado,"ALTO");

}else{

res1.innerHTML=
"🟢 Estado estable";

diag1.innerHTML=
"Las reservas disponibles permiten satisfacer el consumo sin problemas inmediatos.";

actualizarDashboard(resultado,"BAJO");

}

crearGrafico(
"g1",
"bar",
["Reserva Inicial","Disponible"],
[reserva,resultado],
["#22c55e","#ef4444"]
);

}

// ===============================
// SIMULADOR 2
// INFLACIÓN
// ===============================

function sim2(){

let anterior=Number(pa.value);
let actual=Number(pc.value);

let inflacion=((actual-anterior)/anterior)*100;

res2.innerHTML=
inflacion.toFixed(2)+" %";

if(inflacion>30){

diag2.innerHTML=
"El incremento de precios es elevado y afecta significativamente el poder adquisitivo.";

actualizarDashboard(actual,"ALTO");

}else if(inflacion>10){

diag2.innerHTML=
"La inflación es moderada y puede afectar parcialmente la economía familiar.";

actualizarDashboard(actual,"MEDIO");

}else{

diag2.innerHTML=
"La inflación se mantiene en niveles relativamente bajos.";

actualizarDashboard(actual,"BAJO");

}

document.getElementById("compraReal").innerHTML=
(100-inflacion).toFixed(1)+"%";

crearGrafico(
"g2",
"doughnut",
["Precio anterior","Precio actual"],
[anterior,actual],
["#3b82f6","#ef4444"]
);

}

// ===============================
// SIMULADOR 3
// TRANSPORTE
// ===============================

function sim3(){

let normal=Number(dn.value);
let actual=Number(dd.value);
let costo=Number(cost.value);

let extra=(actual-normal)*costo;

res3.innerHTML=
"🚚 Costo extra: "+
extra.toFixed(2)+" Bs.";

diag3.innerHTML=
"El incremento de las distancias o del combustible aumenta el costo de distribución de los productos.";

actualizarDashboard(extra,"MEDIO");

crearGrafico(
"g3",
"bar",
["Costo Normal","Costo Extra"],
[0,extra],
["#22c55e","#f97316"]
);

}

// ===============================
// SIMULADOR 4
// COMPRAS
// ===============================

function sim4(){

let presupuesto=Number(pre.value);
let gastoTotal=Number(tot.value);

let diferencia=presupuesto-gastoTotal;

if(diferencia<0){

res4.innerHTML=
"🔴 Déficit de "+
Math.abs(diferencia).toFixed(2)+
" Bs.";

diag4.innerHTML=
"Los gastos superan el presupuesto disponible.";

actualizarDashboard(diferencia,"ALTO");

}else{

res4.innerHTML=
"🟢 Ahorro de "+
diferencia.toFixed(2)+
" Bs.";

diag4.innerHTML=
"El presupuesto cubre correctamente los gastos realizados.";

actualizarDashboard(diferencia,"BAJO");

}

crearGrafico(
"g4",
"pie",
["Presupuesto","Gastos"],
[presupuesto,gastoTotal],
["#22c55e","#ef4444"]
);

}

// ===============================
// SIMULADOR 5
// RUMOR Y ESPECULACIÓN
// ===============================

function sim5(){

let demanda=Number(d.value);
let panico=Number(p.value);

let nuevaDemanda=
demanda+(demanda*panico/100);

res5.innerHTML=
"📦 Nueva demanda: "+
nuevaDemanda.toFixed(2);

diag5.innerHTML=
"El incremento de la demanda debido a rumores puede provocar escasez y aumento de precios.";

actualizarDashboard(nuevaDemanda,"MEDIO");

crearGrafico(
"g5",
"bar",
["Demanda Inicial","Demanda Final"],
[demanda,nuevaDemanda],
["#38bdf8","#f59e0b"]
);

}

// ===============================
// SIMULADOR 6
// PODER ADQUISITIVO
// ===============================

function sim6(){

let ingreso=Number(ing.value);
let gastos=Number(gasto.value);

let saldo=ingreso-gastos;

if(saldo<0){

res6.innerHTML=
"🔴 Déficit económico";

diag6.innerHTML=
"Los gastos mensuales son superiores a los ingresos disponibles.";

actualizarDashboard(saldo,"ALTO");

}else{

res6.innerHTML=
"🟢 Superávit económico";

diag6.innerHTML=
"Existe una capacidad de ahorro o inversión positiva.";

actualizarDashboard(saldo,"BAJO");

}

document.getElementById("compraReal").innerHTML=
((ingreso/gastos)*100).toFixed(1)+"%";

crearGrafico(
"g6",
"doughnut",
["Ingresos","Gastos"],
[ingreso,gastos],
["#22c55e","#ef4444"]
);

}
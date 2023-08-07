const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const entradas = ["sopa de casa","ensalada de palta","papa con huancaina"]
const segundos = ["aji de gallina","frejol con pato","ceviche"]

function gradosARadianes(grados) {
  return grados * (Math.PI / 180);
}

// Función para calcular la distancia entre dos puntos en coordenadas utilizando la fórmula del haversine
function calcularDistanciaKilometros(coord1, coord2) {
  const radioTierraKm = 6371; // Radio medio de la Tierra en kilómetros

  const [lat1, lon1] = coord1.map(gradosARadianes);
  const [lat2, lon2] = coord2.map(gradosARadianes);

  const diferenciaLatitud = lat2 - lat1;
  const diferenciaLongitud = lon2 - lon1;

  const a = Math.sin(diferenciaLatitud / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(diferenciaLongitud / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distancia = radioTierraKm * c;
  return distancia;
}

      function calcularTiempoDeViaje(distanciaKm, velocidadPromedioKmPorHora) {
  const tiempoEnHoras = distanciaKm / velocidadPromedioKmPorHora;
  const horas = Math.floor(tiempoEnHoras);
  const minutos = Math.round((tiempoEnHoras - horas) * 60);

  return { horas, minutos };
}
      const cristina = ["-11.8324017","-77.0200285"]
      const casa = ["-11.8326059","-77.0198999"]
      const renato = ["-11.8528697","-77.034375"]
      const afuera = ["-11.938599","-77.079804"]
      const sanAntonio = ["-11.859477","-77.046789"]
      const paco = ["-11.871465","-77.052768"]
      let tiempo
// =====

let entradaUser, segundoUser
const flowPrincipal = addKeyword(['menu','Menú','menú'])
   .addAnswer("Bienvenido este son las entradas", null , async (ctx,{flowDynamic}) => {

      const midata = entradas.map((m,i) =>{
         return {body:`⚡${i} 🟰  ${m}`}
      })
      return await flowDynamic(midata)
   })
   .addAnswer("😺 escribe un numero"
   , {capture:true}, async (ctx,{flowDynamic,fallBack}) =>{
      let regex = /^[012]$/
      if (!regex.test(ctx.body)) return fallBack()

      let i = parseInt(ctx.body)
      entradaUser = entradas[i]
      return await flowDynamic("muy bien 😄")
   })
    .addAnswer(
        ['*ahora estos son los segundos*'],
        null, async (ctx, { flowDynamic}) => {
      const midata = segundos.map((m,i) =>{
         return {body:`⚡${i} 🟰  ${m}`}
      })
      return await flowDynamic(midata)
        })
   .addAnswer("😺 escribe un numero"
   , {capture:true}, async (ctx,{flowDynamic, fallBack}) =>{

      let regex = /^[012]$/
      if (!regex.test(ctx.body)) return fallBack()

      let i = parseInt(ctx.body)
      segundoUser = segundos[i]
      return await flowDynamic(`tu pedido es:\n👨‍🍳 *entrada* 👉 ${entradaUser}\n👨‍🍳 *segundo* 👉 ${segundoUser}.`)
   })
/*
   .addAnswer(['te enviamos el numero oficial para el pago',"923909419","agreganos"])
   .addAnswer("luego que yapees comportenos tu comprobante, para continuar con el proceso", {capture:true}, (ctx) => {
      console.log(ctx.body)
   })
   */
   .addAnswer("comparte tu ubicaion porfavor, para poder enviar tu pedido ", {capture:true}, (ctx,{flowDynamic,endFlow}) => {
      const lat = ctx.message.locationMessage.degreesLatitude
      const lon =  ctx.message.locationMessage.degreesLongitude
      const distanciaEnKilometros = calcularDistanciaKilometros(casa,[lat,lon]);
      const velocidadPromedioKmPorHora = 20; // Velocidad promedio en kilómetros por hora (ejemplo)
       tiempo = calcularTiempoDeViaje(distanciaEnKilometros, velocidadPromedioKmPorHora);

      let {horas, minutos} = tiempo
      minutos+=7
      return flowDynamic([{body: `tiempo aproximadamente en ${horas}:${minutos < 10 ? '0' : ''}${minutos} min`},{body:"le llamaremos cuando estemos a 4 minutos de su ubicacion"}])
       //const tiempoFormateado = `${horas}:${minutos < 10 ? '0' : ''}${minutos} min`;
   })


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

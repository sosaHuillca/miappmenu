const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const menuAPI = async () => {
   return [
      {
          "entrada": "ensalda de palta",
          "segundo": "arroz con pollo",
          "refresco": "chicha morada",
      },
      {
          "entrada": "sopa de casa",
          "segundo": "frejoles con seco de pollo",
          "refresco": "chicha morada",
      },
      {
          "entrada": "sopa de casa",
          "segundo": "escabeche de pollo",
          "refresco": "chicha morada",
      },
   ]
}

const listaMenuSemana = {
   "1":{
      "entrada":["sopa de casa","ensalada de palta","papa con huancaina"],
      "segundo":["aji de gallina","frejol con pato","ceviche"]
   },
}
const entradas = ["sopa de casa","ensalada de palta","papa con huancaina"]
const segundos = ["aji de gallina","frejol con pato","ceviche"]

/*
const flowImage = addKeyword("imagen").addAnswer("Te estoy enviando una imagen",{
   media:`https://i.imgur.com/0HpzsEm.png`
})

const flowOnline = addKeyword("online").addAnswer("Perfecto te envio un link de pago", null, (ctx, {flowDynamic}) => {
   const generateLink = () => `http://milinkpage.com/pagar`
   flowDynamic([{body:`Te envio el link generado por stripe: ${generateLink()}`}])
})

const flowEfectivo = addKeyword("efectivo").addAnswer("Te espero con los billetes")

const flowPedido = addKeyword(["pedir","pedido"])
   .addAnswer("Como piensas pagar? en *efectivo* o *online*", null, null, [flowOnline, flowEfectivo] )

const flowPrincipal = addKeyword(['hola'])
   .addAnswer(['Bienvenido a restaurante'])
   .addAnswer('El menu de dia es el siguiente:', null, async (ctx, {flowDynamic}) => {

      const data = await menuAPI()

      const midata = data.map(m =>{
         return {body:`${m.nombre},${m.precio},${m.imagen}`}
      })

      await flowDynamic(midata)
   })
   .addAnswer("Escribe *pedir* si te interesa algo",{
      delay:1500
   }, null, [flowPedido])

const flowSecundario = addKeyword("gracias").addAnswer("De nada!")
*/
/**
 * Declarando flujos principales.
 */

/*
const flowHola = addKeyword(['hola', 'ola', 'alo']).addAnswer('Bienvenido a tu tienda online!')

const flowAdios = addKeyword(['adios', 'bye']).addAnswer('Que te vaya bien!!').addAnswer('Hasta luego!')

const flowProductos = addKeyword(['productos', 'info']).addAnswer('Te envio una imagen', {
    buttons: [{ body: 'Telefonos' }, { body: 'Computadoras' }, { body: 'Otros' }],
})

const flowCatalogo = addKeyword(['imagen', 'foto']).addAnswer('Te envio una imagen', {
    media: 'https://media2.giphy.com/media/VQJu0IeULuAmCwf5SL/giphy.gif',
})
*/

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */
const flowOnline = addKeyword("online").addAnswer("Perfecto te envio un link de pago", null, (ctx, {flowDynamic}) => {
   const generateLink = () => `http://milinkpage.com/pagar`
   flowDynamic([{body:`Te envio el link generado por stripe: ${generateLink()}`}])
})
const flowEfectivo = addKeyword("efectivo").addAnswer("Te espero con los billetes")

const flowPedido = addKeyword(["pedir","pedido"])
   .addAnswer("Como piensas pagar? en *efectivo* o *online*", null, null, [flowOnline, flowEfectivo] )
const flowBolsos2 = addKeyword(['bolsos2', '2'])
    .addAnswer('🤯 *MUCHOS* bolsos ...')
    .addAnswer('y mas bolsos... bla bla')

const flowZapatos2 = addKeyword(['zapatos2', '2'])
    .addAnswer('🤯 repito que tengo *MUCHOS* zapatos.')
    .addAnswer('y algunas otras cosas.')

const flowZapatos = addKeyword(['1', 'zapatos', 'ZAPATOS'])
    .addAnswer('🤯 Veo que elegiste zapatos')
    .addAnswer('Tengo muchos zapatos...bla bla')
    .addAnswer(
        ['Manda:', '*(2) Zapatos2*', 'para mas información'],
        { capture: true },
        (ctx) => {
            console.log('Aqui puedes ver más info del usuario...')
            console.log('Puedes enviar un mail, hook, etc..')
            console.log(ctx)
        },
        [flowZapatos2]
    )

const flowBolsos = addKeyword(['2', 'bolsos', 'BOLSOS'])
    .addAnswer('🙌 Veo que elegiste bolsos')
    .addAnswer('Tengo muchos bolsos...bla bla')
    .addAnswer(
        ['Manda:', '*(2) Bolsos2*', 'para mas información.'],
        { capture: true },
        (ctx) => {
            console.log('Aqui puedes ver más info del usuario...')
            console.log('Puedes enviar un mail, hook, etc..')
            console.log(ctx)
        },
        [flowBolsos2]
    )
// Declarando flujo principal
/*
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer(['Hola, bienvenido', 'HOY tenemos'])
    .addAnswer(['Tengo:', 'Zapatos', 'Bolsos', 'etc ...'])
    .addAnswer(
        ['Para continuar escribe:', '*(1) Zapatos*', '*(2) Bolsos*'],
        { capture: true },
        (ctx) => {
            console.log('Aqui puedes ver más info del usuario...')
            console.log('Puedes enviar un mail, hook, etc..')

        },
        [flowBolsos, flowZapatos]
    )
    */
/*
const flowPrincipal = addKeyword(['hola'])
   .addAnswer(['Hola, bienvenido', 'HOY tenemos'], null, async (ctx, {flowDynamic}) => {

      const data = await menuAPI()

      const midata = data.map((m,i) =>{
         return {body:`🙌  combo ${i+1}\n👉 ${m.entrada}\n👉 ${m.segundo}\n👉 ${m.refresco}`}

         //return {body:`${m.nombre},${m.precio},${m.imagen}`}
      })

      await flowDynamic(midata)
   })
   .addAnswer("Escribe *pedir* si te interesa algo",{
      delay:1500
   }, null, [flowPedido])

const flowSecundario = addKeyword("gracias").addAnswer("De nada!")
*/


/*
let nombre;
let apellidos;
let telefono;

const flowFormulario = addKeyword(['Hola','⬅️ Volver al Inicio'])
    .addAnswer(
        ['Hola!','Para enviar el formulario necesito unos datos...' ,'Escriba su *Nombre*'],
        { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == '❌ Cancelar solicitud')
             return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',    // Aquí terminamos el flow si la condicion se comple
                 buttons:[{body:'⬅️ Volver al Inicio' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow


            })
            nombre = ctx.body
            return flowDynamic(`Encantado *${nombre}*, continuamos...`)
        }
    )
    .addAnswer(
        ['También necesito tus dos apellidos'],
        { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == '❌ Cancelar solicitud')
                return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',
                    buttons:[{body:'⬅️ Volver al Inicio' }]


        })
        apellidos = ctx.body
        return flowDynamic(`Perfecto *${nombre}*, por último...`)
        }
    )
    .addAnswer(
        ['Dejeme su número de teléfono y le llamaré lo antes posible.'],
        { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

        async (ctx, { flowDynamic, endFlow }) => {
            if (ctx.body == '❌ Cancelar solicitud')
                return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',
                      buttons:[{body:'⬅️ Volver al Inicio' }]
                })


                telefono = ctx.body
                await delay(2000)
                return flowDynamic(`Estupendo *${nombre}*! te dejo el resumen de tu formulario
                \n- Nombre y apellidos: *${nombre} ${apellidos}*
                \n- Telefono: *${telefono}*`)
        }
    )

*/

/*
const flowPrincipal = addKeyword(['hola'])
   .addAnswer("Bienvenido... ")
   .addAnswer("como te llamas?", {capture:true}, (ctx) => {
      console.log(ctx)
   })
*/

/*
const flowPedido = addKeyword(["pedir","pedido"])
   .addAnswer("Como piensas pagar? en *efectivo* o *online*")

const flowPrincipal = addKeyword(['hola'])
   .addAnswer(['Bienvenido a *restaurante*'])
   .addAnswer('El menu de dia es el siguiente:', null, async (ctx, {flowDynamic}) => {

      const data = await menuAPI()

      const midata = data.map(m =>{
         return {body:`${m.nombre},${m.precio}`,media:`${m.imagen}`}
//media:`https://i.imgur.com/0HpzsEm.png`
         //media:`https://randomuser.me/api/portraits/men/6.jpg`
      })

      await flowDynamic(midata)
   })
   .addAnswer("Escribe *pedir* si te interesa algo",{
      delay:1500
   }, null, [flowPedido])

// ====
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
const distanciaEnKilometros = calcularDistanciaKilometros(casa,renato);
console.log(`La distancia entre las ubicaciones es: ${distanciaEnKilometros} kilómetros`);

const velocidadPromedioKmPorHora = 20; // Velocidad promedio en kilómetros por hora (ejemplo)

         const tiempoDeViaje = calcularTiempoDeViaje(distanciaEnKilometros, velocidadPromedioKmPorHora);

console.log(`El tiempo aproximado de viaje en automóvil sería de ${tiempoDeViaje.horas} horas y ${tiempoDeViaje.minutos} minutos.`);
// =====
const flowUbicacion = addKeyword(['mapa'])
   .addAnswer("comparte tu ubicaion porfavor", {capture:true}, (ctx,{flowDynamic,endFlow}) => {
      const lat = ctx.message.locationMessage.degreesLatitude
      const lon =  ctx.message.locationMessage.degreesLongitude
      const distanciaEnKilometros = calcularDistanciaKilometros(paco,[lat,lon]);
      const velocidadPromedioKmPorHora = 20; // Velocidad promedio en kilómetros por hora (ejemplo)
       tiempo = calcularTiempoDeViaje(distanciaEnKilometros, velocidadPromedioKmPorHora);

      let {horas, minutos} = tiempo
      minutos+=7
       //return endFlow({body: `El tiempo aproximado de entrega es ${horas} horas y ${minutos} minutos`,{body:"le llamaremos cuando estemos a 4 minutos de su ubicacion"}})
      return flowDynamic([{body: `El tiempo aproximado de entrega es ${horas} horas y ${minutos} minutos`},{body:"le llamaremos cuando estemos a 4 minutos de su ubicacion"}])
   })
   */

/*
const flowPrincipal = addKeyword(['hola'])
   .addAnswer("Bienvenido... ")
   .addAnswer("como te llamas?", {capture:true}, (ctx) => {
      console.log(ctx)
   })
*/

/*
let nombre;
let apellidos;
const flowPrincipal = addKeyword(['Hola','⬅️ Volver al Inicio'])
    .addAnswer(
        ['Hola!','Para enviar el formulario necesito unos datos...' ,'Escriba su *Nombre*'],
        { capture: true}, async (ctx, { flowDynamic}) => {
            nombre = ctx.body
            return flowDynamic(`Encantado *${nombre}*, continuamos...`)
        }
        )
    .addAnswer(
        ['También necesito tus dos apellidos'],
        { capture: true}, async (ctx, { flowDynamic}) => {
           apellidos = ctx.body
           delay:2000
           return flowDynamic(`Estupendo *${nombre}*! te dejo el resumen de tu formulario
                \n- Nombre y apellidos: *${nombre} ${apellidos}*`)
        }
        )
        */

let entradaUser, segundoUser
const flowPrincipal = addKeyword(['menu','Menú','menú'])
   .addAnswer("Bienvenido este son las entradas", null , async (ctx,{flowDynamic}) => {
      //if (!ctx.body.includes('@')) 
      

      const midata = entradas.map((m,i) =>{
         return {body:`⚡*${i}* 🟰  ${m}`}
      })
      return await flowDynamic(midata)
      /*
      let now= new Date();
console.log('La fecha actual es',now);
console.log('UNIX time:',now.getTime());
      let dayOfWeek = now.getDay();
console.log('Día de la semana:', listaMenuSemana[dayOfWeek]);
*/
      // Recorrer el objeto y listar los arrays
      /*
      const arrays = Object.values(listaMenuSemana).flatMap(objetoDia => {
   return Object.values(objetoDia);
});

const arrayUnico = [].concat(...arrays);

console.log(arrayUnico);
*/
   })
   .addAnswer("😺 escribe un numero"
   , {capture:true}, async (ctx,{flowDynamic,fallBack}) =>{
      let regex = /^[123]$/
      if (!regex.test(ctx.body)) return fallBack()

      let i = parseInt(ctx.body)
      entradaUser = entradas[i]
      //return await flowDynamic(`elegiste la opcion ${ctx.body} que es ${entradaUser.toUpperCase()}\nMuy bien continuemos...`)
      return await flowDynamic("muy bien 😄")
   })
    .addAnswer(
        ['*ahora estos son los segundos*'],
        null, async (ctx, { flowDynamic}) => {
      const midata = segundos.map((m,i) =>{
         return {body:`⚡*${i}* 🟰  ${m}`}
      })
      return await flowDynamic(midata)
        })
   .addAnswer("😺 escribe un numero"
   , {capture:true}, async (ctx,{flowDynamic, fallBack}) =>{

      let regex = /^[123]$/
      if (!regex.test(ctx.body)) return fallBack()

      let i = parseInt(ctx.body)
      segundoUser = segundos[i]
      //const entrada = entradas.find(plato => plato == ctx.body)
      return await flowDynamic(`tu pedido es:\n👨‍🍳 *entrada* 👉 ${entradaUser}\n👨‍🍳 *segundo* 👉 ${segundoUser}.`)
   })
const main = async () => {
    const adapterDB = new MockAdapter()
    //const adapterFlow = createFlow([flowHola, flowAdios, flowProductos, flowCatalogo])
    //const adapterFlow = createFlow([flowPrincipal, flowUbicacion])
   //const adapterFlow = createFlow([flowFormulario])

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

// Importamos el ficjhero con las funciones js adicionales
importScripts('js/sw-utils.js');

// Definicion de los cache
const STATIC_CACHE='static-v1';
const DYNAMIC_CACHE='dinamyc-v1';
const INMUTABLE_CACHE='inmutable-v1';
const APP_SHELL=[
//'/',

'/index.html',
'/css/style.css',
'/img/favicon.ico',
'/img/avatars/hulk.jpg',
'/img/avatars/ironman.jpg',
'/img/avatars/spiderman.jpg',
'/img/avatars/thor.jpg',
'/img/avatars/wolverine.jpg',
'/js/app.js',
'js/sw-utils.js'
]
// Array con las ibreias y objetos acaragr en Service Worker
const APP_SHELL_INMUTABLE=[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    '/css/animate.css',
    '/js/libs/jquery.js'
]

// Instalacion 

self.addEventListener('install',e =>{

// Cargamos las libreias en el STATIC_CACHE
// Para ello creamos una prtomesa en una constante
const caheStatic= caches.open(STATIC_CACHE).then(cache=>{
    cache.addAll(APP_SHELL);

});
// Ahora Cargamos las libreria en INMUTABLE_CACHE
// Para ello creamos una prtomesa en una constante
const caheInmutable= caches.open(INMUTABLE_CACHE).then(cache=>{
    cache.addAll(APP_SHELL_INMUTABLE);

});


 // Para la ejecución hasta que no se instalen las libreias , obteos, etc
 // Hasta que no se carguen las dos promesas que hemos definido
 e.waitUntil(Promise.all([caheStatic,caheInmutable]));
});

// Ahora vamos a codificar un proceso que borre todos los datos del cache que ya no son utiles.
self.addEventListener('activate', e =>{
     
    // Borrar los cache Static innecesarios   
const respuesta=caches.keys().then(keys =>{

   keys.forEach(key =>{
// Boora todos loc caches meonos el activo, el último creado
       if(key != STATIC_CACHE && key.includes('static')){

           return caches.delete(key);
       }
   });
});
});


self.addEventListener('fetch', e=>{

const respuesta=caches.match(e.request).then(res=>{


    if(res){
        return res;
    }
    else{
      //    console.log(e.request.url); 
      return fetch(e.request).then(newRes=>{
            return actualizaCacheDinamico(DYNAMIC_CACHE,e.request,newRes);
      });
    }
 
});

e.respondWith(respuesta);

})
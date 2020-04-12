// ficherod funciones js para no crer toda la funcionalidad en el sw.js y separar 
//el código
function actualizaCacheDinamico(dynamicCache,req,res){

if(res.ok){

    caches.open(dynamicCache).then(cache =>{

        cache.put(req,res.clone());
        return res.clone();
    });
}
else{return res;}

}
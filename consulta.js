import {traerConsulta,updateProduct,traeroneProduct} from './firebase.js'

const barCode = document.getElementById('codigo') 
const btnconsultar = document.getElementById('btn-buscar') 
let editStatus=false;



//para guaradr los registo en firebase
const tareaForm = document.getElementById('tarea-form')
let tbody=document.getElementById('container')




btnconsultar.addEventListener('click',async (e)=>{

    if(!editStatus){
        e.preventDefault()
        console.log(barCode)
        let codigo=barCode.value
        const querySnapshot  = await traerConsulta(codigo)
        let html            =''


        console.log('querySnapshot',querySnapshot)

        querySnapshot.forEach((doc) => {
            let fila = doc.data();
            html  +=`<tr><td>${fila.codigo}</td><td>${fila.modelo}</td><td>${fila.color}</td><td>${fila.suela}</td><td>${fila.talla}</td><td>${fila.precio}</td><td>${fila.almacen}</td><td><button class ='btn-edit' data-id='${doc.id}'>Editar</button></td><td><button class ='btn-delete' data-id='${doc.id}'>Eliminar</button></tr>`


        })
        tbody.innerHTML=html

    }else{
        e.preventDefault()
        console.log('entrado a else:')
        const categoria         = tareaForm['categoria'];
        const modelo       = tareaForm['modelo'];
        const color      = tareaForm['color'];
        const suela      = tareaForm['suela'];
        const talla      = tareaForm['talla'];
        const precio      = tareaForm['precio'];
        const almacen       = tareaForm['almacen'];
        const descripcion       = tareaForm['descripcion'];
        const id       = tareaForm['id'];
        console.log('dentro de else se capturo id de formulario:',id)
        
  
        updateProduct(id,{categoria:categoria.value,modelo:modelo.value,color:color.value,suela:suela.value,talla:talla.value,precio:precio.value,almacen:almacen.value,descripcion:descripcion.value})
        editStatus=false
        console.log('dentro de else:',editStatus)
        console.log('dentro de else:',id)
        console.log('saliendo de else:')
        tareaForm.reset()
    }

       

const btnDelete = tbody.querySelectorAll('.btn-delete')
            btnDelete.forEach(btn=>{
                btn.addEventListener('click',(e)=>{deleteProduct(e.target.dataset.id)})
            })

const btnEdit = tbody.querySelectorAll('.btn-edit')
     
btnEdit.forEach((btn)=>{
    btn.addEventListener('click', async (e)=>{
    
        console.log('id del boton edit:',e.target.dataset.id);

        const doc = await traeroneProduct(e.target.dataset.id);
        var id = doc.id
        console.log('id de doc.id',id)
        const producto = doc.data()
        console.log('producucto de doc.data()',producto)

                tareaForm['categoria'].value=producto.categoria ;
                tareaForm['codigo'].value=producto.codigo;
                tareaForm['modelo'].value=producto.modelo;
                tareaForm['color'].value=producto.color;
                tareaForm['suela'].value=producto.suela;
                tareaForm['talla'].value=producto.talla;
                tareaForm['precio'].value=producto.precio;
                tareaForm['almacen'].value=producto.almacen;
                tareaForm['descripcion'].value=producto.descripcion;
                tareaForm['id'].value=doc.id;
                

                editStatus=true;
                tareaForm['btn-buscar'].innerHTML='Actualizar'
                console.log(editStatus)


        })
});

});

 
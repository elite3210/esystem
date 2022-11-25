import {guardarProduct,onGetProduct,deleteProduct,traeroneProduct,updateProduct} from './firebase.js'


//para guaradr los registo en firebase
const tareaForm = document.getElementById('tarea-form')
let editStatus=false;
let id ='';

tareaForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  
  const categoria         = tareaForm['categoria'];
  const codigo            = tareaForm['codigo'];
  const modelo       = tareaForm['modelo'];
  const color      = tareaForm['color'];
  const suela      = tareaForm['suela'];
  const talla      = tareaForm['talla'];
  const precio      = tareaForm['precio'];
  const almacen       = tareaForm['almacen'];
  const descripcion       = tareaForm['descripcion'];
  let active              = true;

  if(!editStatus){
        guardarProduct(categoria.value,codigo.value,modelo.value,color.value,suela.value,talla.value,precio.value,almacen.value,descripcion.value,active)
    }else{
        updateProduct(id,{categoria:categoria.value,codigo:codigo.value,modelo:modelo.value,color:color.value,suela:suela.value,talla:talla.value,precio:precio.value,almacen:almacen.value,descripcion:descripcion.value})
        editStatus=false
    }

  tareaForm.reset()
})



//traer los productos de firebase
const tareasContainer = document.getElementById('tareas-container')


const registroProductos = onGetProduct((querySnapshot) =>{
    
    if(querySnapshot){
        console.log('estoy dentro del if de registrotrabajadores')
        let html = "";
        let contador =0;
        let counter= document.querySelector('.contador')
        console.log(counter)
        
   
        querySnapshot.forEach(doc =>{
            
            const fila = doc.data()
            html += `<tr><td>${fila.categoria}</td>
                        <td>${fila.codigo}</td>
                        <td>${fila.modelo}</td>
                        <td>${fila.color}</td>
                        <td>${fila.suela}</td>
                        <td>${fila.talla}</td>
                        <td>${fila.precio}</td>
                        <td>${fila.descripcion}</td>
                        <td>${fila.almacen}</td>
                        <td><button class ='btn-delete' data-id=${doc.id}>del</button></td>
                        <td><button class ='btn-edit' data-id=${doc.id}>edit</button></td>
                    </tr>`
            
            contador += 1
            //horas += ((new Date(`${fila.salida}`).getTime())-(new Date(`${fila.title}`).getTime()))/(1000*60*60)
            
        });
        
        console.log('# Registros:',contador)
        //console.log('Importe:',horas*3.125)
    
        tareasContainer.innerHTML =html;
        counter.innerHTML = contador;

        const btnDelete = tareasContainer.querySelectorAll('.btn-delete')
            btnDelete.forEach(btn=>{
                btn.addEventListener('click',(e)=>{deleteProduct(e.target.dataset.id)})
            })

        const btnEdit = tareasContainer.querySelectorAll('.btn-edit')
        
        btnEdit.forEach((btn)=>{
            btn.addEventListener('click', async (e)=>{
               id=e.target.dataset.id
                //console.log(e.target.dataset.id);
                
                const doc = await traeroneProduct(e.target.dataset.id);
                let producto=doc.data()
                
                console.log(producto)
                tareaForm['categoria'].value    =producto.categoria;
                tareaForm['codigo'].value       =producto.codigo;
                tareaForm['descripcion'].value  =producto.descripcion;
                tareaForm['modelo'].value  =producto.modelo;
                tareaForm['color'].value  =producto.color;
                tareaForm['suela'].value  =producto.suela;
                tareaForm['talla'].value  =producto.talla;
                tareaForm['precio'].value  =producto.precio;
                tareaForm['almacen'].value  =producto.almacen;

                editStatus=true;
                tareaForm['boton-task-save'].innerHTML='Actualizar'
                })
        });
             
    } else{tareasContainer.innerHTML='<p>Para acceder a inventario necesitas estar autorizado</p>'}
})
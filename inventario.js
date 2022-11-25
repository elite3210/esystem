import {guardarProduct,onGetProduct,deleteProduct} from './firebase.js'

//para guaradr los registo en firebase
const tareaForm = document.getElementById('tarea-form')
const barCode = document.getElementById('codigo') 
let editStatus=false;
let id ='';

barCode.addEventListener('keypress',(e)=>{

    if(e.key==='Enter'){
        e.preventDefault()
        console.log('presionaste la tecla Enter, y te encuentras dentro del buble if')
        let codigoBarras=barCode.value
        console.log('el texto que escribiste es: ',codigoBarras)
        barCode.select()
  
        const categoria         = tareaForm['categoria'];
        const codigo            = tareaForm['codigo'];//entecampo reacciona al teclado
        const modelo            = tareaForm['modelo'];
        const color             = tareaForm['color'];
        const suela             = tareaForm['suela'];
        const talla             = tareaForm['talla'];
        const precio            = tareaForm['precio'];
        const almacen           = tareaForm['almacen'];
        const descripcion       = tareaForm['descripcion'];
        let active              = true;


  if(!editStatus){
    guardarProduct(categoria.value,codigo.value,modelo.value,color.value,suela.value,talla.value,precio.value,almacen.value,descripcion.value,active)
    }else{
       console.log('No se puede editar desde este modulo')
    }

  //tareaForm.reset()
}})


//traer los productos de firebase
const tareasContainer = document.getElementById('tareas-container')


const registroProductos = onGetProduct((querySnapshot) =>{
    
    if(querySnapshot){
        console.log('estoy dentro del if de registrotrabajadores')
        let html = "";
        let contador =0;
        let acumulador=0
        let counter= document.querySelector('.contador')
        let sumaPrecios= document.querySelector('.acumulador')
        console.log(counter)
        
   
        querySnapshot.forEach(doc =>{
            
            const fila = doc.data()
            html += `<tr>
                        <td>${fila.codigo}</td>
                        <td>${fila.modelo}</td>
                        <td>${fila.color}</td>
                        <td>${fila.suela}</td>
                        <td>${fila.talla}</td>
                        <td>${fila.precio}</td>
                        
                        <td>${fila.almacen}</td>
                        <td><button class ='btn-delete' data-id=${doc.id}>del</button></td>
                    </tr>`
            
            contador += 1
            acumulador += parseInt(fila.precio)
            //horas += ((new Date(`${fila.salida}`).getTime())-(new Date(`${fila.title}`).getTime()))/(1000*60*60)
            
        });

        tareasContainer.innerHTML =html;
        counter.innerHTML = contador;
        sumaPrecios.innerHTML = acumulador;

        const btnDelete = tareasContainer.querySelectorAll('.btn-delete')
            btnDelete.forEach(btn=>{
                btn.addEventListener('click',(e)=>{deleteProduct(e.target.dataset.id)})
            })
             
    } else{tareasContainer.innerHTML='<p>Para acceder a inventario necesitas estar autorizado</p>'}
})
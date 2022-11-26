// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {getFirestore,collection,addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc ,query,where,orderBy,limit} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA7pX4H3NmMVUBJC2tYASX1uWcDRAJ7PmE",
  authDomain: "esystem-90a8a.firebaseapp.com",
  projectId: "esystem-90a8a",
  storageBucket: "esystem-90a8a.appspot.com",
  messagingSenderId: "802455913459",
  appId: "1:802455913459:web:062d5288b217a297bbc886"
};

// Initialize Firebase
export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore();


export const guardarProduct = (categoria,codigo,modelo,color,suela,talla,precio,almacen,descripcion,active)=>{addDoc(collection(db,'Productos'),{categoria,codigo,modelo,color,suela,talla,precio,almacen,descripcion,active})}

/*funcion de firestore que trae los datos de la carpeta coleccion */
// export const traerTasks = () => getDocs(collection(db,'Micoleccion'));

/*creando la suscripcion que se deseara escuchar cuando los datos cambian
 crea un efecto inmediato sobre la tabla, como si se introduciera dorecto a la tabla cuando se guarda*/

export const onGetProduct = (callback)=> onSnapshot(collection(db,'Productos'),callback)

/*metodo de firesote para eliminar un registro de db */

export const deleteProduct = (id)=>{deleteDoc(doc(db,'Productos',id))}

/*metodo getDoc 'en singular' para traer un documento de firestore */

export const traeroneProduct = (id)=>getDoc(doc(db,'Productos',id))

//actualiza una documento
export const updateProduct = (id,newFields)=>updateDoc(doc(db,'Productos',id),newFields)

export const traerConsulta = (barCode)=>getDocs(query(collection(db,'Productos'), where("codigo", "==", barCode)));


// Create a reference to the cities collection
//import { collection, query, where } from "firebase/firestore";

/*

export const traerConsulta3 = async (barCode)=>{

let tbody=document.getElementById('container')
var id = e.target.dataset.id
let editStatus=false


const querySnapshot = await getDocs(query(collection(db,'Productos'), where("codigo", "==", barCode)));
let index           =0
let html            =''


console.log('querySnapshot',querySnapshot)

querySnapshot.forEach((doc) => {
  let fila = doc.data();
  html  +=`<tr><td>${fila.codigo}</td><td>${fila.modelo}</td><td>${fila.color}</td><td>${fila.suela}</td><td>${fila.talla}</td><td>${fila.precio}</td><td>${fila.almacen}</td><td><button class ='btn-edit' data-id='${doc.id}'>Editar</button></td><td><button class ='btn-delete' data-id='${doc.id}'>Eliminar</button></tr>`

  index +=1; 
})
tbody.innerHTML=html

const btnDelete = tbody.querySelectorAll('.btn-delete')
            btnDelete.forEach(btn=>{
                btn.addEventListener('click',(e)=>{deleteProduct(e.target.dataset.id)})
            })

const btnEdit = tbody.querySelectorAll('.btn-edit')
        
btnEdit.forEach((btn)=>{
    btn.addEventListener('click', async (e)=>{
    
        console.log('id del boton edit:',e.target.dataset.id);

        const doc = await traeroneProduct(e.target.dataset.id);
        const producto = doc.data()
                console.log(producto)
                tareaForm['categoria'].value=producto.categoria ;
                tareaForm['codigo'].value=producto.codigo;
                tareaForm['modelo'].value=producto.modelo;
                tareaForm['color'].value=producto.color;
                tareaForm['suela'].value=producto.suela;
                tareaForm['talla'].value=producto.talla;
                tareaForm['precio'].value=producto.precio;
                tareaForm['almacen'].value=producto.almacen;
                tareaForm['descripcion'].value=producto.descripcion

                editStatus=true;
                tareaForm['btn-buscar'].innerHTML='Actualizar'


        })
});

}

const tareaForm=document.getElementById('tarea-form')

tareaForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const categoria         = tareaForm['categoria'];
    const codigo            = tareaForm['codigo'];
    const modelo            = tareaForm['modelo'];
    const color             = tareaForm['color'];
    const suela             = tareaForm['suela'];
    const talla             = tareaForm['talla'];
    const precio            = tareaForm['precio'];
    const almacen           = tareaForm['almacen'];
    const descripcion       = tareaForm['descripcion'];
    let active              = true;
   

    updateProduct(id,{categoria:categoria.value,modelo:modelo.value,color:color.value,suela:suela.value,talla:talla.value,precio:precio.value,almacen:almacen.value,descripcion:descripcion.value})
    editStatus=false

    

    tareaForm.reset()
})


*/




export const traerConsulta2 = async (barCode)=>{


  const objetos       =[]
  const querySnapshot = await getDocs(query(collection(db,'Productos'), where("codigo", "==", barCode)));
  let index           =0
  
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    objetos.push(doc.data());
    objetos[index].id=doc.id
  
   
    index +=1; 
  })
  console.log(objetos)
  
  new gridjs.Grid({ 
  
    data:objetos
    
  }).render(document.getElementById('table'));
  }

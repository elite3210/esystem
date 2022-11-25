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
export const onGetTasks = (callback)=> onSnapshot(collection(db,'Micoleccion'),callback)
export const onGetProduct = (callback)=> onSnapshot(collection(db,'Productos'),callback)

/*metodo de firesote para eliminar un registro de db */

export const deleteProduct = (id)=>{deleteDoc(doc(db,'Productos',id))}

/*metodo getDoc 'en singular' para traer un documento de firestore */

export const traeroneProduct = (id)=>getDoc(doc(db,'Productos',id))

//actualiza una documento
export const updateProduct = (id,newFields)=>updateDoc(doc(db,'Productos',id),newFields)


// Create a reference to the cities collection
//import { collection, query, where } from "firebase/firestore";



export const traerConsulta = async (barCode)=>{


const objetos       =[]
const querySnapshot = await getDocs(query(collection(db,'Productos'), where("codigo", "==", barCode)));
let index           =0

console.log(querySnapshot)
querySnapshot.forEach((doc) => {
  objetos.push(doc.data());

 
  index +=1; 
})
console.log(objetos)

new gridjs.Grid({ 

  data:objetos
  
}).render(document.getElementById('table'));
}


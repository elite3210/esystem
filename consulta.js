import {traerConsulta} from './firebase.js'

const barCode = document.getElementById('codigo') 
const btnconsultar = document.getElementById('btn-consultar') 
let editStatus=false;
let id ='';

btnconsultar.addEventListener('click',(e)=>{

        e.preventDefault()
        console.log(barCode)
        let codigo=barCode.value
        traerConsulta(codigo)

    })
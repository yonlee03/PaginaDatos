import {Router}from 'express'
import { vistaHome, home1, vistaRegistro, vistaCrud, vistaLogin, postMethod, postPrisma, getPrisma } from '../controllers/indexRouter.js';
import {pool} from '../db.js'
import bcryptjs from 'bcryptjs'

const router= Router();

//Rutas de las paginas
router.get('/', vistaHome )
router.get('/Home', home1)
router.get('/registro', vistaRegistro)
router.get('/login',vistaLogin)
router.get('/crud', vistaCrud  )
router.post('/', postMethod)
router.get('/prism', postPrisma)
router.get('/getPrism',getPrisma)

router.post('/auth', async (req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;

    if(user && pass){
        try{
            const[result] = await pool.query("Select * From Users where nombre = ?", [user]);
            if(result.length==0 || !(await bcryptjs.compare(pass,result[0].pass))){
                res.send("Usuario o Pass incorrecta")
            }
        }catch{

        }
    }else{
       
        res.send("PERFECTO")
    }
})

router.post("/registro", async (req,res)=>{
    const user = req.body.user;
    const nombre = req.body.nombre;
    const email= req.body.email;
    const pass = req.body.pass;
    const apellido = req.body.apellido;

    let passwordHash = await bcryptjs.hash(pass,8)

    pool.query('Insert into Users SET ?', {nombre: nombre, apellidos: apellido, email:email, nombreUsuario:user, pass: passwordHash})
    if(error){
        console.error("FALLA")
    }else{
        console.log("ENTRA")
    }
})

export default router;
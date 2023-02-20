//Requerir los módulos
import express from 'express';
import ejs from "ejs";
import bodyParser from 'body-parser';
import indexRoutes from'./routes/route.js'
import session from 'express-session'
import dotenv from 'dotenv';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

//Inicializar módulos
const app = express();
const __dirname= dirname(fileURLToPath(import.meta.url));
dotenv.config({path: join(__dirname, './env/.env')})
//Configuraciones

    //Crear servidor para
    const port = process.env.port || 4000;
    app.listen(port);
    console.log('El servidor furula en el puerto '+port);
    
    //Configurar el motor de plantilla
    app.set('views',join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //configuro Routes
    app.use(indexRoutes);

    //configurar urlencoded
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:false}))
     app.use(session({
        secret:'12345',
        resolve:true,
        saveUninitialized: true
     }))

    //configurar css
    app.use(express.static(join(__dirname, 'public')))

    //SESSION
    app.get('/users', (req,res) =>{
        req.session.usuario="Paco";
        req.session.rol = "administrador";
        req.session.visitas= req.session.visitas ? ++req.session.visitas : 1,
        res.send(`El usuario ${req.session.usuario} vaya makina ${req.session.visitas}`)
    })

    //Descargar app
    app.get('/descargar/:id',function(req,res){
        res.download(__dirname+'/public/files/'+req.params.id,
            req.params.id,function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('DESCARGADO')
                }
        })
    })

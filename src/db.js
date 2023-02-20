import {createPool} from 'mysql2/promise'
import dotenv from 'dotenv';
dotenv.config()

export const pool = createPool({
    
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: process.env.DB_DATABASE
})

async function connectToDb(){
    try{
        const conection = await pool.getConnection();
        console.log('conexion realizada')
    }catch(error){
        console.log('El error es'+error)
    }
}

connectToDb();

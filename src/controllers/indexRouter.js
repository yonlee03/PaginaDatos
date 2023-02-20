import {pool} from '../db.js'
import express from 'express';
import { PrismaClient } from '@prisma/client'
import session from 'express-session'

const prisma = new PrismaClient()

export const vistaHome = (req,res) => res.render('index.ejs', {title: 'Home'}) 

export const home1 = (req,res) => res.render('index.ejs', {title: 'Home'})

export const vistaRegistro = (req,res) => res.render('registro.ejs', {title: 'Registro'}) 

export const vistaLogin = (req,res) => res.render('login.ejs', {title: 'Login'})

export const vistaCrud = (req,res) => res.render('crud.ejs', {title: 'Crud'})

export const postMethod = async (req, res) => {
    const [result] = await pool.query('select 1+1 as result')
    res.json(result[0])
}



export const postPrisma = async (req, res) => {
   
    await prisma.Users.create({
        data:{
             id:3,
             nombre: "paquito",
             apellidos: "si",
             email: "pakito@gmail.com",
             nombreUsuario: "pakitochoco",
             pass: 12345
        }
    }) 

}

export const getPrisma = async(req,res)=> {
    console.log(await prisma.Users.findMany());
}
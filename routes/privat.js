import express from "express"
import { PrismaClient } from "@prisma/client"
import router from "./public"

const router = express.Route()
const prisma = new PrismaClient()

router.get('/listar-usuario', async (Req, res) => {
    try{
        const user = await prisma.user.findMany({omit: {password: true}})

        res.status(200).json()
    }catch(err){
        res.status(500).json({message: 'falha no servidor'})
    }
})
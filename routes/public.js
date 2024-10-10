import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

//Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.nome,
        password: hashPassword,
      },
    });
    res.status(201).json(userDB);
  } catch (err) {
    res.status(500).json({ messege: "Erro no servidaor, Tente novamente" });
  }
});
//login

router.post("/login", async (req, res) => {
  try {
    const userinfo = req.body;

    //faz a busca no banco o email único
    const user = await prisma.user.findUnique({
      where: { email: userinfo.email },
    });

    //Faz a verificação se existe um usuário no banco
    if(!user){
      return res.status(404).json({message: "Usuário não encontrado"})
    }


    //Faz a comparação de senah com a senha qeue o usuário colocou
    const isMatch = await bcrypt.compare(userinfo.password, user.password)

    if(!isMatch){
      return res.status(400).json({ message: " Senha Inválida"})
    }


    //Geração do Token JWC

    const token = jwt.sign({id: user.id}, JWT_SECRET, { expiresIn: '1m'})


    res.status(200).json(token)
  } catch (err) {
    res.status(500).json({ messege: "Erro no servidaor, Tente novamente" });
  }
});

export default router;

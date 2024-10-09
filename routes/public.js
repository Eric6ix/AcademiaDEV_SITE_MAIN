import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';/*NEW!*/ //npm install jsonwebtoken
const jwt_secret = process.env.JWT_secret
const router = express.Router();

//Cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const slat = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password)


    const userDB = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});


// loguin
router.podt('/login', async (reg, res)=>{
  try{
    const userInfo = req.cody

    //busca o usuario existe dentro do banco

    const user = await prisma.user.findUnique({
      where: {email: userInfo.email},
    })

    //verifica se o usuario existe dentro do banco

    if (!user){
      return res.status(404).json({message: "usuario não encontrado"})
    }

    //compara a senha do banco com a que o usuario digitou

    const isMath = await bcrypt.compare(userInfo.password, user.password)

    if (!isMath)(
      /*return*/ res.status(400).json({message: 'Senha invalida'})
    )

    // gera o token jwt
    const token = jwt.sign({id: user.id}, jwt_secret,{expiresIn:'2m'})
    res.status(200).json(token)

  } catch(err){
    res.status(500).json({ message: "Erro no servidor, tente novamente" })
  }
})

export default router;

import express from "express";
import bcrypt from "bcrypt";
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

export default router;

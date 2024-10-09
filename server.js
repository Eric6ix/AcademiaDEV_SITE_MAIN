import express from 'express'
import publicRoutes from './routes/public.js'
import privatRoutes from './routes/privat.js'
import auth from './middlewares/auth.js'


const app = express()
app.use(express.json)

app.use('/', publicRoutes)
app.use('/', auth, privatRoutes)

app.listen(3000, () => console.log("Tá rodando"))
import jwt from 'jsonwebtoken'

const jwt_secret = process.env.JWT_secret

const auth = (req, res, next) => {
    
    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({message: 'Acesso Negado'})
    }

    try {

        const decoded = jwt.verify(token.replace('Bearer ',''), jwt_secret)
        req.userId = decoded.id
        
    } catch(err){
        
        return res.status().json({message: 'token invalido'})
    }
    next()
    
}

export default auth
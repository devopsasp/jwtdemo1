import jwt from 'jsonwebtoken'
import 'dotenv/config'
export const authenticate=(req,res,next)=>{
    const authheader=req.headers.authorization
    if(authheader){
        const token=authheader.split(' ')[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return res.sendStatus(403)
            }
            req.user=user
            next()
        })



    }
    else{
        res.sendStatus(401)
    }
}
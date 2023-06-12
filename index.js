import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { users } from './users.js'
import { books } from './books.js'
import { authenticate } from './authentcate.js'
const app=express()
app.use(express.json())
app.use(cookieParser())
app.get("/login",(req,res)=>{

    const { username, password } = req.body;
    const user = users.find(u => { return u.username === username && u.password === password });
    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.SECRET_KEY);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
     
})
app.get("/books",authenticate,(req,res)=>{
    res.json(books)
})
app.listen(4000,()=>{
    console.log("app listening")
})
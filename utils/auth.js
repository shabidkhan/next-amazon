import jwt from "jsonwebtoken";

const signToken = user =>{
    return jwt.sign({_id:user._id,nmae:user.nmae,email:user.email,isAdmin:user.isAdmin},
        process.env.JWT_SECRET_KEY || "123",
        {
            expiresIn:"28d",
        }
            )
}

const isAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if (authorization){
        // Bearer xxx = xxx
        const token = authorization.slice(7,authorization.length);
        jwt.verify(token,process.env.JWT_SECRET_KEY || "123",(err, data) => {
            if (err) {
                res.status(401).send({message: "Token is nor valid"})
            }else{
                req.user=data;
                next();
            }
        })
    }else{
        res.status(401).send({message: "Token is not supplied"})
    }
}

export {signToken, isAuth}
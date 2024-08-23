const prisma = require('../config/prisma')
const bycrypt = require('bcrypt')
const jsonwebtoken= require('jsonwebtoken')
const login = async (req, res) => {
    
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: { email: email },
    })

    console.log(user)
    if(!user){
        return res.status(401).json({message : "email atau password salah"})
    }

    const isPasswordMatch=bycrypt.compareSync(password,user.password)

    if(!isPasswordMatch){
        return res.status(401).json({message : "email atau password salah"})
    }
    payload_token={
        user:user.id,
        email:user.email
    }

    token=jsonwebtoken.sign(payload_token,process.env.JWT_SECRET,{


        expiresIn:'1h'
    })

    res.json(
        {token:token}
    )


}

const authenticate= async(req,res)=>{
    const token = req.header('Authorization');
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
        // console.log(token)
		const TOKEN_VALUE = token.split(' ')[1];
       
        if (TOKEN_VALUE == null) return res.sendStatus(401);

        jsonwebtoken.verify(TOKEN_VALUE,process.env.JWT_SECRET, (err, user) => {
          if (err) return res.sendStatus(403);
          res.json(user)
        });
	} catch (err) {
        console.log(err)
		res.status(401).json({ msg: 'Token is not valid' });
	}


}

module.exports = { login,authenticate }
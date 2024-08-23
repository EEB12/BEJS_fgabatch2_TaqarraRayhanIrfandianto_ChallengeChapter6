const jwt= require('jsonwebtoken')
const prisma = require('../config/prisma')
const bycrypt = require ('bcrypt')
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            identity_type: true,
            identity_number: true,
           
          }
        },
        bank_account: true
      }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            identity_type: true,
            identity_number: true
            
          }
        },
        bank_account: true
      }
    })
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserInfo = async (req, res) => {
  const token = req.header('Authorization')

 
  try {
   
    const TOKEN_VALUE = token.split(' ')[1];
    
		const decoded = jwt.verify(TOKEN_VALUE,process.env.JWT_SECRET);
   
    console.log("ini id")
   
    const user = await prisma.user.findUnique({
      where: { id: parseInt(decoded.user) },
      select: {
        id: true,
        name: true,
        email: true,
        profile: {
          select: {
            identity_type: true,
            identity_number: true
            
          }
        },
        bank_account: true
      }
    })
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name:req.body.name,
        email:req.body.email,
        password:bycrypt.hashSync(req.body.password,10),
        profile: {
          create: {
            identity_type:req.body.identity_type,
            identity_number:req.body.identity_number,
           
          }
        }
      },
      include: {
        profile: true
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getUsers, getUserById, createUser, getUserInfo }
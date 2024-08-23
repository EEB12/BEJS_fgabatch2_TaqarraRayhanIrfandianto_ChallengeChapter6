const prisma = require('../config/prisma')

const getTransaction = async (req, res) => {
    try {
        const users = await prisma.transaction.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const getTransactionById = async (req, res) => {
    const { id } = req.params
    try {
        const Account = await prisma.transaction.findUnique({
            where: { id: parseInt(id) },

        })
        if (!Account) {
            return res.status(404).json({ error: 'Transaction not found' })
        }
        res.status(200).json(Account)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const createTransaction = async (req, res) => {
    console.log(req.body)
    const { amount, type, source_account_id, destination_account_id } = req.body
    try {
        const transaction = await prisma.transaction.create({
            data: {
                amount,
                type,

                source_account: source_account_id ? { connect: { id: source_account_id } } : undefined,
                destination_account: destination_account_id ? { connect: { id: destination_account_id } } : undefined,
            },
            
            include: {
                source_account: true,
                destination_account: true,
            },
        })


        if (type === 'DEPOSIT' && destination_account_id) {
            console.log(amount)
            await prisma.bank_account.update({
                where: { id: destination_account_id },
                data: { balance: { increment: amount } },
            })
        } else if (type === 'WITHDRAWAL' && source_account_id) {
            await prisma.bank_account.update({
                where: { id: source_account_id },
                data: { balance: { decrement: amount } },
            })
        } else if (type === 'TRANSFER' && source_account_id && destination_account_id) {
            await prisma.bank_account.update({
                where: { id: source_account_id },
                data: { balance: { decrement: amount } },
            })
            await prisma.bank_account.update({
                where: { id: destination_account_id },
                data: { balance: { increment: amount } },
            })
        }

        res.status(201).json(
            {status:'success',
             data:transaction
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getTransaction, getTransactionById, createTransaction }
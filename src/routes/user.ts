import express from 'express'
import { models } from '../db/models'

const router = express.Router()

router.post('/', async (req,res,next)=>{
    try{
        const {User} = models
        const data = await User.create({email:'fero@fero.fer', password_hash: 'asodjaoijdioqncijuqn'})
        return res.json({user:{id:data.id}})
    }catch (err){
        return next(err)
    }

})

router.get('/:userId', async(req,res, next)=> {
    try{
        const {userId} = req.params
        const {User, List} = models
        const data = await User.findByPk(userId,
            {
                include:[{
                    model:List,
                    attributes:['id', 'name'],
                    through:{
                        attributes:['createdAt']
                    }}]
            })
        return res.json({user:{data}})
    }catch(err){
        return next(err)
    }
})

export default router
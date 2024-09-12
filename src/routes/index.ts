import express from 'express'
/* import * as omama from '../controllers/omama.js';
import { validateReqProtected } from '../tools/validation.js';
import { forwardError } from '../tools/apierror.js'; */

const router = express.Router()

router.get('/',(req,res,next)=>{
    try{

        return res.json({obj:1})
    }catch (err){
        return next(err)
    }

})

export default router
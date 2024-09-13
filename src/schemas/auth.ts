import { body } from 'express-validator'

const loginSchema = [body('email').isEmail(), body('password').isString().isLength({ min: 6, max: 255 })]

export { loginSchema }

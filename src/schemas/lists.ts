import { body, param, cookie } from 'express-validator'

const createListSchema = [body('name').isString().isLength({ min: 3, max: 255 }), cookie('accessToken').isString(), cookie('refreshToken').isString()]

const getListSchema = [param('listId').isInt({ min: 1 })]

const shareListSchema = [param('listId').isInt({ min: 1 }), body('userId').isInt({ min: 1 }), cookie('accessToken').isString(), cookie('refreshToken').isString()]

export { createListSchema, getListSchema, shareListSchema }

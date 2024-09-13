import { body, param, cookie } from 'express-validator'
import { ItemFlag } from '../utils/enums'

const createItemSchema = [
	body('title').isString().isLength({ min: 3, max: 255 }),
	body('text').isString().isLength({ min: 3, max: 1000 }),
	body('deadline').isISO8601(),
	body('listId').isInt({ min: 1 }),
	cookie('accessToken').isString(),
	cookie('refreshToken').isString()
]

const updateFlagSchema = [param('itemId').isInt({ min: 1 }), body('flag').isIn(Object.values(ItemFlag)), cookie('accessToken').isString(), cookie('refreshToken').isString()]

export { createItemSchema, updateFlagSchema }

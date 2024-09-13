import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

const validateRequestSchema = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: errors.array() })
	}
	next()
}

export default validateRequestSchema

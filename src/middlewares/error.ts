import { Request, Response } from 'express'

export default (err: Error, req: Request, res: Response) => {
	console.error('Error handler: ', err)

	return res.status(500).json(err)
}

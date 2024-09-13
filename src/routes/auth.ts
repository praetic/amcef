import bcrypt from 'bcrypt'
import express from 'express'
import { models } from '../db/models'
import generateTokens from '../utils/generateTokens'
import validateRequestSchemaMiddleware from '../middlewares/validateRequestSchema'
import { loginSchema } from '../schemas/auth'

const router = express.Router()

router.post('/login', ...loginSchema, validateRequestSchemaMiddleware, async (req, res, next) => {
	try {
		const { email, password } = req.body
		const { User } = models
		const data = await User.findOne({ where: { email }, attributes: ['id', 'passwordHash'] })
		if (data === null) {
			return res.status(403).json()
		}
		const isMatch = await bcrypt.compare(password, data.passwordHash)
		if (!isMatch) return res.status(403).json()
		const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({
			id: data.id
		})
		res.cookie('accessToken', newAccessToken, {
			httpOnly: true,
			maxAge: 15 * 60 * 1000
		})

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		return res.status(200).json()
	} catch (err) {
		return next(err)
	}
})

router.post('/register', ...loginSchema, validateRequestSchemaMiddleware, async (req, res, next) => {
	try {
		const { email, password } = req.body
		const { User } = models
		const data = await User.findOne({ where: { email }, attributes: ['passwordHash'] })
		if (data === null) {
			const passwordHash = await bcrypt.hash(password, 13)
			await User.create({ email, passwordHash })
			const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({
				email
			})
			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,
				maxAge: 15 * 60 * 1000
			})

			res.cookie('refreshToken', newRefreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000
			})
			return res.status(201).json()
		}

		return res.status(400).json({ message: 'User already exists!' })
	} catch (err) {
		return next(err)
	}
})

export default router

import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import config from 'config'
import generateTokens from '../utils/generateTokens'

export default (req: Request, res: Response, _next: NextFunction) => {
	const { accessToken, refreshToken } = req.cookies

	const accessTokenSecret = config.get('jwt').accessTokenSecret
	jwt.verify(accessToken, accessTokenSecret, (err: JsonWebTokenError) => {
		if (err) {
			if (!refreshToken) {
				return res.status(401).json({ message: 'Invalid access token and no refresh token provided' })
			}
			const refreshTokenSecret = config.get('jwt').refreshTokenSecret
			jwt.verify(refreshToken, refreshTokenSecret, (err: JsonWebTokenError, decoded: jwt.JwtPayload) => {
				if (err) {
					return res.status(401).json({ message: 'Invalid refresh token' })
				}

				const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({
					id: decoded.id
				})
				res.cookie('accessToken', newAccessToken, {
					httpOnly: true,
					maxAge: 15 * 60 * 1000
				})

				res.cookie('refreshToken', newRefreshToken, {
					httpOnly: true,
					maxAge: 7 * 24 * 60 * 60 * 1000
				})
				return _next()
			})
		} else {
			res.cookie('accessToken', accessToken, { httpOnly: true })
			return _next()
		}
	})
}

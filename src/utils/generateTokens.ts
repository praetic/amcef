import jwt from 'jsonwebtoken'
import config from 'config'

type JWTTokens = {
	accessToken: string
	refreshToken: string
}

export default (payload: jwt.JwtPayload): JWTTokens => {
	// token valid for 15 minutes
	const accessTokenSecret = config.get('jwt').accessTokenSecret
	const accessToken = jwt.sign(payload, accessTokenSecret, {
		expiresIn: '15m'
	})
	const refreshTokenSecret = config.get('jwt').refreshTokenSecret
	//token valid for 7 days
	const refreshToken = jwt.sign(payload, refreshTokenSecret, {
		expiresIn: '7d'
	})
	return {
		accessToken,
		refreshToken
	}
}

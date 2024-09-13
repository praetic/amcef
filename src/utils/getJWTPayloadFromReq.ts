import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const getJWTPayloadFromReq = (req: Request): JwtPayload => {
	const { accessToken } = req.cookies
	let token
	if (accessToken) {
		token = accessToken
	} else {
		token = req.cookies.refreshToken
	}

	const decoded = jwt.decode(token) as JwtPayload
	return decoded
}

export default getJWTPayloadFromReq

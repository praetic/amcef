import { IConfig } from '../src/types/config'

export default {
	server: {
		port: 5000
	},
	database: {
		url: process.env.POSTGRES_URL,
		options: {
			logging: process.env.NODE_ENV === 'development',
			dialect: 'postgres'
		}
	},
	jwt: {
		accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
		refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET
	}
} satisfies IConfig

import { Options } from 'sequelize'
export interface IConfig {
	server: {
		port: number
	}
	database: {
		url: string
		options: Options
	}
	jwt: {
		accessTokenSecret: string
		refreshTokenSecret: string
	}
}

import { IConfig as IConfigMap } from '../config'

declare module 'config' {
	interface IConfig {
		get<T extends keyof IConfigMap>(setting: T): IConfigMap[T]
	}
}
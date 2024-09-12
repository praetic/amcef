export interface IConfig {
    server:{
        port:number
    },
    database: {
        url:string
    },
    jwt:{
        accessTokenSecret:string
        refreshTokenSecret:string
    }
}
import { Sequelize } from "sequelize"
import config from 'config'

import defineUser from './user'
import defineList from './list'
import defineUserList from './userList'

const DATABASE_CONFIG = config.get("database")

const sequelize = new Sequelize(DATABASE_CONFIG.url, {
    dialect:"postgres"
})

const models={
    User:defineUser(sequelize),
    List: defineList(sequelize),
    UserList: defineUserList(sequelize)
}

models.User.belongsToMany(models.List,{
    foreignKey: 'user_id',
    through:{
        model:models.UserList,
        unique:true
    }
})
models.List.belongsToMany(models.User,{
    foreignKey: 'list_id',
    through:{
        model:models.UserList,
        unique:true
    }
})
//users.hasMany(activities,{foreignKey: 'userId'})


sequelize.authenticate().then(()=>{
    console.log('postgres connection was established')
}).catch((error)=>{
    console.error(`unable to connect ${error}`)
})

sequelize.sync().then(()=>{
    console.info(`DB sync successful.`)
}).catch((error)=>{
    console.error(`DB sync failed with error: ${error}`)
})
export {models} 
export default sequelize
import { Sequelize } from 'sequelize'
import config from 'config'

import defineUser from './user'
import defineList from './list'
import defineUserList from './userList'
import defineItem from './item'

const DATABASE_CONFIG = config.get('database')

const sequelize = new Sequelize(DATABASE_CONFIG.url, { ...DATABASE_CONFIG.options })

const models = {
	User: defineUser(sequelize),
	List: defineList(sequelize),
	UserList: defineUserList(sequelize),
	Item: defineItem(sequelize)
}

models.User.belongsToMany(models.List, {
	foreignKey: 'user_id',
	through: {
		model: models.UserList,
		unique: true
	},
	otherKey: 'list_id'
})

models.List.belongsToMany(models.User, {
	foreignKey: 'list_id',
	through: {
		model: models.UserList,
		unique: true
	},
	otherKey: 'user_id'
})

models.List.hasMany(models.Item, {
	foreignKey: 'list_id'
})

models.Item.belongsTo(models.List, {
	foreignKey: 'list_id'
})

sequelize
	.authenticate()
	.then(() => {
		console.log('postgres connection was established')
	})
	.catch((error) => {
		console.error(`unable to connect ${error}`)
	})

sequelize
	.sync()
	.then(() => {
		console.info(`DB sync successful.`)
	})
	.catch((error) => {
		console.error(`DB sync failed with error: ${error}`)
	})
export { models }
export default sequelize

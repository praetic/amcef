import { Sequelize, DataTypes, Model } from 'sequelize'

export class UserList extends Model {
	userId: number
	listId: number
	createdAt: Date
	updatedAt: Date
}

export default (sequelize: Sequelize) => {
	UserList.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				},
				field: 'user_id'
			},
			listId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'lists',
					key: 'id'
				},
				field: 'list_id'
			}
		},
		{
			sequelize,
			timestamps: true,
			underscored: true,
			modelName: 'userList',
			tableName: 'user_lists'
		}
	)
	return UserList
}

import { Sequelize, DataTypes, Model } from 'sequelize'
import { User } from './user'
import { Item } from './item'

export class List extends Model {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date
	users: User[]
	items: Item[]
}

export default (sequelize: Sequelize) => {
	List.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			timestamps: true,
			underscored: true,
			modelName: 'list',
			tableName: 'lists'
		}
	)
	return List
}

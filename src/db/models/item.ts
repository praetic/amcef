import { Sequelize, DataTypes, Model } from 'sequelize'
import { ItemFlag } from '../../utils/enums'

export class Item extends Model {
	id: number
	listId: number
	title: string
	text: string
	deadline: Date
	flag: ItemFlag
	createdBy: number
	createdAt: Date
	updatedAt: Date
}

export default (sequelize: Sequelize) => {
	Item.init(
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			listId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			deadline: {
				type: DataTypes.DATE,
				allowNull: false
			},
			flag: {
				type: DataTypes.ENUM(...Object.values(ItemFlag))
			},
			createdBy: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			sequelize,
			timestamps: true,
			underscored: true,
			modelName: 'item',
			tableName: 'items'
		}
	)
	return Item
}

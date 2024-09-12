import { Sequelize, DataTypes, Model } from 'sequelize'

export class UserList extends Model {
    userId:number
    listId:number
    createdAt:Date
    updatedAt:Date
}

export default (sequelize:Sequelize)=>{
    UserList.init(
      {
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
        },
      },
      {

        sequelize,
        timestamps: true,
        underscored:true,
        modelName: 'userList',
        tableName: 'user_lists'
      },
    );
    return UserList
}
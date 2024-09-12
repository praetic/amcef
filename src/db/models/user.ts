import { Sequelize, DataTypes, Model } from 'sequelize'
import {List} from './list'

export class User extends Model {
    id:number
    email:string
    passwordHash:string
    createdAt:Date
    updatedAt:Date
    lists:List[]
}


export default (sequelize:Sequelize)=>{
    User.init(
      {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passwordHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {

        sequelize,
        timestamps: true,
        underscored:true,
        modelName: 'user',
        tableName: 'users'
      },
    );
    return User
}
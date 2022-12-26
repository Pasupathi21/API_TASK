import { sequelize } from '../db'
import { DataTypes } from 'sequelize'

export const UserModel = sequelize.define('User', {
    userId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    }
})

UserModel.sync({ force: false }).then((exe) => {}).catch(e => console.log('SYNC', e))
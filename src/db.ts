import {Sequelize, Op} from 'sequelize'

 export const sequelize =  new Sequelize(
    'task',
    'root',
    '',
    {
        dialect: 'mysql',
        logging: false,
        operatorsAliases: {
            $eq: Op.eq,
        }
    }
     )
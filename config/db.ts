import { Sequelize } from "sequelize";

export const sequelize:Sequelize = new Sequelize('usermanagement', 'postgres', '102030', {
  host: 'localhost',
  dialect: 'postgres' 
})
 export const connection = async() => {
  try {
    await sequelize.authenticate();
    console.log('postgres connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

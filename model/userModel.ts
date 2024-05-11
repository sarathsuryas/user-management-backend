
import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";

export  const User = sequelize.define('User',{
  userId:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING
  },
  password:{
    type:DataTypes.STRING
  }
})
User.sync().then(() => {
  console.log("User Model synced");
});



       
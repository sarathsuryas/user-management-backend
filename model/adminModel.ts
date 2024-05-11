import { sequelize } from "../config/db";
import { DataTypes,Model } from "sequelize";

export class Admin extends Model {
  otherPublicField:any;
}

 Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
       unique: true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },
  { sequelize },
)

Admin.sync().then(()=>{
  console.log("Admin model synced")
})
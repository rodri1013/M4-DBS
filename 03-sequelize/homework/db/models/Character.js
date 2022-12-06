const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
  code: {
    type: DataTypes.STRING(5),
    primaryKey: true,
    validate: {
      validateCode(value){
        if(value.toLowerCase() ==='henry'){
          throw new Error("Codigo Incorrecto")
        }
      }
    }
    //No haace falta agregar allowNull: false, pues es una PK
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notIn: ["Henry", "SoyHenry", "Soy Henry"],//No incluya los valores en el []
    }
  },
  age: {
    type: DataTypes.INTEGER,
    get(){
      let value = this.getDataValue('age');
      if(!value) return null;
      return value + 'years old';
    }
  },
  race: {
    type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
    defaultValue: 'Other',
  },
  hp: {
    type: DataTypes.FLOAT,//Número decimal.
    allowNull: false,
  },
  mana: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_added: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
 }, 
 {
  timestamps: false,
 }
 );
};




/*
code*: string (Máximo 5 caracteres) [PK]
name*: string (Debe ser único)
age: integer
race: enum (Posibles valores: 'Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other')
hp*: float
mana*: float
date_added: timestamp without time


*/
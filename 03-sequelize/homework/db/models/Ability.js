const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'composite_unique',
    },
    description: {
      type: DataTypes.TEXT,
      //allowNull: true,
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: 'composite_unique',
      validate: {
        min: 10.0,
        max: 250.0
      }
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${Math.trunc(this.mana_cost)} points of mana)} - Description: ${this.description}`;
      }
    }
  })
};




/*
name*: string
description: text
mana_cost*: float
La combinación "name" + "mana_cost" debe ser única.--> 'composite_unique'
Así es una combinación única.
Se puede repetir el name o en su defecto la mana_cost
*/
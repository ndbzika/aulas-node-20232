const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

async function conectar(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

conectar();

const Usuario = sequelize.define('Usuario',{
  email:{
    type: DataTypes.STRING,
    primaryKey: true
  },
  nome:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
},{}
);
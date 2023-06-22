const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','Bhush@111',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;
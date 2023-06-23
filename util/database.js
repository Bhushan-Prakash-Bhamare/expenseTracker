const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense','root','Bhush@111',{
    dialect:'mysql',
    host:'localhost' 
});

module.exports=sequelize;
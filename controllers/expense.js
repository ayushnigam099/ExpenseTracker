const Sequelize = require('sequelize');
const sequelize= require('../connection/database');

const Expense = sequelize.define('Expense', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
      primaryKey: true,
      
    },
    amount: Sequelize.FLOAT,
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });


exports.addExpense =  async(req,res,next)=>
{
//    console.log(req.body.Name);
try{
const amount = req.body.Amount;
const description = req.body.Description;
const category = req.body.Category;

const {dataValues}= await Expense.create({
   amount: amount,
   description: description,
   category: category
})
    console.log("data",dataValues) ;
    res.status(200).json({Success: dataValues});   
    }
catch(err)
{
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
}
};

exports.getExpense = async(req,res,next)=>
{
try{
    const data= await Expense.findAll();
    // console.log("mewwoow",data);
    res.status(200).json({data:data})
}
catch(err)
{
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
}
}

exports.deleteExpense= async(req,res,next)=>
{
  try{
    const userId= req.params.id;
    // console.log(id);
    const data= await Expense.findByPk(userId);
    if(!data){
      res.status(400).json({Error: "Record Not Found"});
      return;
    }
    let destroy= await data.destroy();
    res.status(200).json({Data: destroy});
}
  catch(err)
  {
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
  }
}

exports.getOneExpense= async(req,res,next)=>
{
  try{
    const userId= req.params.id;
    // console.log(id);
    const data= await Expense.findByPk(userId);
    
    res.status(200).json({data:data});
}
  catch(err)
  {
    console.log(err);
    res.status(400).json({failed: "Error Occurred"});
  }
}
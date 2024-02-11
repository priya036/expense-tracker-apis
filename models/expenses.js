const mongoose=require('mongoose')
const expenseSchema=new mongoose.Schema({
    amount:Number,
    text:String
})
const Expense=mongoose.model('Expense',expenseSchema)
module.exports=Expense
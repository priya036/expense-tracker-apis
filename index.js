const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
const Expense = require('./models/expenses')

app.use(express.json())  //middleware ->like broker,it will allow only json and if this is not given all othr format are blocked for security reson
app.use(cors());

require('dotenv').config()
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})


//list all
app.get('/expense', async (req, res) => {  //list all api's
    const result = await Expense.find();
    res.send(result)
})
//list one api
app.get('/expense/:id', async (req, res) => {   //list one api(list)
    try {
        const id = req.params.id
        const result = await Expense.findById(id)
        if (result)
            res.send(result)
        else
            res.send("No expense with that ID")
    }
    catch (err) {
        res.send(err)
    }
})

//delete api
app.delete('/expense/:id', async (req, res) => {   //list one api(list)
    try {
        const id = req.params.id
        const result = await Expense.findByIdAndDelete(id)
        if (result)
            res.send(result)
        else
            res.send("No expense with that ID")
    }
    catch (err) {
        res.send(err)
    }

})

//to insert
app.post('/expense', async (req, res) => {
    try {
        console.log(req.body)
        const newExpense = req.body
        await Expense.create(newExpense)
        res.send('created')
    }
    catch (err) {
        res.send(err)
    }
})

//to update
app.put('/expense/:id', async (req, res) => {
    try {
        const id=req.params.id
        const updateObject=req.body
        const updatedObject=await Expense.findByIdAndUpdate(id,
            {$set:updateObject},{
            new:true
        })
        res.send(updatedObject)
    }
    catch (err) {
        res.send(err)
    }
})

const port=process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})




//browser supports only get method other methods to be checked in postman
//if changes done,stop the server and start again and see the result in broswer
//for one url 1 get method 


const bodyParser = require('body-parser');
const express= require('express');

const cors= require('cors')
const app = express();
const addroute= require('./routes/add-expense');
const getroute= require('./routes/get-expense');
const getoneroute= require('./routes/getone-expense')
const deleteroute= require('./routes/delete-expense');
const sequelize= require('./connection/database');
app.use(bodyParser.json({extended:false}));
app.use(cors());



app.use('/expense', getroute)
app.use('/expense', getoneroute)
app.use('/expense', addroute)
app.use('/expense', deleteroute)


sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(4000, ()=>
{
    console.log("Server Is Started!");
})})
  .catch(err => {
    console.log(err);
});


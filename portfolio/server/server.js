const express = require('express');
const app = express();
const cors = require("cors");
const contactRouter = require('./routes/contact');
const homeRouter = require('./routes/home');
const portfolioRouter = require('./routes/portfolio');
const projectDetailsRouter = require('./routes/projectDetails');
const skillsRouter = require('./routes/skills'); 

app.listen(3000, function(){
    console.log("Server Running..."); 
})

//allows for different domains to communicate
app.use(cors());

app.use(express.urlencoded({extended: false}));

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

app.use(contactRouter);
app.use(homeRouter); 
app.use(portfolioRouter);
app.use(projectDetailsRouter);
app.use(skillsRouter);
const express = require('express');
const app = express();
const cors = require("cors");
const homeRouter = require('./routes/home');
const aboutRouter = require('./routes/about');
const portfolioRouter = require('./routes/portfolio');
const projectDetailsRouter = require('./routes/projectDetails');
const contactRouter = require('./routes/contact');

app.listen(3000, function(){
    console.log("Server Running..."); 
})

//allows for different domains to communicate
app.use(cors());

app.use(express.urlencoded({extended: false}));

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

app.use(homeRouter);
app.use(aboutRouter); 
app.use(contactRouter);
app.use(portfolioRouter);
app.use(projectDetailsRouter);
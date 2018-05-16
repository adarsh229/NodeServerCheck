const express = require ('express');
const hbs = require('hbs');
var app = express();
var fs = require('fs');

const port = process.env.PORT || 3000;  //for heroku



app.use((req, res, next) => {   //app.use helps us make middleware for better usage 
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;


    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log file');
        }
    });

    next();

})

// app.use((req,res, next) => {  //Middleware for when the website is not running -- Under maintenance!
//     res.render('maintenance.hbs'); //By not calling next, we are not calling the next functions i.e. the other renders in server.js
//     //Which will allow the node to not go further to the next pages but to stay at this one 
// })

app.use(express.static(__dirname  + '/public')); 

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine' , 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});


app.get('/', (req, res) => {
    // res.send('<h1> Hello Express </h1>');

    // res.send( {
    //     name: 'Adarsh',
    //     likes: ['App Dev', 'Basketball',],

    // });


    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        
    });


});

app.get ('/about', (req, res) => {
   // res.send('About Page ');
   res.render('about.hbs', {
       pageTitle: 'About Page' ,
        //For dymanic dates in your webpage
   });  //to render handlebars 

});

app.get('/bad', (req, res ) => {
    res.send( {
        errorMessage: 'Unable to handle error'
    });
});

app.listen(port);

console.log(`Server running at port ${port}`);

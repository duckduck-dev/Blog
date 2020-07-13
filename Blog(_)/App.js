const express = require('express');
const myApp = express();
const Intermediate = require('./routes/Intermediate');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');


myApp.use(express.static(path.join(__dirname, 'public')));
myApp.set('view engine', 'ejs');
myApp.use(bodyParser.urlencoded({extended:true}));


myApp.use(session({secret : 'shhhh!', resave : false, saveUninitialized : true}));
myApp.use(cookieParser());
myApp.use(Intermediate);
//myApp.get('/', (req, res) => {console.log(req.cookies);res.cookie('cookie_name').send('cookie set')});

/*myApp.get('/', (req, res, next) => {
    if(req.session.page_views){
        req.session.page_views++;
        res.send(`you have visited ${req.session.page_views} times`);
    }
    else{
        req.session.page_views = 1;
        res.send(`you hav visited ${req.session.page_views} times`)
    }
});

myApp.listen(3000);*/

myApp.listen(7000);
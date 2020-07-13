const express = require('express');
const route = express.Router();
const Register = require('../controllers/registeration');


route.get('/GETPublish', Register.FetchPublish);
route.post('/Publish', Register.Publish);
route.post('/deleteRecord', Register.deleteRecord);
route.get('/remove', Register.delete);
route.get('/Registeration', Register.get);
route.post('/RegisterationPost', Register.post);
route.use('/login', Register.log);
route.use('/feeds', Register.feeds);
route.use('/logout', Register.logout);
route.post('/home', Register.home);
route.get('/update', Register.update);
route.post('/updateDetails', Register.UpdateDetails);
route.get('/', Register.Home);
route.use(Register.notfound);

module.exports = route;
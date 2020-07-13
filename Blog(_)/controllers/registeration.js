const path = require('path');
const userdata = require('../models/userdata');
const updateData = require('../models/updateData');
const removeData = require('../models/delete');
const storeFeed = require('../models/storeFeed');

//home
exports.Home = (req, res, next) => {
    console.log(req.sessionID);
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
};

//fetch publish page
exports.FetchPublish = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'publish.html'));
}
//publish
exports.Publish = (req, res) => {
   // console.log(req.body.genre, req.body.Feed, req.sessionID);
    let feed = new storeFeed(req.body.genre, req.body.Feed, req.sessionID);
    feed.push()
    .then(res.sendFile(path.join(__dirname, '../', 'views', 'source.html')))
    .catch(() => {}); 
}
//deleteing record
exports.deleteRecord = (req, res, next) => {
    let Delete = new removeData(req.body.username, req.body.password);
    Delete.RemoveRecord()
    .then(() => {
        console.log('Profile deleted successfully');
        res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    });
};
//fetching delete profile page
exports.delete = (req, res, next) => {
   res.sendFile(path.join(__dirname, '../', 'views', 'delete.html'));
};
//fetching update page
exports.update = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'update.html'));
};
//update record
exports.UpdateDetails = (req, res, next) => {
    let update = new updateData(req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.currentUsername);
    update.updateUserDetails()
    .then(() => {
        console.log('profile successfully updated!!!');
        res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    })
    .catch(err => console.log(err));
};
//registeration page
exports.get = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'registeration.html'));
};

//login
exports.log = (req, res, next) => {
   // console.log(req.sessionID);
    res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
}
//logout
exports.logout = (req, res, next) => {
   req.session.destroy(()=> {res.redirect('/')});
}
//feeds
exports.feeds = (req, res, next) => {
    storeFeed.FetchFeeds()
    /*.then(data => {
        res.send(`welcome ${data.fname+data.lname} Here's your mail ${data.email}`);
    })
    .catch(err => console.log(err));*/
    .then(data => {
        var Data = new Object(data);
        res.render('showFeeds.ejs', {Data : Data}); 
    })
    .catch(err => {console.log(err)});
    //res.render('showFeeds.ejs'); 
}
//db insertion
exports.post = (req, res, next) => {
    var userDetails = new userdata(req.body.firstname, req.body.lastname, req.body.email, req.body.password,req.sessionID);
    userDetails.Insert()
    .then( () => {
       res.sendFile(path.join(__dirname, '../', 'views' , 'index.html'));
    });
};
//login authentication
exports.home = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const sid = req.sessionID;
    userdata.checkDetails(username, password, sid)
    .then(result => {
        if(result == 'Not Found') {
            console.log('account not found');
            res.redirect('/Registeration');
        }
        else if(result){
            //authenticate and move to main page
            res.sendFile(path.join(__dirname, '../', 'views', 'source.html'));
        }
        else{   
            //password incorrect -> redirect to login page    
            res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
        }
    })
    .catch(err => {console.log(err)}); 
};

//page notfound
exports.notfound = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'views', 'notFound.html'));
};
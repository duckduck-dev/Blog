const db = require('../util/sessionDb')

module.exports = class storeFeed{
    constructor(Genre, Feed, Sid){
        this.genre = Genre;
        this.feed = Feed;
        this.sid = Sid;
    }

    push() {
       // console.log(this.genre, this.feed, this.sid);
       var email =  db.execute('SELECT EMAIL FROM regLog WHERE Sid=?', [this.sid]);
       var feeds = email
            .then(data => {
                var Email;
                data[0].map(email => {Email = email.EMAIL});
                return Email;
            })
            .then(mail => {
                db.execute('INSERT INTO Feeds(EMAIL, FEEDS, GENRE) VALUES(?, ?, ?)', [mail, this.feed, this.genre]);
            })
            .catch(err => {console.log(err)});

        return feeds;
    }

    static FetchFeeds() {
       var feeds = db.execute('SELECT EMAIL, FEEDS, GENRE FROM Feeds')
       .then(feed => {
           var feedStore = [];
           
           for (var i=0; i < feed[0].length ; i++) {
                var obj = new Object();
                var temp = feed[0] 
                obj.ReferenceID = i+1;
                obj.feed = temp[i].FEEDS;
                obj.mail = temp[i].EMAIL;
                obj.genre = temp[i].GENRE;
                feedStore.push(obj);
           }
           //console.log(feedStore);
           return feedStore;
       });
       return feeds; 
    }
};
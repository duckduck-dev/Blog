const db = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class userData {
    constructor(firstname, lastname, email, password, sid) {
        this.Fname = firstname;
        this.Lname = lastname;
        this.Email = email;
        this.Password = password;
        this.Sid = sid;
    }
''
    Insert() {
      return bcrypt.hash(this.Password, 10)
      .then((hash) => {
       db.execute('INSERT INTO regLog(FIRSTNAME, LASTNAME, EMAIL, PASSWORD, Sid) VALUES (?, ?, ?, ?, ?)', [this.Fname, this.Lname, this.Email, hash, this.Sid]);
      });
    }

    static checkDetails(x, y, sid) {
        var dobj = db.execute('SELECT FIRSTNAME, PASSWORD, Sid FROM regLog WHERE FIRSTNAME=?', [x]);
        var password = dobj
        .then(rows => {
          var details = new Object();
          rows[0].map(data => {
            details.nme = data.FIRSTNAME;
            details.pwd =  data.PASSWORD;
            details.sid = data.Sid;
          })
        return details;
        });
       return password.then((pwdCheck) => {
         if (Object.keys(pwdCheck).length === 0){ return 'Not Found'}
         else{
          db.execute('UPDATE regLog SET Sid=? WHERE FIRSTNAME = ? AND PASSWORD = ?', [sid, pwdCheck.nme, pwdCheck.pwd]);
          return bcrypt.compare(y, pwdCheck.pwd);
         }
       })
       .catch((err) => {console.log(err)});
    }

    static fetchDetails() {
    /*var ID =  db.execute('SELECT EMAIL FROM regLog')
    var info = ID
    .then(id => {
      let feed = db.execute('');
    })
    
    /*.then(data => {
      let details = new Object();
        data[0].map(dta => {
          details.fname = dta.FIRSTNAME;
          details.lname = dta.LASTNAME;
          details.email = dta.EMAIL;
        })
        return details;
    })
    .catch(err => {console.log(err)});
    return info;*/
    }
}
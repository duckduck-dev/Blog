const db = require('../util/database');

module.exports = class updateInfo {
    constructor(fname, lname, email, password, currentUsername) {
        this.Fname = fname;
        this.Lname = lname;
        this.Email = email;
        this.Password = password;
        this.CurrentName = currentUsername;
    }

    updateUserDetails() {
     return db.execute('UPDATE regLog SET FIRSTNAME=?, LASTNAME=?, EMAIL=?, PASSWORD=? WHERE FIRSTNAME = ?', [this.Fname, this.Lname, this.Email, this.Password, this.CurrentName]);
    }
}
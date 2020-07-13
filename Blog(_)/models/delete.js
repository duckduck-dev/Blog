const db = require('../util/database');

module.exports = class Remove {
    constructor(name, password) {
        this.Name = name;
        this.Password = password;
    }

    RemoveRecord() {
        return db.execute('DELETE FROM regLog WHERE FIRSTNAME=? AND PASSWORD=?', [this.Name, this.Password]);
    }
};
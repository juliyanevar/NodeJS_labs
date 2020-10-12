const util = require('util');
const ee = require('events');

let db_data = [
    {id: 1, name: 'A', bday: '2001-01-01'},
    {id: 2, name: 'B', bday: '2002-02-02'},
    {id: 3, name: 'C', bday: '2003-03-03'},
];

function DB() {
    this.get = () => {
        return db_data;
    };

    this.post = (obj) => {
        db_data.push(obj);
    };

    this.delete = (obj) => {
        let elem = null;
        for (let i = 0; i < db_data.length; i++) {
            if (db_data[i].id == obj) {
                elem = db_data[i];
                db_data.splice(i, 1);
            }
        }
        return elem;
    };

    this.put = (obj) => {
        let elem = null;
        for (let i = 0; i < db_data.length; i++) {
            if (db_data[i].id == obj.id) {
                db_data[i].name = obj.name;
                db_data[i].bday = obj.bday;
            }
        }
        return elem;
    }
}

util.inherits(DB, ee.EventEmitter);  //DB наследует EventEmitter
exports.DB = DB;
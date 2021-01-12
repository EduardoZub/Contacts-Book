const fs = require('fs');
const db = require('./data.json');
const backupDB = require('./backupData.json');

// if the user deleted all data it will be filled again
// after reload the app in the local terminal by this code
if (db.contacts.length === 0) {
    fs.writeFile(`mockServer/data.json`, JSON.stringify(backupDB), function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('data filled');
        }
    });
} else {
    console.log('data already filled');
}


const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('student_data.sqlite3', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


let sql = "SELECT DISTINCT name FROM student ORDER BY name";

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

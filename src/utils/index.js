const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host:'34.123.7.32',
    port:"3306",
    user: 'root',
    password:'56kig4f6OAOFr9m6',
    database:'pt1',
})

// return db;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (require, response) => {
//     const sqlRequest = "SELECT * FROM pt1.users LIMIT 0,10;";
//     db.query(sqlRequest, (err, result) => {
//         response.send(result);
//     })
// })

app.post('/api/getuser', (require, response) => {
    const username = require.body.username;
    const sqlRequest = "SELECT * FROM pt1.users WHERE pt1.users.username = ?;";
    db.query(sqlRequest,[username] ,(err, result) => {
        response.send(result);
    })
})

app.post("/api/insert", (require, response) => {
    const user_id = require.body.user_id;
    const password = require.body.password;
    const username = require.body.username;
    const email = require.body.email;
    const address = require.body.address;

    const sqlInsert = "INSERT INTO pt1.users (`user_id`, `password`, `username`, `email`, `address`) VALUES (?,?,?,?,?);";
    db.query(sqlInsert, [user_id, password, username, email, address], (err, result) => {
        //console.log(err);
        //response.send("fail");
    })
});

app.post("/api/update", (require, response) => {
    const user_id = require.body.user_id;
    const password = "blah";
    // const username = "username";
    // const email = "email@email.com";
    // const address = "123 North Champaign Road, Champaign IL, 61820";

    const sqlUpdate = "UPDATE pt1.users SET pt1.users.password = ? WHERE pt1.users.user_id = ?;";
    db.query(sqlUpdate, [password, user_id], (err, result) => {
        //console.log(err);
        //response.send("fail");
        response.send("update")
    })
});

app.post("/api/delete", (require, response) => {
    const user_id = require.body.user_id;
    // const password = "blah";
    // const username = "username";
    // const email = "email@email.com";
    // const address = "123 North Champaign Road, Champaign IL, 61820";

    const sqlUpdate = "DELETE FROM pt1.users WHERE pt1.users.user_id = ?;";
    db.query(sqlUpdate, [user_id], (err, result) => {
        //console.log(err);
        //response.send("fail");
        response.send("update")
    })
});

app.listen(3002, () => {
    console.log("running on port 3002");
})